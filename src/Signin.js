import {
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
import React, {useContext, useState} from "react";
import girl from './assets/girl.svg';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import StoreIcon from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import {setToken} from "./store/token";
import {setMail, setUsername} from "./store/user";
import {isError} from "./store/error";
import GlobalContext from "./GlobalContext";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function Signin() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState('negozio');
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const appContext = useContext(GlobalContext);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onChangeUserType = (event, typeUser) => {
        setUserType(typeUser);
    };

    const canLogin = () => {
        return (email !== '' && password !== '');
    };

    const login = () => {
        setLoading(true);
        let data = {identifier: email, password: password};
        axios.post(appContext.ENDPOINT_AUTH, data).then((response) => {
            dispatch(setToken(response.data.jwt));
            dispatch(setMail(response.data.user.email));
            dispatch(setUsername(response.data.user.username));
            setLoading(false);
            navigate(appContext.routes.home);

        }).catch((e) => {
            setLoading(false);
            dispatch(isError('Errore di autenticazione. Riprovare.'));
        });
    };

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
                    <Grid container spacing={5}>
                        {(!smallScreen && !mediumScreen) && <Grid item md={5} lg={5} xl={7}>
                            <img src={girl} style={{width: '100%', height: 'auto'}} alt=""/>
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
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'center'
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
                            <br/>
                            {!loading && <Row className='justify-content-center'>
                                <Button
                                    disabled={!canLogin()}
                                    variant="contained"
                                    component="span"
                                    style={{backgroundColor: canLogin() ? 'darkred' : 'gray'}}
                                    onClick={login}>ENTRA</Button>
                            </Row>}
                        </Grid>
                    </Grid>
                </Row>
                <br/>
            </Container>
        </>
    )
}