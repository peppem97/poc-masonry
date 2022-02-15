import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {alpha, IconButton, InputBase, LinearProgress, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {Component} from "react";
import Button from "@mui/material/Button";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomIn';

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

class TopToolbar extends Component {
    render() {
        return (
            <Box sx={{flexGrow: 1}} style={{position: 'fixed', top: 0, zIndex: 100, width: '100%'}}>
                <AppBar position="static">
                    <Toolbar style={{color: 'black', backgroundColor: '#ffcccc'}}>
                        {/*<IconButton*/}
                        {/*    size="large"*/}
                        {/*    edge="start"*/}
                        {/*    color="inherit"*/}
                        {/*    aria-label="menu"*/}
                        {/*    sx={{ mr: 2 }}*/}
                        {/*>*/}
                        {/*    <MenuIcon />*/}
                        {/*</IconButton>*/}

                        {/*<Typography variant="h6"*/}
                        {/*            noWrap*/}
                        {/*            component="div"*/}
                        {/*            sx={{display: {xs: 'none', sm: 'block'}}}>*/}
                        {/*    POC-Masonry*/}
                        {/*</Typography>*/}
                        <Box sx={{flexGrow: 1}}/>
                        <IconButton size="large" style={{color: 'darkred', fontWeight: 'bold'}} onClick={this.props.increaseColumnsSize}>
                            <ZoomInIcon/>
                        </IconButton>
                        <IconButton size="large"  style={{color: 'darkred', fontWeight: 'bold'}} onClick={this.props.decreaseColumnsSize}>
                            <ZoomOutIcon/>
                        </IconButton>
                        <Button color="inherit" style={{color: 'darkred', fontWeight: 'bold'}}>Informazioni</Button>
                        <Button color="inherit" style={{color: 'darkred', fontWeight: 'bold'}}>Negozi</Button>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon style={{color: 'darkred'}}/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Cerca..."
                                inputProps={{'aria-label': 'Cerca qualcosa...'}}
                            />
                        </Search>
                        &nbsp;
                        <Button variant="contained" style={{backgroundColor: 'darkred'}}>ACCEDI</Button>
                        &nbsp;&nbsp;
                        <Button variant="contained" style={{backgroundColor: 'white', color: 'black'}}>REGISTRATI</Button>
                    </Toolbar>
                </AppBar>
                {this.props.loading ? <Box sx={{width: '100%'}}>
                    <LinearProgress color={"secondary"}/>
                </Box> : null}
            </Box>
        );
    }
}

export default TopToolbar;
