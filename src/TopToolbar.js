import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {LinearProgress} from "@mui/material";

export default function TopToolbar(props) {
    return (
        <Box sx={{ flexGrow: 1 }} style={{position: 'fixed', top: 0, zIndex: 100, width: '100%'}}>
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton*/}
                    {/*    size="large"*/}
                    {/*    edge="start"*/}
                    {/*    color="inherit"*/}
                    {/*    aria-label="menu"*/}
                    {/*    sx={{ mr: 2 }}*/}
                    {/*>*/}
                    {/*    <MenuIcon />*/}
                    {/*</IconButton>*/}

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        POC-Masonry
                    </Typography>

                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
            {props.loading ? <Box sx={{ width: '100%' }}>
                <LinearProgress color={"secondary"}/>
            </Box> : null}
        </Box>
    );
}
