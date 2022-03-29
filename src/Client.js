import {Col, Container, Row} from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import GlobalContext from "./GlobalContext";
import {setBusy, setIdle} from "./store/loading";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Divider, Input, Tab, Tabs, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteIcon from '@mui/icons-material/Favorite';
import StoreIcon from '@mui/icons-material/Store';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Compressor from "compressorjs";
import {isError} from "./store/dialogs";

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
    const [editAvatar, setEditAvatar] = useState(false);
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
            dispatch(setIdle())
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

    const updateName = (e) => {
    };

    const updateSurname = (e) => {
    };

    useEffect(() => {
        getClientInfo();
    }, [])


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
                    gap: 2,
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

                    <Typography className='text-center' variant='h3'>{name} {surname}</Typography>
                    <Typography variant='h5' className='text-center' color="text.secondary">{username}</Typography>

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
                        textColor='inherit' TabIndicatorProps={{
                        style: {
                            backgroundColor: "darkred"
                        }
                    }}>
                        <Tab icon={<FavoriteIcon />} label="PREFERITI" value='PREFERITI' />
                        <Tab icon={<StoreIcon />} label="NEGOZI" value='NEGOZI' />
                    </Tabs>
                </Box>


            </Container>
        </>
    );
}