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
    const [favorites, setFavorites] = useState([]);
    const [editAvatar, setEditAvatar] = useState(false);
    const [info, setInfo] = useState(null);
    const [infoToEdit, setInfoToEdit] = useState(null);
    const [updateInfoDialogOpened, setUpdateInfoDialogOpened] = useState(false);
    const [tabValue, setTabValue] = useState('PREFERITI');
    const avatarShadow = useAvatarShadow();
    const tabsStyle = useStyles();
    const {username} = useParams();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token.value);
    const appContext = useContext(GlobalContext);
    let navigate = useNavigate();

    const onChangeTabValue = (e, value) => {
        setTabValue(value);
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
            setFavorites(response.data[0]?.favorites)
            dispatch(setIdle());
        }).catch(() => {
            dispatch(setIdle());
            navigate(appContext.routes.noUser);
        });
    };

    const getFavorites = () => {
        const qs = require('qs');
        const query = qs.stringify({
            _where: {
                id: ['62209e9f551af009f24d1a50', '622b34e6f9cdcb0f3a5bd365']
            },
        }, {
            encodeValuesOnly: true, // prettify url
        });
        console.log(query)
        axios.get(appContext.ENDPOINT_PRODUCTS + "?" + query, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            console.log(response)
            // setId(response.data[0]?.id);
            // setName(response.data[0]?.name);
            // setSurname(response.data[0]?.surname);
            // setAvatar(response.data[0]?.avatar?.url);
            // setFavorites(response.data[0]?.favorites)
            dispatch(setIdle());
        }).catch(() => {
            dispatch(setIdle());
            navigate(appContext.routes.noUser);
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
        getFavorites();

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
                        onMouseOver={() => {setEditAvatar(true)}}
                        onMouseLeave={() => {setEditAvatar(false)}}>{editAvatar && <AddPhotoAlternateIcon sx={{fontSize: 70}}/>}
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
                <Box sx={{
                    width: '100%',
                    color: 'darkred',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    justifyContent: 'center'
                }}>
                    <Tabs
                        value={tabValue}
                        className={tabsStyle}
                        onChange={onChangeTabValue}
                        textColor='inherit' TabIndicatorProps={{style: {backgroundColor: "darkred"}}}>
                        <Tab icon={<FavoriteIcon />} label="PREFERITI" value='PREFERITI' />
                        <Tab icon={<StoreIcon />} label="NEGOZI" value='NEGOZI' />
                    </Tabs>
                </Box>
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