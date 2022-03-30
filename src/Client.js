import {Col, Container, Row} from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import GlobalContext from "./GlobalContext";
import {setBusy, setIdle} from "./store/loading";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Divider, IconButton, Input, Tab, Tabs, Typography} from "@mui/material";
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
import {setFavorites, setFollowing} from "./store/user";

const useAvatarShadow = makeStyles(theme => ({
    avatar: {
        boxShadow: theme.shadows[10],
    }
}));
const useStyles = makeStyles((theme) => ({
    indicator: {
        backgroundColor: "green",
    }
}));

export default function Client() {
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [editAvatar, setEditAvatar] = useState(false);
    const [info, setInfo] = useState(null);
    const [infoToEdit, setInfoToEdit] = useState(null);
    const [updateInfoDialogOpened, setUpdateInfoDialogOpened] = useState(false);
    const [tabValue, setTabValue] = useState('PREFERITI');
    const [selfUser, setSelfUser] = useState(false);
    const avatarShadow = useAvatarShadow();
    const tabsStyle = useStyles();
    const {username} = useParams();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token.value);
    const myUsername = useSelector((state) => state.user.username);
    const userType = useSelector((state) => state.user.type);
    const appContext = useContext(GlobalContext);
    const navigate = useNavigate();

    const onChangeTabValue = (e, value) => {
        setTabValue(value);
    };

    const getFavoritesFollowing = () => {
        axios.get(userType === 'negozio' ? appContext.ENDPOINT_SHOPS : appContext.ENDPOINT_CLIENTS + "?username=" + myUsername,{
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            dispatch(setFavorites(response.data[0].favorites));
            dispatch(setFollowing(response.data[0].following));
        })
    };

    const getClientInfo = () => {
        dispatch(setBusy());
        axios.get(appContext.ENDPOINT_CLIENTS + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            setId(response.data[0]?.id);
            setName(response.data[0]?.name);
            setSurname(response.data[0]?.surname);
            setAvatar(response.data[0]?.avatar?.url);
            getProducts(response.data[0]?.favorites);
            dispatch(setIdle());
        }).catch(() => {
            dispatch(setIdle());
            navigate(appContext.routes.noUser);
        });
    };

    const getProducts = (favorites) => {
        setLoadingProduct(true);
        const qs = require('qs');
        const query = qs.stringify({_where: {id: favorites},}, {encodeValuesOnly: true});
        axios.get(appContext.ENDPOINT_PRODUCTS + "?" + query, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            let tmpProducts = response.data.map((element) => ({
                height: generateHeight(),
                title: element.title,
                id: element.id,
                picture: appContext.HOST + element.cover?.url,
                username: element.username
            }))
            setFavoriteProducts(tmpProducts);
            setLoadingProduct(false);
        }).catch(() => {
            dispatch(setIdle());
        });
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

    // const example = () => {
    //     dispatch(setBusy());
    //     const formData = new FormData();
    //     let data = {
    //         favorites: [1, 2, 3]
    //     };
    //     formData.append('data', JSON.stringify(data));
    //
    //     axios.put(appContext.ENDPOINT_CLIENTS + "/" + id, formData, {
    //         headers: {'Authorization': 'Bearer ' + token}
    //     }).then(() => {
    //         dispatch(setIdle());
    //         getClientInfo();
    //     }).catch(() => {
    //         dispatch(setIdle());
    //         dispatch(isError('Si è verificato un errore nell\'aggiornamento dell\'avatar. Riprovare.'));
    //     })
    // };

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

    useEffect(() => {
        getClientInfo();
    }, []);

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
                    <label htmlFor="avatar-uploader" className='text-center'>
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
                    </label>
                    <br/>

                    <Typography className='text-center' variant='h4'>{name}
                        <IconButton color="inherit" size="medium" onClick={() => {
                            openInfoDialog('name')
                        }}>
                            <EditIcon fontSize="inherit"/>
                        </IconButton>
                    </Typography>
                    <Typography className='text-center' variant='h4'>{surname}
                        <IconButton color="inherit" size="medium" onClick={() => {
                            openInfoDialog('surname')
                        }}>
                            <EditIcon fontSize="inherit"/>
                        </IconButton>
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
                            className={tabsStyle}
                            onChange={onChangeTabValue}
                            textColor='inherit' TabIndicatorProps={{style: {backgroundColor: "darkred"}}}>
                            <Tab icon={<FavoriteIcon/>} label="PRODOTTI PREFERITI" value='PREFERITI'/>
                            <Tab icon={<StoreIcon/>} label="NEGOZI CHE SEGUI" value='NEGOZI'/>
                        </TabList>
                    </Box>
                    <TabPanel value='PREFERITI'>
                        <GridSystem
                            loadingProducts={loadingProduct}
                            isProducts={true}
                            products={favoriteProducts}
                            isUser={false}/>
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