import Typography from "@mui/material/Typography";
import {Col, Container, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import GlobalContext from "./GlobalContext";
import {useDispatch, useSelector} from "react-redux";
import {
    createTheme, Input, InputAdornment,
    responsiveFontSizes,
    TextField, ThemeProvider,
    ToggleButton,
    ToggleButtonGroup,
    useMediaQuery
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {setBusy, setIdle} from "./store/loading";
import axios from "axios";
import {initImageList} from "./Utility";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import {red} from "@mui/material/colors";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import StoreIcon from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";
import StarIcon from "@mui/icons-material/Star";
import LanguageIcon from "@mui/icons-material/Language";
import CallIcon from "@mui/icons-material/Call";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Avatar from "@material-ui/core/Avatar";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Compressor from "compressorjs";
import Button from "@mui/material/Button";
import signupOk from "./assets/complete.svg";
import * as React from "react";
import {isError} from "./store/dialogs";
import PictureCard from "./PictureCard";
import {setFirstAccess} from "./store/user";

export default function Wizard() {
    const steps = ['Sei un negozio o un cliente?', 'Informazioni di base', 'Immagine di profilo e copertina'];
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [userType, setUserType] = useState('negozio');
    const [title, setTitle] = useState(null);
    const [website, setWebsite] = useState(null);
    const [telephone, setTelephone] = useState(null);
    const [description, setDescription] = useState(null);
    const [carousel, setCarousel] = useState([]);
    const [avatar, setAvatar] = useState({image: null, rawImage: null});
    const [editAvatar, setEditAvatar] = useState(false);
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [signupCompleted, setSignupCompleted] = useState(false);
    const appContext = useContext(GlobalContext);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token.value);
    const username = useSelector((state) => state.user.username);
    const email = useSelector((state) => state.user.email);
    const theme = responsiveFontSizes(createTheme());
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    let navigate = useNavigate();

    const onChangeUserType = (event, typeUser) => {
        setUserType(typeUser);
    };

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeWebsite = (e) => {
        setWebsite(e.target.value);
    };

    const onChangeTelephone = (e) => {
        setTelephone(e.target.value.replace(/[^0-9]/g, ''));
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

    const removePendent = () => {
        axios.get(appContext.ENDPOINT_PENDENTS + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            axios.delete(appContext.ENDPOINT_PENDENTS + '/' + response.data[0].id, {
                headers: {'Authorization': 'Bearer ' + token}
            })
        })
    };

    const addUser = () => {
        let fetched = 0;
        let dataShop = {
            email: email,
            title: title,
            description: description,
            username: username,
            website: website,
            telephone: telephone
        };
        let dataClient = {
            email: email,
            name: name,
            surname: surname,
            username: username,
            telephone: telephone
        };
        const formData = new FormData();
        dispatch(setBusy());
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
                                                    setSignupCompleted(true);
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
                                        setSignupCompleted(true);
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
                                        setSignupCompleted(true);
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
            new Compressor(avatar.rawImage, {
                quality: appContext.COMPRESSION_QUALITY, success(result) {
                    formData.append('files.avatar', result, 'avatar.jpg');
                    formData.append('data', JSON.stringify(dataClient));
                    axios.post(appContext.ENDPOINT_SHOPS, formData, {
                        headers: {'Authorization': 'Bearer ' + token}
                    }).then((responseFinal) => {
                        dispatch(setIdle());
                        setSignupCompleted(true);
                    }).catch(() => {
                        dispatch(setIdle());
                    })
                }, error() {
                    dispatch(setIdle());
                }
            })
        }
    };

    const canNext = () => {
        if (userType === 'negozio') {
            switch (activeStep) {
                case 0:
                    return userType;
                case 1:
                    return (title && website && telephone && description);
                case 2:
                    return (avatar.image && carousel.some((element) => (!element.add)) > 0);
                default:
                    return true;
            }
        } else if (userType === 'cliente') {
            switch (activeStep) {
                case 0:
                    return true;
                case 1:
                    return (email !== '' && name !== '' && surname !== '' && telephone !== '' && avatar.image);
                case 2:
                    return true;
                default:
                    return true;
            }
        }
    };

    const goToProfile = () => {
        removePendent();
        dispatch(setFirstAccess(false))
        navigate(appContext.routes.user + '/' + username);
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
                        <ThemeProvider theme={theme}>
                            <Typography variant='h2' className='text-center'>COMPLETA IL TUO PROFILO</Typography>
                        </ThemeProvider>

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
                                                <Step key={label} completed={isStepSkipped(index)}
                                                      sx={{color: red[600]}}>
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
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center'
                                                }}>
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
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            gap: 2,
                                                            justifyContent: 'center'
                                                        }}>
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
                                                                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
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
                                                            <TextField onChange={onChangeDescription}
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
                                                                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
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
                                                    </>
                                                }
                                            </>
                                        }
                                        {(activeStep === 2) &&
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
                                                            <Typography variant='subtitle1'>Immagine del
                                                                profilo: </Typography>
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
                                                        <Typography variant='subtitle1'>Immagini di
                                                            copertina: </Typography>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            gap: 2,
                                                            justifyContent: 'center'
                                                        }}>
                                                            {carousel.map((item) => {
                                                                if (item.add) {
                                                                    return (
                                                                        <PictureCard
                                                                            key={item.index}
                                                                            height={300}
                                                                            width={180}
                                                                            edit={true}
                                                                            add={item.add}
                                                                            index={item.index}
                                                                            addPicture={addPicture}/>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <PictureCard
                                                                            key={item.index}
                                                                            edit={true}
                                                                            height={300}
                                                                            width={180}
                                                                            add={item.add}
                                                                            picture={item.image}
                                                                            removePicture={removePicture}/>
                                                                    )
                                                                }
                                                            })}
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
                                                                                       variant='contained'
                                                                                       disabled={!canNext()}
                                                                                       style={{backgroundColor: canNext() ? 'darkred' : 'grey'}}>
                                            Avanti
                                        </Button>}
                                        {(activeStep === steps.length - 1) && <Button onClick={addUser}
                                                                                      variant='contained'
                                                                                      disabled={!canNext()}
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
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <ThemeProvider theme={theme}>
                                        <Typography variant='h2' st>PROFILO COMPLETATO!</Typography>
                                        <Typography variant='h5'>Il tuo profilo è stato completato con tutte le
                                            informazioni.
                                            Premi il pulsante qui in basso per vedere il tuo profilo ed iniziare a
                                            inserire un prodotto.</Typography>
                                    </ThemeProvider>
                                </Box>
                                <br/>
                                <br/>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <img src={signupOk} alt='' style={{
                                        width: smallScreen ? '80%' : mediumScreen ? '50%' : '30%',
                                        height: 'auto'
                                    }}/>
                                </Box>
                                <br/>
                                <br/>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Button variant="contained"
                                            style={{backgroundColor: 'darkred'}}
                                            fullWidth={true}
                                            onClick={goToProfile}>VEDI PROFILO</Button>
                                </Box>
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