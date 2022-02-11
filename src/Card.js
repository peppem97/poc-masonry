import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Component} from "react";

class MediaCard extends Component {
    render() {
        return (
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height={this.props.item.height}

                    image={this.props.item.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Esempio {this.props.index}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Condividi</Button>
                    <Button size="small">Info</Button>
                </CardActions>
            </Card>
        );
    }
}

export default MediaCard;
