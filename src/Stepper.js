import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    Checkbox,
    Container, IconButton, ImageList,
    ImageListItem,
    ImageListItemBar, Input,
    InputAdornment,
    TextField,
    ToggleButton,
    ToggleButtonGroup
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
import PersonIcon from '@mui/icons-material/Person';

export default function MyStepper() {
    const steps = ['Sei un negozio o un cliente?', 'Inserisci le informazioni', 'Registrati'];
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [userType, setUserType] = useState('negozio');
    const [email, setEmail] = useState(null);
    const [title, setTitle] = useState(null);
    const [website, setWebsite] = useState(null);
    const [telephone, setTelephone] = useState(null);
    const [description, setDescription] = useState(null);
    const [pictures, setPictures] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const [editAvatar, setEditAvatar] = useState(false);

    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const appContext = useContext(GlobalContext);

    const onChangeTypeUser = (event, typeUser) => {
        setUserType(typeUser);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
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

    const onChangeSurname = (e) => {
        setSurname(e.target.value);
    };

    const addPicture = (e, i) => {
        let tmpPictures = [];
        for (let picture of pictures) {
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
        setPictures(tmpPictures);
    };

    const removePicture = (i) => {
        let tmpPictures = [];

        for (let picture of pictures) {
            if (picture.index === i) {
                tmpPictures.push({index: picture.index, image: null, rawImage: null, add: true});
            } else {
                tmpPictures.push(picture);
            }
        }
        setPictures(tmpPictures);
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

    // const resetStep = () => {
    //     setActiveStep(0);
    // };

    useEffect(() => {
        setPictures(initImageList([], appContext.MAX_PICTURES_CAROUSEL));
    }, []);

    return (
        <>
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row className='justify-content-center'>
                    <Typography variant='h1' className='text-center'>REGISTRATI</Typography>
                </Row>
                <br/>
                <br/>
                <Row className='justify-content-center'>
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
                                                value={userType}
                                                onChange={onChangeTypeUser}
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
                                                        onChange={onChangeEmail}
                                                        autoFocus
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
                                                        onChange={onChangeTitle}
                                                        autoFocus
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
                                                        onChange={onChangeWebsite}
                                                        autoFocus
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
                                                            onChange={(e) => {setAvatar(URL.createObjectURL(e.target.files[0]))}}/>
                                                        <Avatar
                                                            onMouseOver={() => {setEditAvatar(true)}}
                                                            onMouseLeave={() => {setEditAvatar(false)}}
                                                            style={{width: 48, height: 48, cursor: editAvatar ? 'pointer' : null}}
                                                            src={!editAvatar && avatar}>
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
                                                        {pictures.map((item) => {
                                                            if (item.add) {
                                                                return (<ImageListItem key={item.index} cols={10} rows={1}>

                                                                    <ImageListItemBar
                                                                        actionIcon={
                                                                            [
                                                                                <label htmlFor="icon-button-file" key={0}>
                                                                                    <Input accept="image/*" id="icon-button-file" type="file" hidden
                                                                                           onChange={(e) => {
                                                                                               addPicture(e, item.index)
                                                                                           }}/>
                                                                                    <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                                                                                aria-label="upload picture" component="span">
                                                                                        <PhotoCamera/>
                                                                                    </IconButton>
                                                                                </label>]}
                                                                    />
                                                                </ImageListItem>)
                                                            } else {
                                                                return (<ImageListItem key={item.index} cols={10} rows={1}>
                                                                    <ProgressiveImg image={item.image} />
                                                                    <ImageListItemBar
                                                                        actionIcon={
                                                                            [
                                                                                <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}} key={0}
                                                                                            onClick={() => {
                                                                                                window.open(item.image, '_blank', 'noopener,noreferrer')
                                                                                            }}>
                                                                                    <OpenInFullIcon/>
                                                                                </IconButton>,
                                                                                <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}} onClick={() => {
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
                                                        onChange={onChangeEmail}
                                                        autoFocus
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
                                                        onChange={onChangeName}
                                                        autoFocus
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
                                                            onChange={(e) => {setAvatar(URL.createObjectURL(e.target.files[0]))}}/>
                                                        <Avatar
                                                            onMouseOver={() => {setEditAvatar(true)}}
                                                            onMouseLeave={() => {setEditAvatar(false)}}
                                                            style={{width: 48, height: 48, cursor: editAvatar ? 'pointer' : null}}
                                                            src={!editAvatar && avatar}>
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
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 2,
                                        justifyContent: 'center'
                                    }}>
                                        <Checkbox
                                            defaultChecked
                                            sx={{
                                                color: red[800],
                                                '&.Mui-checked': {
                                                    color: red[600],
                                                },
                                            }}
                                        />
                                        Accetti i nostri Termini di Servizio e la nostra policy relativa alla privacy
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
                                         variant='contained'
                                         style={{backgroundColor: 'darkred'}}>
                                    Avanti
                                </Button>}
                                {(activeStep === steps.length - 1) && <Button onClick={() => {alert('Registrazione...')}}
                                         variant='contained'
                                         style={{backgroundColor: 'darkred'}}>
                                    Concludi
                                </Button>}
                            </Box>
                        </Row>
                    </Col>
                </Row>
                <br/>
                <br/>
            </Container>
        </>
    );
}
