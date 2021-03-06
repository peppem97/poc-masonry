import {Container} from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import GlobalContext from "./GlobalContext";
import {setBusy, setIdle} from "./store/loading";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Divider, IconButton, Input, List, ListItem, ListItemAvatar, ListItemText, Tab, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteIcon from '@mui/icons-material/Favorite';
import StoreIcon from '@mui/icons-material/Store';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Compressor from "compressorjs";
import {isError} from "./store/dialogs";
import EditIcon from "@mui/icons-material/Edit";
import UpdateInfoDialog from "./dialogs/UpdateInfoDialog";
import {generateHeight} from "./Utility";
import GridSystem from "./GridSystem";
import {TabContext, TabList, TabPanel} from "@material-ui/lab";
import favoriteSVG from "./assets/favorite.svg";
import followSVG from "./assets/follow.svg"

import Button from "@mui/material/Button";
import {setFollowing} from "./store/user";

const useAvatarShadow = makeStyles(theme => ({
    avatar: {
        boxShadow: theme.shadows[10],
    }
}));

export default function Client() {
    const [tabValue, setTabValue] = useState('favorites');
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [followingShops, setFollowingShops] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [editAvatar, setEditAvatar] = useState(false);
    const [info, setInfo] = useState(null);
    const [infoToEdit, setInfoToEdit] = useState(null);
    const [updateInfoDialogOpened, setUpdateInfoDialogOpened] = useState(false);
    const avatarShadow = useAvatarShadow();
    const token = useSelector((state) => state.token.value);
    const myUsername = useSelector((state) => state.user.username);
    const myFavorites = useSelector((state) => state.user.favorites);
    const myFollowing = useSelector((state) => state.user.following);
    const userType = useSelector((state) => state.user.type);
    const myId = useSelector((state) => state.user.id);

    const firstAccess = useSelector((state) => state.user.firstAccess);

    const id = useSelector((state) => state.user.id);
    const appContext = useContext(GlobalContext);
    const {username} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeTabValue = (e, value) => {
        setTabValue(value);
    };

    const goToShop = (username) => {
        navigate(appContext.routes.shop + '/' + username);
    };

    const getClientInfo = () => {
        dispatch(setBusy());
        axios.get(appContext.ENDPOINT_CLIENTS + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            setName(response.data[0]?.name);
            setSurname(response.data[0]?.surname);
            setAvatar(response.data[0]?.avatar?.url);
            dispatch(setIdle());
        }).catch(() => {
            dispatch(setIdle());
            navigate(appContext.routes.noUser);
        });
    };

    const getFavoriteProducts = () => {
        setLoadingProducts(true);
        let tmpProducts = [];
        if (myFavorites.length > 0) {
            const qs = require('qs');
            const query = qs.stringify({_where: {id: myFavorites},}, {encodeValuesOnly: true});
            axios.get(appContext.ENDPOINT_PRODUCTS + "?" + query, {
                headers: {'Authorization': 'Bearer ' + token}
            }).then((response) => {
                tmpProducts = response.data.map((element) => ({
                    height: generateHeight(),
                    title: element.title,
                    id: element.id,
                    picture: appContext.HOST + element.cover?.url,
                    username: element.username
                }))
                setFavoriteProducts(tmpProducts);
                setLoadingProducts(false);
            }).catch(() => {
                dispatch(setIdle());
            });
        } else {
            setFavoriteProducts(tmpProducts);
            setLoadingProducts(false);
        }
    };

    const getFollowingShops = () => {
        setLoadingProducts(true);
        let tmpShops = [];
        if (myFollowing.length > 0) {
            const qs = require('qs');
            const query = qs.stringify({_where: {username: myFollowing},}, {encodeValuesOnly: true});
            axios.get(appContext.ENDPOINT_SHOPS + "?" + query, {
                headers: {'Authorization': 'Bearer ' + token}
            }).then((response) => {
                tmpShops = response.data.map((element) => ({
                    avatar: element.avatar.url,
                    followed: true,
                    username: element.username,
                    title: element.title}));
                setFollowingShops(tmpShops);
                setLoadingProducts(false);
            }).catch(() => {
                dispatch(setIdle());
            });
        } else {
            setFollowingShops(tmpShops);
            setLoadingProducts(false);
        }
    };

    const updateAvatar = (e) => {
        dispatch(setBusy());
        const formData = new FormData();
        new Compressor(e.target.files[0], {
            quality: appContext.COMPRESSION_QUALITY, success(result) {
                formData.append('files.avatar', result, 'avatar.jpg');
                formData.append('data', JSON.stringify({}));
                axios.put(appContext.ENDPOINT_CLIENTS + "/" + id, formData, {
                    headers: {'Authorization': 'Bearer ' + token}
                }).then(() => {
                    dispatch(setIdle());
                    getClientInfo();
                }).catch(() => {
                    dispatch(setIdle());
                    dispatch(isError('Si ?? verificato un errore nell\'aggiornamento dell\'avatar. Riprovare.'));
                })
            }, error() {
                dispatch(setIdle());
                dispatch(isError('Si ?? verificato un errore nell\'aggiornamento dell\'avatar. Riprovare.'));
            }
        })
    };

    const updateInfo = (type, value) => {
        dispatch(setBusy());
        const data = {};
        const formData = new FormData();
        data[type] = value;
        formData.append('data', JSON.stringify(data));
        axios.put(appContext.ENDPOINT_CLIENTS + "/" + id, formData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(() => {
            dispatch(setIdle());
            getClientInfo();
        }).catch(() => {
            dispatch(setIdle());
            dispatch(isError('Si ?? verificato un errore nell\'aggiornamento dell\'informazione. Riprovare.'));
        });
    };

    const toggleFollow = (followed, username) => {
        let tmpFollow;
        if (followed) {
            tmpFollow = myFollowing.filter((element) => (element !== username));

        } else {
            tmpFollow = JSON.parse(JSON.stringify(myFollowing));
            tmpFollow.push(username);
        }
        let data = {
            following: tmpFollow
        };
        axios.put((userType === 'negozio' ? appContext.ENDPOINT_SHOPS : appContext.ENDPOINT_CLIENTS) + "/" + myId, data ,{
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            followed = false;
            // dispatch(setFollowing(response.data.following));
            // checkFollowed(response.data.following);
        });
    };

    const openInfoDialog = (info) => {
        switch (info) {
            case 'name':
                setInfo(name);
                break;
            case 'surname':
                setInfo(surname);
                break;
            default:
                break;
        }
        setInfoToEdit(info);
        setUpdateInfoDialogOpened(true);
    };

    useEffect(() => {
        if (firstAccess) {
            navigate(appContext.routes.wizard);
        } else {
            appContext.setFavoritesFollowing();
            getClientInfo();
        }
    }, []);

    useEffect(() => {}, [username]);

    useEffect(() => {
        getFavoriteProducts();
        getFollowingShops();
    }, [myFavorites, myFollowing]);

    return (
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: 'center'
                }}>
                    {(username === myUsername) && <label htmlFor="avatar-uploader" className='text-center'>
                        <Input accept="image/*" id="avatar-uploader" type="file" hidden
                               onChange={updateAvatar}/>
                        <Avatar
                            className={avatarShadow.avatar}
                            src={!editAvatar && appContext.HOST + avatar}
                            style={{width: '200px', height: '200px', cursor: editAvatar ? 'pointer' : null}}
                            onMouseOver={() => {
                                setEditAvatar(true)
                            }}
                            onMouseLeave={() => {
                                setEditAvatar(false)
                            }}>{editAvatar && <AddPhotoAlternateIcon sx={{fontSize: 70}}/>}
                        </Avatar>
                    </label>}
                    {
                        !(username === myUsername) &&
                        <Avatar
                            className={avatarShadow.avatar}
                            src={appContext.HOST + avatar}
                            style={{width: '200px', height: '200px'}}>
                        </Avatar>
                    }
                    <br/>

                    <Typography className='text-center' variant='h4'>{name}
                        {(username === myUsername) &&
                            <IconButton color="inherit" size="medium" onClick={() => {
                                openInfoDialog('name')
                            }}>
                                <EditIcon fontSize="inherit"/>
                            </IconButton>
                        }
                    </Typography>
                    <Typography className='text-center' variant='h4'>{surname}
                        {(username === myUsername) &&
                            <IconButton color="inherit" size="medium" onClick={() => {
                                openInfoDialog('surname')
                            }}>
                                <EditIcon fontSize="inherit"/>
                            </IconButton>}
                    </Typography>
                    <Typography variant='h5' className='text-center' color="text.secondary">{username}
                    </Typography>
                </Box>
                <br/>
                <Divider/>
                <br/>
                <TabContext value={tabValue}>
                    <Box sx={{
                        width: '100%',
                        color: 'darkred',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        justifyContent: 'center'
                    }}>
                        <TabList
                            onChange={onChangeTabValue}
                            textColor='inherit' TabIndicatorProps={{style: {backgroundColor: "darkred"}}}>
                            <Tab icon={<FavoriteIcon/>} label="PRODOTTI PREFERITI" value='favorites'/>
                            <Tab icon={<StoreIcon/>} label="NEGOZI SEGUITI" value='shops'/>
                        </TabList>
                    </Box>
                    <br/>
                    <TabPanel value='favorites'>
                        {favoriteProducts.length > 0 &&
                            <GridSystem
                                loadingProducts={loadingProducts}
                                isProducts={true}
                                products={favoriteProducts}
                                isUser={false}/>
                        }
                        {
                            favoriteProducts.length === 0 &&
                            <Box sx={{
                                width: '100%',
                                color: 'darkred',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'center'
                            }}>
                                <img src={favoriteSVG} alt="" style={{width: '30%', height: 'auto'}}/>
                                <Typography variant='h4' className='text-center'>Nessun prodotto
                                    preferito...</Typography>
                            </Box>
                        }
                    </TabPanel>
                    <TabPanel value='shops'>

                        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                            {
                                followingShops.map((element) => (
                                    <ListItem alignItems="flex-start" secondaryAction={
                                        [<>
                                            {element.followed ?
                                                <Button variant="outlined"
                                                        style={{color: 'darkred', borderColor: 'darkred'}}
                                                        onClick={() => {toggleFollow(element.followed, element.username)}}>
                                                    seguito
                                                </Button> :
                                                <Button variant="contained"
                                                        style={{backgroundColor: 'darkred'}}
                                                        onClick={() => {toggleFollow(element.followed, element.username)}}>
                                                    Segui
                                                </Button>}
                                        </>
                                        ]
                                    }>
                                        <ListItemAvatar>
                                            <IconButton onClick={() => goToShop(element.username)}>
                                                <Avatar alt="" src={appContext.HOST + element.avatar}/>
                                            </IconButton>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={element.title}
                                            secondary={element.username}
                                        />
                                    </ListItem>
                                ))
                            }
                        </List>
                        {
                            followingShops.length === 0 &&
                            <Box sx={{
                                width: '100%',
                                color: 'darkred',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'center'
                            }}>
                                <img src={followSVG} alt="" style={{width: '30%', height: 'auto'}}/>
                                <Typography variant='h4' className='text-center'>Nessun negozio
                                    seguito...</Typography>
                            </Box>
                        }


                    </TabPanel>
                </TabContext>
            </Container>
            <UpdateInfoDialog
                open={updateInfoDialogOpened}
                infoToEdit={infoToEdit}
                onClose={() => {
                    setUpdateInfoDialogOpened(false)
                }}
                updateInfo={(e) => {
                    updateInfo(infoToEdit, e)
                }}
                info={info}/>
        </>
    );
}