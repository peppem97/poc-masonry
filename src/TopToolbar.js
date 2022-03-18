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
import {useContext, useState} from "react";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import InfoIcon from '@mui/icons-material/Info';
import {useDispatch, useSelector} from "react-redux";
import {isNotLogged} from "./store/login";
import LoginDialog from "./dialogs/LoginDialog";
import {setColumnWidth} from "./store/columnWidth";

export default function TopToolbar() {
    const [loginDialog, setLoginDialog] = useState(false);
    let navigate = useNavigate();
    const stateLogin = useSelector((state) => state.login.value);
    const columnWidth = useSelector((state) => state.columnWidth.value);
    const dispatch = useDispatch();
    const appContext = useContext(GlobalContext);


    const goToHome = () => {
        navigate(appContext.routes.home);
    };

    const goToAbout = () => {
        navigate(appContext.routes.about);
    }

    const login = () => {
        setLoginDialog(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch(isNotLogged());
    }

    const increaseColumnsSize = () => {
        if (columnWidth >= 500) {
            dispatch(setColumnWidth(columnWidth));
        } else {
            dispatch(setColumnWidth(columnWidth + 50));
        }
    };

    const decreaseColumnsSize = () => {
        if (columnWidth <= 250) {
            dispatch(setColumnWidth(columnWidth));
        } else {
            dispatch(setColumnWidth(columnWidth - 50));
        }
    };

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
                        &nbsp;
                        {stateLogin ? <Button variant="contained" style={{backgroundColor: 'darkred'}}
                                              onClick={logout}>{'ESCI'}</Button>
                            : <Button variant="contained" style={{backgroundColor: 'darkred'}}
                                      onClick={login}>{'LOGIN'}</Button>}
                        &nbsp;&nbsp;
                        {/*<Button variant="contained"*/}
                        {/*        style={{backgroundColor: 'white', color: 'black'}}>REGISTRATI</Button>*/}
                    </Toolbar>
                </AppBar>
                {/*{appContext.loading ? <Box sx={{width: '100%'}}>*/}
                {/*    <LinearProgress color={"secondary"}/>*/}
                {/*</Box> : null}*/}
            </Box>
            <LoginDialog
                open={loginDialog}
                goToHome={goToHome}
                onClose={() => {
                    setLoginDialog(false);
                }}/>
        </>
    );
}
