import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BadgeIcon from '@mui/icons-material/Badge';
import {
    Checkbox,
    Container, createTheme, IconButton, ImageList,
    ImageListItem,
    ImageListItemBar, Input,
    InputAdornment, responsiveFontSizes,
    TextField, ThemeProvider,
    ToggleButton,
    ToggleButtonGroup, useMediaQuery
} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from '@mui/icons-material/Group';
import {useContext, useEffect, useState} from "react";
import EmailIcon from '@mui/icons-material/Email';
import StarIcon from '@mui/icons-material/Star';
import LanguageIcon from '@mui/icons-material/Language';
import CallIcon from '@mui/icons-material/Call';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ProgressiveImg from "./ProgessiveImage";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {initImageList} from "./Utility";
import GlobalContext from "./GlobalContext";
import {red} from "@mui/material/colors";
import Avatar from "@material-ui/core/Avatar";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setBusy, setIdle} from "./store/loading";
import Compressor from "compressorjs";
import {isError} from "./store/error";
import signupOk from "./assets/signup.svg"
import HomeIcon from "@mui/icons-material/Home";

export default function Signup() {
    const steps = ['Sei un negozio o un cliente?', 'Inserisci le informazioni', 'Registrati'];
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [userType, setUserType] = useState('negozio');
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState(null);
    const [title, setTitle] = useState(null);
    const [website, setWebsite] = useState(null);
    const [telephone, setTelephone] = useState(null);
    const [description, setDescription] = useState(null);
    const [carousel, setCarousel] = useState([]);
    const [avatar, setAvatar] = useState({image: null, rawImage: null});
    const [editAvatar, setEditAvatar] = useState(false);
    const [consent, setConsent] = useState(false);
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [signupCompleted, setSignupCompleted] = useState(false);
    const appContext = useContext(GlobalContext);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token.value);
    const theme = responsiveFontSizes(createTheme());
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    const onChangeUserType = (event, typeUser) => {
        setUserType(typeUser);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeWebsite = (e) => {
        setWebsite(e.target.value);
    };

    const onChangeTelephone = (e) => {
        setTelephone(e.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeAvatar = (e) => {
        setAvatar({image: URL.createObjectURL(e.target.files[0]), rawImage: e.target.files[0]});
    };

    const onChangeSurname = (e) => {
        setSurname(e.target.value);
    };

    const onChangeConsens = () => {
        setConsent(!consent);
    };

    const onChangeShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const addPicture = (e, i) => {
        let tmpPictures = [];
        for (let picture of carousel) {
            if (picture.index === i) {
                tmpPictures.push({
                    index: picture.index,
                    image: URL.createObjectURL(e.target.files[0]),
                    rawImage: e.target.files[0],
                    add: false
                });
            } else {
                tmpPictures.push(picture);
            }
        }
        setCarousel(tmpPictures);
    };

    const removePicture = (i) => {
        let tmpPictures = [];

        for (let picture of carousel) {
            if (picture.index === i) {
                tmpPictures.push({index: picture.index, image: null, rawImage: null, add: true});
            } else {
                tmpPictures.push(picture);
            }
        }
        setCarousel(tmpPictures);
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const nextStep = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const signup = () => {
        let fetched = 0;
        let dataSignup = {
            username: username,
            email: email,
            password: password
        };
        let dataShop = {
            email: email,
            title: title,
            description: description,
            username: username,
            website: website,
            telephone: telephone
        };
        // let dataUser = {};
        const formData = new FormData();
        dispatch(setBusy());
        axios.post(appContext.ENDPOINT_REGISTER, dataSignup).then((response) => {
            if (userType === 'negozio') {
                new Compressor(avatar.rawImage, {
                    quality: appContext.COMPRESSION_QUALITY, success(result) {
                        formData.append('files.avatar', result, 'avatar.jpg');
                        formData.append('data', JSON.stringify(dataShop));
                        axios.post(appContext.ENDPOINT_SHOPS, formData, {
                            headers: {'Authorization': 'Bearer ' + token}
                        }).then((responseFinal) => {
                            for (let picture of carousel) {
                                if (picture.image != null) {
                                    if (picture.rawImage != null) {
                                        new Compressor(picture.rawImage, {
                                            quality: appContext.COMPRESSION_QUALITY, success(result) {
                                                dispatch(setBusy());
                                                const formData = new FormData();
                                                formData.append('files.carousel' + picture.index, result, 'example.jpg');
                                                formData.append('data', JSON.stringify({}));
                                                axios.put(appContext.ENDPOINT_SHOPS + "/" + responseFinal?.data?.id, formData, {
                                                    headers: {'Authorization': 'Bearer ' + token}
                                                }).then(() => {
                                                    fetched++;
                                                    if (carousel.length === fetched) {
                                                        dispatch(setIdle());
                                                    }
                                                }).catch(() => {
                                                    dispatch(setIdle());
                                                    dispatch(isError('Si è verificato un errore nell\'aggiornamento della copertina. Riprovare.'));
                                                })
                                            }, error() {
                                                dispatch(setIdle());
                                                dispatch(isError('Si è verificato un errore nell\'aggiornamento della copertina. Riprovare.'));
                                            }
                                        })
                                    } else {
                                        fetched++;
                                        if (carousel.length === fetched) {
                                            dispatch(setIdle());
                                        }
                                    }
                                } else {
                                    dispatch(setBusy());
                                    let data = {};
                                    data['carousel' + picture.index] = null;
                                    axios.put(appContext.ENDPOINT_SHOPS + "/" + responseFinal?.data?.id, data, {
                                        headers: {'Authorization': 'Bearer ' + token}
                                    }).then(() => {
                                        fetched++;
                                        if (carousel.length === fetched) {
                                            dispatch(setIdle());
                                        }
                                    }).catch(() => {
                                        dispatch(setIdle());
                                        dispatch(isError('Si è verificato un errore nell\'aggiornamento della copertina. Riprovare.'));
                                    })
                                }
                            }

                        }).catch(() => {
                            dispatch(setIdle());
                        })
                    }, error() {
                        dispatch(setIdle());
                    }
                })
            } else if (userType === 'cliente') {
                alert('Da implementare...')
            }
        }).catch(() => {
            dispatch(setIdle());
        });
    };

    const canNext = () => {
        if (userType === 'negozio') {
            switch (activeStep) {
                case 0:
                    return true;
                case 1:
                    return (username !== '' && title !== '' && website !== '' && telephone !== '' && description !== '' && avatar.image && carousel.some((element) => (!element.add)) > 0);
                    // return true;
                case 2:
                    return (email !== '' && password !== '' && confirmPassword !== '' && (password === confirmPassword) && consent);
                    // return true;
                default:
                    return true;
            }
        } else if (userType === 'cliente') {
            switch (activeStep) {
                case 0:
                    return true;
                case 1:
                    return (username !== '' && email !== '' && name !== '' && surname !== '' && telephone !== '' && avatar.image);
                case 2:
                    return consent;
                default:
                    return true;
            }
        }
    };

    useEffect(() => {
        setCarousel(initImageList([], appContext.MAX_PICTURES_CAROUSEL));
    }, []);

    return (
        <>
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                {!signupCompleted &&
                    <Row className='justify-content-center'>
                    <Typography variant='h1' className='text-center'>REGISTRATI</Typography>
                </Row>}
                <br/>
                <br/>
                <Row className='justify-content-center'>
                    {!signupCompleted &&
                        <>
                            <Col>
                                <Row className='justify-content-center'>
                                    <Stepper activeStep={activeStep}>
                                        {steps.map((label, index) => {
                                            return (
                                                <Step key={label} completed={isStepSkipped(index)} sx={{color: red[600]}}>
                                                    <StepLabel>{label}</StepLabel>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                </Row>
                                <br/>
                                <br/>
                                <Row className='justify-content-center'>
                                    <Col className='align-self-center'>
                                        {(activeStep === 0) &&
                                            <>
                                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                                    <ToggleButtonGroup
                                                        size="large"
                                                        value={userType ?? ''}
                                                        onChange={onChangeUserType}
                                                        exclusive={true}>
                                                        <ToggleButton value="negozio">
                                                            <StoreIcon/>
                                                            <Typography variant='subtitle1'>Negozio</Typography>
                                                        </ToggleButton>,
                                                        <ToggleButton value="cliente">
                                                            <GroupIcon/>
                                                            <Typography variant='subtitle1'>Cliente</Typography>
                                                        </ToggleButton>
                                                    </ToggleButtonGroup>
                                                </Box>
                                            </>
                                        }
                                        {(activeStep === 1) &&
                                            <>
                                                {
                                                    (userType === 'negozio') &&
                                                    <>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            gap: 2,
                                                            justifyContent: 'center'
                                                        }}>
                                                            <TextField
                                                                onChange={onChangeUsername}
                                                                autoFocus
                                                                value={username ?? ''}
                                                                color='secondary'
                                                                margin="dense"
                                                                label="Username"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <BadgeIcon/>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                variant="outlined"/>
                                                            <TextField
                                                                onChange={onChangeTitle}
                                                                autoFocus
                                                                value={title ?? ''}
                                                                color='secondary'
                                                                margin="dense"
                                                                label="Titolo"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <StarIcon/>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                variant="outlined"/>
                                                            <TextField
                                                                onChange={onChangeWebsite}
                                                                autoFocus
                                                                value={website ?? ''}
                                                                color='secondary'
                                                                margin="dense"
                                                                label="Sito Web"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <LanguageIcon/>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                variant="outlined"/>
                                                            <TextField
                                                                onChange={onChangeTelephone}
                                                                autoFocus
                                                                value={telephone ?? ''}
                                                                color='secondary'
                                                                margin="dense"
                                                                label="Telefono"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <CallIcon/>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                variant="outlined"/>
                                                        </Box>
                                                        <Box>
                                                            <TextField fullWidth={true}
                                                                       onChange={onChangeDescription}
                                                                       autoFocus
                                                                       value={description ?? ''}
                                                                       multiline={true}
                                                                       color='secondary'
                                                                       margin="dense"
                                                                       InputProps={{
                                                                           startAdornment: (
                                                                               <InputAdornment position="start">
                                                                                   <TextFieldsIcon/>
                                                                               </InputAdornment>
                                                                           ),
                                                                       }}
                                                                       label="Descrizione"
                                                                       variant="outlined"/>
                                                        </Box>
                                                        <br/>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            gap: 2,
                                                            justifyContent: 'center'
                                                        }}>
                                                            <label htmlFor="avatar-uploader" className='text-center'>
                                                                <Input
                                                                    accept="image/*"
                                                                    id="avatar-uploader"
                                                                    type="file"
                                                                    hidden
                                                                    onChange={onChangeAvatar}/>
                                                                <Avatar
                                                                    onMouseOver={() => {
                                                                        setEditAvatar(true)
                                                                    }}
                                                                    onMouseLeave={() => {
                                                                        setEditAvatar(false)
                                                                    }}
                                                                    style={{
                                                                        width: 48,
                                                                        height: 48,
                                                                        cursor: editAvatar ? 'pointer' : null
                                                                    }}
                                                                    src={!editAvatar ? avatar.image : null}>
                                                                    {editAvatar && <AddPhotoAlternateIcon/>}
                                                                </Avatar>
                                                            </label>
                                                        </Box>
                                                        <br/>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            gap: 2,
                                                            justifyContent: 'center'
                                                        }}>
                                                            <ImageList sx={{width: 800, height: 350}}
                                                                       gap={5} cols={30}>
                                                                {carousel.map((item) => {
                                                                    if (item.add) {
                                                                        return (
                                                                            <ImageListItem key={item.index} cols={10} rows={1}>

                                                                                <ImageListItemBar
                                                                                    actionIcon={
                                                                                        [
                                                                                            <label htmlFor="icon-button-file"
                                                                                                   key={0}>
                                                                                                <Input accept="image/*"
                                                                                                       id="icon-button-file"
                                                                                                       type="file" hidden
                                                                                                       onChange={(e) => {
                                                                                                           addPicture(e, item.index)
                                                                                                       }}/>
                                                                                                <IconButton
                                                                                                    sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                                                                                    aria-label="upload picture"
                                                                                                    component="span">
                                                                                                    <PhotoCamera/>
                                                                                                </IconButton>
                                                                                            </label>]}
                                                                                />
                                                                            </ImageListItem>)
                                                                    } else {
                                                                        return (
                                                                            <ImageListItem key={item.index} cols={10} rows={1}>
                                                                                <ProgressiveImg image={item.image}/>
                                                                                <ImageListItemBar
                                                                                    actionIcon={
                                                                                        [
                                                                                            <IconButton
                                                                                                sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                                                                                key={0}
                                                                                                onClick={() => {
                                                                                                    window.open(item.image, '_blank', 'noopener,noreferrer')
                                                                                                }}>
                                                                                                <OpenInFullIcon/>
                                                                                            </IconButton>,
                                                                                            <IconButton
                                                                                                sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                                                                                onClick={() => {
                                                                                                    removePicture(item.index)
                                                                                                }} key={1}>
                                                                                                <DeleteForeverIcon/>
                                                                                            </IconButton>
                                                                                        ]}
                                                                                />
                                                                            </ImageListItem>)
                                                                    }
                                                                })}
                                                            </ImageList>
                                                        </Box>

                                                    </>
                                                }
                                                {
                                                    (userType === 'cliente') &&
                                                    <>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            gap: 2,
                                                            justifyContent: 'center'
                                                        }}>
                                                            <TextField
                                                                onChange={onChangeUsername}
                                                                autoFocus
                                                                value={username ?? ''}
                                                                color='secondary'
                                                                margin="dense"
                                                                label="Username"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <BadgeIcon/>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                variant="outlined"/>
                                                            <TextField
                                                                onChange={onChangeName}
                                                                autoFocus
                                                                value={name ?? ''}
                                                                color='secondary'
                                                                margin="dense"
                                                                label="Nome"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <StarIcon/>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                variant="outlined"/>
                                                            <TextField
                                                                onChange={onChangeSurname}
                                                                autoFocus
                                                                value={surname ?? ''}
                                                                color='secondary'
                                                                margin="dense"
                                                                label="Cognome"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <StarIcon/>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                variant="outlined"/>
                                                            <TextField
                                                                onChange={onChangeTelephone}
                                                                autoFocus
                                                                value={telephone ?? ''}
                                                                color='secondary'
                                                                margin="dense"
                                                                label="Telefono"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <CallIcon/>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                variant="outlined"/>
                                                        </Box>
                                                        <br/>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            gap: 2,
                                                            justifyContent: 'center'
                                                        }}>
                                                            <label htmlFor="avatar-uploader" className='text-center'>
                                                                <Input
                                                                    accept="image/*"
                                                                    id="avatar-uploader"
                                                                    type="file"
                                                                    hidden
                                                                    onChange={onChangeAvatar}/>
                                                                <Avatar
                                                                    onMouseOver={() => {
                                                                        setEditAvatar(true)
                                                                    }}
                                                                    onMouseLeave={() => {
                                                                        setEditAvatar(false)
                                                                    }}
                                                                    style={{
                                                                        width: 48,
                                                                        height: 48,
                                                                        cursor: editAvatar ? 'pointer' : null
                                                                    }}
                                                                    src={!editAvatar ? avatar.image : null}>
                                                                    {editAvatar && <AddPhotoAlternateIcon/>}
                                                                </Avatar>
                                                            </label>
                                                        </Box>
                                                    </>
                                                }
                                            </>
                                        }
                                        {(activeStep === 2) &&
                                            <>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    justifyContent: 'center'
                                                }}>
                                                    <TextField
                                                        onChange={onChangeEmail}
                                                        autoFocus
                                                        value={email ?? ''}
                                                        color='secondary'
                                                        margin="dense"
                                                        label="Email"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <EmailIcon/>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        variant="outlined"/>
                                                    <TextField
                                                        onChange={onChangePassword}
                                                        type={showPassword ? 'text' : 'password'}
                                                        color='secondary'
                                                        margin="dense"
                                                        InputProps={{
                                                            endAdornment: <IconButton position="start"
                                                                                      onClick={onChangeShowPassword}>{
                                                                showPassword ? <VisibilityOff/> : <Visibility/>}</IconButton>,
                                                        }}

                                                        label="Password"
                                                        variant="outlined"/>
                                                    <TextField
                                                        onChange={onChangeConfirmPassword}
                                                        type={showPassword ? 'text' : 'password'}
                                                        color='secondary'
                                                        margin="dense"
                                                        InputProps={{
                                                            endAdornment: <IconButton position="start"
                                                                                      onClick={onChangeShowPassword}>{
                                                                showPassword ? <VisibilityOff/> : <Visibility/>}</IconButton>,
                                                        }}

                                                        label="Conferma Password"
                                                        variant="outlined"/>
                                                </Box>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    justifyContent: 'center'
                                                }}>
                                                    <Checkbox
                                                        checked={consent}
                                                        onChange={onChangeConsens}
                                                        sx={{
                                                            color: red[800],
                                                            '&.Mui-checked': {
                                                                color: red[600],
                                                            },
                                                        }}
                                                    />
                                                    Accetto i Termini di Servizio e la policy relativa alla
                                                    privacy
                                                </Box>
                                            </>
                                        }
                                        {/*{(activeStep === 3) &&*/}
                                        {/*    <>*/}
                                        {/*        <Typography sx={{mt: 2, mb: 1}}>*/}
                                        {/*            Step completati*/}
                                        {/*        </Typography>*/}
                                        {/*        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>*/}
                                        {/*            <Box sx={{flex: '1 1 auto'}}/>*/}
                                        {/*            <Button onClick={resetStep}>Reset</Button>*/}
                                        {/*        </Box>*/}
                                        {/*    </>*/}
                                        {/*}*/}
                                    </Col>
                                </Row>
                                <br/>
                                <br/>
                                <Row>
                                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                        <Button
                                            variant='contained'
                                            style={{backgroundColor: activeStep === 0 ? 'grey' : 'darkred'}}
                                            disabled={activeStep === 0}
                                            onClick={backStep}
                                            sx={{mr: 1}}>
                                            Indietro
                                        </Button>
                                        <Box sx={{flex: '1 1 auto'}}/>
                                        {!(activeStep === steps.length - 1) && <Button onClick={nextStep}
                                                                                       variant='contained' disabled={!canNext()}
                                                                                       style={{backgroundColor: canNext() ? 'darkred' : 'grey'}}>
                                            Avanti
                                        </Button>}
                                        {(activeStep === steps.length - 1) && <Button onClick={() => {setSignupCompleted(true)}}
                                                                                      variant='contained' disabled={!canNext()}
                                                                                      style={{backgroundColor: canNext() ? 'darkred' : 'grey'}}>
                                            Registrati
                                        </Button>}
                                    </Box>
                                </Row>
                            </Col>
                        </>
                    }
                    {signupCompleted &&
                        <>
                            <Col>
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography variant='h2' st>REGISTRAZIONE COMPLETATA!</Typography>
                                        <Typography variant='h5'>Per potere accedere all'applicazione conferma la registrazione attraverso il link ricevuto nella tua mail.</Typography>
                                    </ThemeProvider>
                                </Box>
                                <br/>
                                <br/>
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                    <img src={signupOk} alt='' style={{width: smallScreen ? '80%' : mediumScreen ? '50%' : '30%', height: 'auto'}}/>
                                </Box>
                                <br/>
                                <br/>
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                    <Button variant="contained" style={{backgroundColor: 'darkred'}}
                                            onClick={null}>{'LOGIN'}</Button>
                                </Box>
                                {/*<Row className='justify-content-center'>*/}
                                {/*</Row>*/}
                            </Col>

                        </>
                    }
                </Row>
                <br/>
                <br/>
            </Container>
        </>
    );
}
