import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {alpha, IconButton, InputBase, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import Typography from "@mui/material/Typography";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import {useNavigate} from "react-router-dom";
import GlobalContext from "./GlobalContext";
import {useContext} from "react";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import InfoIcon from '@mui/icons-material/Info';
import {useDispatch, useSelector} from "react-redux";
import {isNotLogged} from "./store/login";

export default function TopToolbar() {
    let navigate = useNavigate();
    const appContext = useContext(GlobalContext);
    const stateLogin = useSelector((state) => state.login.value);
    const dispatch = useDispatch();

    const goToHome = () => {
        navigate("/home");
    };

    const goToAbout = () => {
        navigate("/about");
    }

    const login = () => {
        appContext.setInitLogin(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch(isNotLogged());
    }

    const increaseColumnsSize = () => {
        if (appContext.columnWidth >= 500) {
            appContext.setColumnWidth(appContext.columnWidth);
        } else {
            appContext.setColumnWidth(appContext.columnWidth + 50);
        }
    };

    const decreaseColumnsSize = () => {
        if (appContext.columnWidth <= 250) {
            appContext.setColumnWidth(appContext.columnWidth);
        } else {
            appContext.setColumnWidth(appContext.columnWidth - 50);
        }
    };

    const getNewToken = () => {
        appContext.getNewToken();
    }

    return (
        <>
            <Box sx={{flexGrow: 1}} style={{position: 'fixed', top: 0, zIndex: 100, width: '100%'}}>
                <AppBar position="static">
                    <Toolbar style={{color: 'black', backgroundColor: '#ffcccc'}}>
                        <Typography variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{display: {xs: 'none', sm: 'block'}, color: 'darkred', fontWeight: 'bold'}}>
                            <Button onClick={goToHome} color="inherit"><LocalFloristIcon
                                fontSize="inherit"/>&nbsp;Masonry</Button>
                        </Typography>
                        <Box sx={{flexGrow: 1}}/>
                        <IconButton size="large" style={{color: 'darkred', fontWeight: 'bold'}} onClick={getNewToken}>
                            <VpnKeyIcon/>
                        </IconButton>
                        <IconButton size="large"
                                    style={{color: 'darkred', fontWeight: 'bold'}}
                                    onClick={increaseColumnsSize}>
                            <ZoomInIcon/>
                        </IconButton>
                        <IconButton size="large"
                                    style={{color: 'darkred', fontWeight: 'bold'}}
                                    onClick={decreaseColumnsSize}>
                            <ZoomOutIcon/>
                        </IconButton>
                        <IconButton size="large"
                                    style={{color: 'darkred', fontWeight: 'bold'}}
                                    onClick={goToAbout}>
                            <InfoIcon/>
                        </IconButton>
                        {/*<Button color="inherit" style={{color: 'darkred', fontWeight: 'bold'}}>Informazioni</Button>*/}
                        {/*<Button color="inherit" style={{color: 'darkred', fontWeight: 'bold'}}>Negozi</Button>*/}
                        {/*<Search>*/}
                        {/*    <SearchIconWrapper>*/}
                        {/*        <SearchIcon style={{color: 'darkred'}}/>*/}
                        {/*    </SearchIconWrapper>*/}
                        {/*    <StyledInputBase*/}
                        {/*        placeholder="Cerca..."*/}
                        {/*        inputProps={{'aria-label': 'Cerca qualcosa...'}}*/}
                        {/*    />*/}
                        {/*</Search>*/}
                        &nbsp;
                        {stateLogin ? <Button variant="contained" style={{backgroundColor: 'darkred'}}
                                              onClick={logout}>{'ESCI'}</Button>
                            : <Button variant="contained" style={{backgroundColor: 'darkred'}}
                                      onClick={login}>{'LOGIN'}</Button>}
                        &nbsp;&nbsp;
                        <Button variant="contained"
                                style={{backgroundColor: 'white', color: 'black'}}>REGISTRATI</Button>
                    </Toolbar>
                </AppBar>
                {/*{appContext.loading ? <Box sx={{width: '100%'}}>*/}
                {/*    <LinearProgress color={"secondary"}/>*/}
                {/*</Box> : null}*/}
            </Box>
        </>
    );
}
