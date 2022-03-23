import {
    Checkbox,
    CircularProgress,
    Container, Grid,
    IconButton,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import React, {useContext, useEffect, useState} from "react";
import signinSVG from './assets/signin.svg';
import signupSVG from './assets/signup.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {Visibility, VisibilityOff} from "@material-ui/icons";
import StoreIcon from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import {clearToken, setToken} from "./store/token";
import {clearFirstAccess, clearMail, clearType, clearUsername, setFirstAccess, setMail, setUser} from "./store/user";
import {isError, isNotice} from "./store/dialogs";
import GlobalContext from "./GlobalContext";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {red} from "@mui/material/colors";

export default function Welcome() {
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [consent, setConsent] = useState(false);

    const [loading, setLoading] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignin, setIsSignin] = useState(true);
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const appContext = useContext(GlobalContext);
    const dispatch = useDispatch();
    let navigate = useNavigate();

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

    const onChangeShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onChangeConsent = () => {
        setConsent(!consent);
    };

    const canSignin = () => {
        return (email !== '' && password !== '');
    };

    const canSignup = () => {
        return (username !== '' && email !== '' && password !== '' && confirmPassword !== '' && (password === confirmPassword) && consent);
    };

    const clearAll = () => {
        dispatch(clearToken());
        dispatch(clearType());
        dispatch(clearMail());
        dispatch(clearUsername());
        dispatch(clearFirstAccess());
    };

    const signin = () => {
        setLoading(true);
        let data = {identifier: email, password: password};
        axios.post(appContext.ENDPOINT_AUTH, data).then((response) => {
            dispatch(setToken(response.data.jwt));
            dispatch(setMail(response.data.user.email));
            dispatch(setUser(response.data.user.username));
            setLoading(false);
            axios.get(appContext.ENDPOINT_PENDENTS + '/?username=' + response.data.user.username, {
                headers: {'Authorization': 'Bearer ' + response.data.jwt}
            }).then((response) => {
                if (response.data.length === 0) {
                    dispatch(setFirstAccess(false));
                    navigate(appContext.routes.home);
                } else {
                    dispatch(setFirstAccess(true));
                    navigate(appContext.routes.wizard);
                }
            }).catch((error) => {
                clearAll();
                setLoading(false);
                dispatch(isError('Errore nella fase di autenticazione. Riprovare.'));
            })
        }).catch((e) => {
            clearAll();
            setLoading(false);
            dispatch(isError('Errore nella fase di autenticazione. Riprovare.'));
        });
    };

    const signup = () => {
        let dataSignup = {
            username: username,
            email: email,
            password: password
        };
        let dataPendent = {
            username: username,
            email: email,
        }
        setLoading(true);
        axios.post(appContext.ENDPOINT_REGISTER, dataSignup).then(
            () => {
                axios.post(appContext.ENDPOINT_PENDENTS, dataPendent).then(
                    () => {
                        setLoading(false);
                        dispatch(isNotice('Registrazione completata! Per potere accedere, conferma la registrazione attraverso il link ricevuto nella tua mail!'));
                        setIsSignin(true);
                    }
                ).catch(() => {
                    setLoading(false);
                    dispatch(isError('Errore nella fase di registrazione. Riprovare.'));
                })
            }
        ).catch(() => {
            setLoading(false);
            dispatch(isError('Errore nella fase di registrazione. Riprovare.'));
        })
    };

    useEffect(() => {
        clearAll();
    }, []);

    return (
        <>
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Typography variant="h1" gutterBottom className="text-center"
                                style={{color: 'black', fontWeight: 'bold'}}>
                        Masonry
                    </Typography>
                    <Typography variant="h3" gutterBottom className="text-center" style={{color: 'darkred'}}>
                        Descrizione Masonry
                    </Typography>
                </Row>
                <br/>
                <br/>
                <Row className='justify-content-center'>
                    {isSignin && <Grid container spacing={5}>
                        {(!smallScreen && !mediumScreen) && <Grid item md={5} lg={5} xl={7}>
                            <img src={signinSVG} style={{width: '90%', height: 'auto'}} alt=""/>
                        </Grid>}
                        <Grid item xs={12} sm={12} md={7} lg={7} xl={5}>
                            <Row className='justify-content-center'>
                                <Typography variant='subtitle1'>Inserisci qui le informazioni per
                                    accedere: </Typography>
                            </Row>
                            <Row className='justify-content-center'>
                                <TextField
                                    onChange={onChangeEmail}
                                    autoFocus
                                    color='secondary'
                                    margin="dense"
                                    label="Email"
                                    variant="outlined"/>
                            </Row>
                            <Row className='justify-content-center'>
                                <TextField
                                    onChange={onChangePassword}
                                    type={showPassword ? 'text' : 'password'}
                                    color='secondary'
                                    InputProps={{
                                        endAdornment: <IconButton position="start" onClick={onChangeShowPassword}>{
                                            showPassword ? <VisibilityOff/> : <Visibility/>}</IconButton>,
                                    }}
                                    margin="dense"
                                    label="Password"
                                    variant="outlined"/>
                            </Row>
                            <br/>
                            {/*<Box sx={{*/}
                            {/*    display: 'flex',*/}
                            {/*    flexDirection: 'row',*/}
                            {/*    alignItems: 'center',*/}
                            {/*    gap: 2,*/}
                            {/*    justifyContent: 'center'*/}
                            {/*}}>*/}
                            {/*    <ToggleButtonGroup*/}
                            {/*        size="large"*/}
                            {/*        value={userType ?? ''}*/}
                            {/*        onChange={onChangeUserType}*/}
                            {/*        exclusive={true}>*/}
                            {/*        <ToggleButton value="negozio">*/}
                            {/*            <StoreIcon/>*/}
                            {/*            <Typography variant='subtitle1'>Negozio</Typography>*/}
                            {/*        </ToggleButton>,*/}
                            {/*        <ToggleButton value="cliente">*/}
                            {/*            <GroupIcon/>*/}
                            {/*            <Typography variant='subtitle1'>Cliente</Typography>*/}
                            {/*        </ToggleButton>*/}
                            {/*    </ToggleButtonGroup>*/}
                            {/*</Box>*/}
                            {loading && <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'center'
                            }}>
                                <CircularProgress color={'error'} className='text-center'/>
                            </Box>}
                            <br/>
                            {!loading && <Row className='justify-content-center'>
                                <Button
                                    disabled={!canSignin()}
                                    variant="contained"
                                    component="span"
                                    style={{backgroundColor: canSignin() ? 'darkred' : 'gray'}}
                                    onClick={signin}>ENTRA</Button>
                            </Row>
                            }
                            <hr/>
                            {!loading && <Row className='justify-content-center'>
                                <Button
                                    variant="contained"
                                    component="span"
                                    style={{backgroundColor: 'red'}}
                                    onClick={() => {
                                        setIsSignin(false)
                                    }}>PRIMA VOLTA? REGISTRATI!</Button>
                            </Row>}
                        </Grid>
                    </Grid>}
                    {!isSignin && <Grid container spacing={5}>
                        {(!smallScreen && !mediumScreen) && <Grid item md={5} lg={5} xl={7}>
                            <img src={signupSVG} style={{width: '90%', height: 'auto'}} alt=""/>
                        </Grid>}
                        <Grid item xs={12} sm={12} md={7} lg={7} xl={5}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'center'
                            }}>
                                <IconButton onClick={() => {
                                    setIsSignin(true)
                                }}><ArrowBackIcon/></IconButton>
                                <Typography variant='subtitle1'>Compila i seguenti campi per registrarti: </Typography>
                            </Box>
                            <Row className='justify-content-center'>
                                <TextField
                                    onChange={onChangeUsername}
                                    value={username}
                                    autoFocus
                                    color='secondary'
                                    margin="dense"
                                    label="Username"
                                    variant="outlined"/>
                            </Row>
                            <Row className='justify-content-center'>
                                <TextField
                                    onChange={onChangeEmail}
                                    value={email}
                                    autoFocus
                                    color='secondary'
                                    margin="dense"
                                    label="Email"
                                    variant="outlined"/>
                            </Row>
                            <Row className='justify-content-center'>
                                <TextField
                                    onChange={onChangePassword}
                                    value={password}
                                    type={showPassword ? 'text' : 'password'}
                                    color='secondary'
                                    InputProps={{
                                        endAdornment: <IconButton position="start" onClick={onChangeShowPassword}>{
                                            showPassword ? <VisibilityOff/> : <Visibility/>}</IconButton>,
                                    }}
                                    margin="dense"
                                    label="Password"
                                    variant="outlined"/>
                            </Row>
                            <Row className='justify-content-center'>
                                <TextField
                                    onChange={onChangeConfirmPassword}
                                    value={confirmPassword}
                                    type={showPassword ? 'text' : 'password'}
                                    color='secondary'
                                    InputProps={{
                                        endAdornment: <IconButton position="start" onClick={onChangeShowPassword}>{
                                            showPassword ? <VisibilityOff/> : <Visibility/>}</IconButton>,
                                    }}
                                    margin="dense"
                                    label="Conferma Password"
                                    variant="outlined"/>
                            </Row>
                            <br/>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'center'
                            }}>
                                <Checkbox
                                    checked={consent}
                                    onChange={onChangeConsent}
                                    sx={{
                                        color: red[800],
                                        '&.Mui-checked': {
                                            color: red[600],
                                        },
                                    }}
                                />
                                Accetto i Termini di Servizio e la Privacy Policy
                            </Box>
                            <br/>

                            {loading && <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'center'
                            }}>
                                <CircularProgress color={'error'} className='text-center'/>
                            </Box>}
                            {!loading && <Row className='justify-content-center'>
                                <Button
                                    disabled={!canSignup()}
                                    variant="contained"
                                    component="span"
                                    style={{backgroundColor: canSignup() ? 'darkred' : 'gray'}}
                                    onClick={signup}>REGISTRATI</Button>
                            </Row>
                            }
                        </Grid>
                    </Grid>}

                </Row>
                <br/>
            </Container>
        </>
    )
}