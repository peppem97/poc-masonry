import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import Typography from "@mui/material/Typography";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import {useNavigate} from "react-router-dom";
import GlobalContext from "./GlobalContext";
import {useContext, useState} from "react";
import InfoIcon from '@mui/icons-material/Info';
import {useDispatch, useSelector} from "react-redux";
import LoginDialog from "./dialogs/LoginDialog";
import {setColumnWidth} from "./store/columnWidth";
import {clearToken} from "./store/token";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import {clearMail, clearType, clearUsername} from "./store/user";

export default function TopToolbar() {
    const [loginDialog, setLoginDialog] = useState(false);
    let navigate = useNavigate();
    const stateLogin = useSelector((state) => state.token.value);
    const columnWidth = useSelector((state) => state.columnWidth.value);
    const username = useSelector((state) => state.user.username);
    const dispatch = useDispatch();
    const appContext = useContext(GlobalContext);

    const goToHome = () => {
        navigate(appContext.routes.home);
    };

    const goToAbout = () => {
        navigate(appContext.routes.signin);
    }

    const goToProfile = () => {
        navigate(appContext.routes.user + '/' + username);
    };

    const goToSignup = () => {
        navigate(appContext.routes.signup);
    };

    const login = () => {
        setLoginDialog(true);
    };

    const logout = () => {
        dispatch(clearToken());
        dispatch(clearType());
        dispatch(clearMail());
        dispatch(clearUsername());
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
                        {stateLogin ? <IconButton onClick={goToHome} style={{color: 'darkred', fontWeight: 'bold'}}>
                            <HomeIcon/></IconButton> : null}
                        <Box sx={{flexGrow: 1}}/>
                        {stateLogin ? <IconButton size="large"
                                     style={{color: 'darkred', fontWeight: 'bold'}}
                                     onClick={increaseColumnsSize}>
                            <ZoomInIcon/>
                        </IconButton> : null}
                        {stateLogin ? <IconButton size="large"
                                     style={{color: 'darkred', fontWeight: 'bold'}}
                                     onClick={decreaseColumnsSize}>
                            <ZoomOutIcon/>
                        </IconButton> : null}
                        <IconButton size="large"
                                    style={{color: 'darkred', fontWeight: 'bold'}}
                                    onClick={goToAbout}>
                            <InfoIcon/>
                        </IconButton>
                        {stateLogin ? <IconButton size="large"
                                     style={{color: 'darkred', fontWeight: 'bold'}}
                                     onClick={goToProfile}>
                            <AccountCircleIcon/>
                        </IconButton> : null}
                        &nbsp;
                        {stateLogin ? <Button variant="contained" style={{backgroundColor: 'darkred'}}
                                              onClick={logout}>{'ESCI'}</Button>
                            : <Button variant="contained" style={{backgroundColor: 'darkred'}}
                                      onClick={login}>{'LOGIN'}</Button>}
                        &nbsp;&nbsp;
                        {stateLogin ? null
                            : <Button variant="contained" style={{backgroundColor: 'white', color: 'black'}}
                                      onClick={goToSignup}>{'REGISTRATI'}</Button>}
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
