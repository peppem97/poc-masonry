import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Component} from "react";
import {IconButton} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

class MediaCard extends Component {
    render() {
        return (
            <Card sx={{maxWidth: 345}}>
                <CardMedia
                    component="img"
                    height={this.props.item.height}
                    image={this.props.item.image}
                    style={{boxShadow: "inset 10px 10px 50px #fff"}}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom
                                variant="h5"
                                className="text-center"
                                fontWeight="bold">
                        Esempio {this.props.index}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        className="text-center">
                        Breve descrizione dell'esempio {this.props.index}.
                    </Typography>
                </CardContent>
                <CardActions
                    className="justify-content-between">
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
}

export default MediaCard;
