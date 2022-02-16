import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import {Avatar, CardHeader, IconButton} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {useNavigate} from 'react-router-dom';

function MediaCard(props) {
    let navigate = useNavigate();

    function goToUser() {
        navigate("/user/" + props.index, {id: 123});
    }

    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia component="img" height={props.item.height} image={props.item.imageCard} alt="green iguana"/>
            <CardHeader
                avatar={<IconButton onClick={goToUser}><Avatar src={props.item.imageAvatar}>R</Avatar></IconButton>}
                title={"Utente " + props.index}/>
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
