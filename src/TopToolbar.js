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

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function TopToolbar() {
    let navigate = useNavigate();
    const appContext = useContext(GlobalContext);

    const goToHome = () => {
        navigate("/home");
    };

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

    // const increaseColumnsSize = () => {
    //     appContext.increaseColumnsSize();
    // }
    //
    // const decreaseColumnsSize = () => {
    //     appContext.decreaseColumnsSize();
    // }

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
                        <Button variant="contained" style={{backgroundColor: 'darkred'}}>ACCEDI</Button>
                        &nbsp;&nbsp;
                        <Button variant="contained" style={{backgroundColor: 'white', color: 'black'}}>REGISTRATI</Button>
                    </Toolbar>
                </AppBar>
                {/*{appContext.loading ? <Box sx={{width: '100%'}}>*/}
                {/*    <LinearProgress color={"secondary"}/>*/}
                {/*</Box> : null}*/}
            </Box>
        </>
    );
}
