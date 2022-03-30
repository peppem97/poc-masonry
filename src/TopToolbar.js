import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import {useNavigate} from "react-router-dom";
import GlobalContext from "./GlobalContext";
import {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setColumnWidth} from "./store/columnWidth";
import {clearToken} from "./store/token";
import HomeIcon from '@mui/icons-material/Home';
import {clearMail, clearType, clearUsername} from "./store/user";
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';

export default function TopToolbar() {
    const navigate = useNavigate();
    const stateLogin = useSelector((state) => state.token.value);
    const columnWidth = useSelector((state) => state.columnWidth.value);
    const username = useSelector((state) => state.user.username);
    const firstAccess = useSelector((state) => state.user.firstAccess);
    const userType = useSelector((state) => state.user.type);

    const dispatch = useDispatch();
    const appContext = useContext(GlobalContext);

    const goToHome = () => {
        if (stateLogin) {
            navigate(appContext.routes.home);
        } else {
            navigate(appContext.routes.welcome);
        }
    };

    const goToShop = () => {
        navigate(appContext.routes.shop + '/' + username);
    };

    const goToClient = () => {
        navigate(appContext.routes.client + '/' + username);
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
                        {(stateLogin && !firstAccess) &&
                            <IconButton size="large"
                                        style={{color: 'darkred', fontWeight: 'bold'}}
                                        onClick={decreaseColumnsSize}>
                                <ZoomOutIcon/>
                            </IconButton>}
                        {
                            (stateLogin && !firstAccess && userType === 'cliente') &&
                            <IconButton size='large'
                                        style={{color: 'darkred', fontWeight: 'bold'}}
                                        onClick={goToClient}>
                                <PeopleIcon/>
                            </IconButton>
                        }
                        {(stateLogin && !firstAccess && userType === 'negozio') &&
                            <IconButton size="large"
                                        style={{color: 'darkred', fontWeight: 'bold'}}
                                        onClick={goToShop}>
                            <StoreIcon/>
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
