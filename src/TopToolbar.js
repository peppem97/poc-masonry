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
import {setColumnWidth} from "./store/columnWidth";
import {clearToken} from "./store/token";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import {clearMail, clearType, clearUsername} from "./store/user";

export default function TopToolbar() {
    let navigate = useNavigate();
    const stateLogin = useSelector((state) => state.token.value);
    const columnWidth = useSelector((state) => state.columnWidth.value);
    const username = useSelector((state) => state.user.username);
    const firstAccess = useSelector((state) => state.user.firstAccess);
    const dispatch = useDispatch();
    const appContext = useContext(GlobalContext);

    const goToHome = () => {
        if (stateLogin) {
            navigate(appContext.routes.home);
        } else {
            navigate(appContext.routes.welcome);
        }
    };

    const goToProfile = () => {
        navigate(appContext.routes.user + '/' + username);
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
                        <IconButton onClick={goToHome} style={{color: 'darkred', fontWeight: 'bold'}}>
                            <HomeIcon/></IconButton>
                        <Box sx={{flexGrow: 1}}/>
                        {(stateLogin && !firstAccess) && <IconButton size="large"
                                     style={{color: 'darkred', fontWeight: 'bold'}}
                                     onClick={increaseColumnsSize}>
                            <ZoomInIcon/>
                        </IconButton>}
                        {(stateLogin && !firstAccess) && <IconButton size="large"
                                     style={{color: 'darkred', fontWeight: 'bold'}}
                                     onClick={decreaseColumnsSize}>
                            <ZoomOutIcon/>
                        </IconButton>}
                        {(stateLogin && !firstAccess) && <IconButton size="large"
                                     style={{color: 'darkred', fontWeight: 'bold'}}
                                     onClick={goToProfile}>
                            <AccountCircleIcon/>
                        </IconButton>}
                        &nbsp;
                        {stateLogin && <Button variant="contained" style={{backgroundColor: 'darkred'}}
                                              onClick={logout}>{'ESCI'}</Button>}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
