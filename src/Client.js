import {Container} from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import GlobalContext from "./GlobalContext";
import {setBusy, setIdle} from "./store/loading";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Divider, IconButton, Input, Tab, Typography} from "@mui/material";
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
import {setFavorites, setFollowing, setId} from "./store/user";
import favoriteSVG from "./assets/favorite.svg"
import qs from "qs";

const useAvatarShadow = makeStyles(theme => ({
    avatar: {
        boxShadow: theme.shadows[10],
    }
}));

export default function Client() {
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
    const [tabValue, setTabValue] = useState('favorites');
    const [selfUser, setSelfUser] = useState(false); //TODO
    const avatarShadow = useAvatarShadow();
    const {username} = useParams();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token.value);
    const myUsername = useSelector((state) => state.user.username);
    const userType = useSelector((state) => state.user.type);
    const id = useSelector((state) => state.user.id);
    const appContext = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();


    const onChangeTabValue = (e, value) => {
        setTabValue(value);
    };

    const setFavoritesFollowing = () => {
        axios.get((userType === 'negozio' ? appContext.ENDPOINT_SHOPS : appContext.ENDPOINT_CLIENTS) + "?username=" + myUsername, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            dispatch(setId(response.data[0].id));
            dispatch(setFavorites(response.data[0].favorites));
            dispatch(setFollowing(response.data[0].following));
        });
    };

    const getClientInfo = () => {
        dispatch(setBusy());
        axios.get(appContext.ENDPOINT_CLIENTS + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            setName(response.data[0]?.name);
            setSurname(response.data[0]?.surname);
            setAvatar(response.data[0]?.avatar?.url);
            getFavoriteProducts(response.data[0]?.favorites);
            getFollowingShops(response.data[0]?.following);
            dispatch(setIdle());
        }).catch(() => {
            dispatch(setIdle());
            navigate(appContext.routes.noUser);
        });
    };

    const getFavoriteProducts = (favorites) => {
        setLoadingProducts(true);
        let tmpProducts = [];
        if (favorites.length > 0) {
            const qs = require('qs');
            const query = qs.stringify({_where: {id: favorites},}, {encodeValuesOnly: true});
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

    const getFollowingShops = (following) => {
        setLoadingProducts(true);
        let tmpShops = [];
        if (following.length > 0) {
            const qs = require('qs');
            const query = qs.stringify({_where: {username: following},}, {encodeValuesOnly: true});
            axios.get(appContext.ENDPOINT_SHOPS + "?" + query, {
                headers: {'Authorization': 'Bearer ' + token}
            }).then((response) => {
                tmpShops = response.data.map((element) => ({avatar: element.avatar.url, username: element.username}));
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
                    dispatch(isError('Si è verificato un errore nell\'aggiornamento dell\'avatar. Riprovare.'));
                })
            }, error() {
                dispatch(setIdle());
                dispatch(isError('Si è verificato un errore nell\'aggiornamento dell\'avatar. Riprovare.'));
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
            dispatch(isError('Si è verificato un errore nell\'aggiornamento dell\'informazione. Riprovare.'));
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

    const checkSelfUser = () => {
        setSelfUser(username === myUsername);
    };

    const refresh = () => {
        checkSelfUser();
        setFavoritesFollowing();
        getClientInfo();
    };

    useEffect(() => {
        refresh();
    }, [location]);

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
                    {selfUser && <label htmlFor="avatar-uploader" className='text-center'>
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
                        !selfUser &&
                        <Avatar
                            className={avatarShadow.avatar}
                            src={appContext.HOST + avatar}
                            style={{width: '200px', height: '200px'}}>
                        </Avatar>
                    }
                    <br/>

                    <Typography className='text-center' variant='h4'>{name}
                        {selfUser &&
                            <IconButton color="inherit" size="medium" onClick={() => {
                                openInfoDialog('name')
                            }}>
                                <EditIcon fontSize="inherit"/>
                            </IconButton>
                        }
                    </Typography>
                    <Typography className='text-center' variant='h4'>{surname}
                        {selfUser &&
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