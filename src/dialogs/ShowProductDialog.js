import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from "@mui/material/Typography";
import {
    CardHeader,
    DialogContent,
    IconButton, ImageList, ImageListItem
} from "@mui/material";
import Avatar from '@material-ui/core/Avatar';
import CardMedia from "@material-ui/core/CardMedia";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import GlobalContext from "../GlobalContext";
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import PictureCard from "../PictureCard";

export const ShowProductDialog = React.memo(function PostCard(props) {
    let navigate = useNavigate();
    const [pictures, setPictures] = useState([]);
    const appContext = useContext(GlobalContext);
    const MAX_PICTURES = 10;

    const closeDialog = (value) => {
        props.onClose(value);
    };

    const goToUser = () => {
        navigate("/user/" + props.username);
    };

    const setPicturesList = (...pictures) => {
        let pictureList = [];
        for (let i = 0; i < pictures.length; i++) {
            if (pictures[i] != null) {
                pictureList.push({index: i, image: appContext.host + pictures[i].url, rawImage: null, add: false});
            }
        }
        return pictureList;
    };

    const getProductPictures = () => {
        if (props.open) {
            appContext.setLoadingTrue();
            axios.get(appContext.hostProducts + "?id=" + props.id, {
                headers: {'Authorization': 'Bearer ' + appContext.token}
            }).then((response) => {
                let tmpPictures = setPicturesList(
                    response.data[0].picture0,
                    response.data[0].picture1,
                    response.data[0].picture2,
                    response.data[0].picture3,
                    response.data[0].picture4)
                initImageList(tmpPictures);
                appContext.setLoadingFalse();
            }).catch((error) => {
            })
        }
    };

    const initImageList = (tmpPictures) => {
        let initPictures = []
        for (let i = 0; i < MAX_PICTURES; i++) {
            if (tmpPictures[i] != undefined) {
                initPictures.push({
                    index: i,
                    image: tmpPictures[i].image,
                    rawImage: tmpPictures[i].rawImage,
                    add: false
                })
            } else {
                initPictures.push({index: i, image: null, rawImage: null, add: true})
            }
        }
        // setInitPictures(initPictures)
        setPictures(initPictures)
    }

    useEffect(() => {
        getProductPictures();
    }, [props.open]);

    return (
        <>
            <Dialog open={props.open} onClose={closeDialog} fullWidth={true} maxWidth={"lg"}>
                <DialogTitle>
                    <CardHeader
                        avatar={
                            <IconButton onClick={goToUser}>
                                <Avatar src={props.avatar}/>
                            </IconButton>
                        }
                        sx={{maxHeight: '60px'}}
                        title={<Typography variant="h6">{props.shop}</Typography>}
                    />
                </DialogTitle>
                <DialogContent>
                    <CardMedia
                        height="350"
                        component="img"
                        image={props.picture}
                    />
                    <br/>
                    <Typography gutterBottom variant="h5" component="div" className="text-center">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="text-center">
                        {props.description}
                    </Typography>
                    <br/>
                    <Container>
                        <ImageList gap={50} cols={10} sx={{overflowX: 'auto', padding: '20px'}}>
                            {pictures.map((element) => {
                                    if (!element.add) {
                                        return <ImageListItem key={element.index} cols={1} rows={1}>
                                            <PictureCard picture={element.image}/>
                                        </ImageListItem>
                                    } else {
                                        return null;
                                    }
                                }
                            )}

                        </ImageList>

                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
});

export default ShowProductDialog;
