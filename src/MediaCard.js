import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Component, useCallback} from "react";
import {Avatar, CardHeader, IconButton, Link} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {Redirect, useHistory, useNavigate} from 'react-router-dom';
import GoLink from "./goLink";

function MediaCard(props) {
    let navigate = useNavigate();

    function handleClick() {
        navigate("/prova");
    }

    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia component="img" height={props.item.height} image={props.item.image} alt="green iguana"/>
            <CardHeader
                avatar={<IconButton onClick={handleClick}><Avatar >R</Avatar></IconButton>}
                title="Utente"/>
            <CardActions className="justify-content-between">
                <IconButton>
                    <OpenInNewIcon/>
                </IconButton>
                <IconButton>
                    <FavoriteIcon/>
                </IconButton>
                <IconButton>
                    <ShareIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );

}

export default MediaCard;
