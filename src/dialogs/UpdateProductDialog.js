import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from "@mui/material/Typography";
import {
    Backdrop,
    CardHeader, CircularProgress,
    DialogContent,
    IconButton, ImageList, ImageListItem, ImageListItemBar, Input
} from "@mui/material";
import {Row} from '@mui-treasury/components/flex';
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@mui/material/Button";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import GlobalContext from "../GlobalContext";
import {useNavigate} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {Container} from "react-bootstrap";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Compressor from "compressorjs";
import ProgressiveImg from "../ProgessiveImage";
import spinner from "../assets/load.gif"

export const UpdateProductDialog = React.memo(function PostCard(props) {
    const [pictures, setPictures] = useState([]);
    const [loading, setLoading] = useState(false);
    const appContext = useContext(GlobalContext);
    const MAX_PICTURES = 10;

    const addPicture = (e, index) => {
        let picturesList = [];
        for (let picture of pictures) {
            if (picture.index === index) {
                picturesList.push({
                    index: picture.index,
                    image: URL.createObjectURL(e.target.files[0]),
                    rawImage: e.target.files[0],
                    add: false
                });
            } else {
                picturesList.push(picture);
            }
        }

        setPictures(picturesList);
    };

    const removePicture = (index) => {
        let tmpPictures = [];
        for (let picture of pictures) {
            if (picture.index === index) {
                tmpPictures.push({index: picture.index, image: null, rawImage: null, add: true});
            } else {
                tmpPictures.push(picture);
            }
        }
        setPictures(tmpPictures);
    };

    const updateProduct = () => {
        props.updateProduct(pictures);
        props.onClose();
    };

    const closeDialog = (value) => {
        props.onClose(value);
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
            // appContext.setLoadingTrue();
            // setLoading(true);
            axios.get(appContext.hostProducts + "?id=" + props.id, {
                headers: {'Authorization': 'Bearer ' + appContext.token}
            }).then((response) => {
                let tmpPictures = setPicturesList(
                    response.data[0].picture0,
                    response.data[0].picture1,
                    response.data[0].picture2,
                    response.data[0].picture3,
                    response.data[0].picture4,
                    response.data[0].picture5,
                    response.data[0].picture6,
                    response.data[0].picture7,
                    response.data[0].picture8,
                    response.data[0].picture9);
                initImageList(tmpPictures);
                // appContext.setLoadingFalse();
                // setLoading(false);
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
                        title={<Typography variant="h6">Modifica prodotto</Typography>}
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
                        <IconButton color="inherit" size="small">
                            <EditIcon fontSize="inherit"/>
                        </IconButton>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="text-center">
                        {props.description}
                        <IconButton color="inherit" size="small">
                            <EditIcon fontSize="inherit"/>
                        </IconButton>
                    </Typography>
                    <br/>
                    <Container>
                        <ImageList gap={10} cols={10} rows={1} sx={{height: 220}}>
                            {pictures.map((element) => {
                                    if (element.add) {
                                        return (<ImageListItem key={element.index} cols={1} rows={1}>
                                            <ImageListItemBar
                                                actionIcon={
                                                    [
                                                        <label htmlFor="icon-button-file" key={0}>
                                                            <Input accept="image/*" id="icon-button-file" type="file" hidden
                                                                   onChange={(e) => {
                                                                       addPicture(e, element.index)
                                                                   }}/>
                                                            <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                                                        aria-label="upload picture" component="span">
                                                                <PhotoCamera/>
                                                            </IconButton>
                                                        </label>]}
                                            />
                                        </ImageListItem>)
                                    } else {
                                        return (<ImageListItem key={element.index} cols={1} rows={1}>
                                            <ProgressiveImg image={element.image} />
                                            {/*<img src={element.image}*/}
                                            {/*     style={{filter: 'blur(5px)'}}*/}
                                            {/*     alt=""*/}
                                            {/*     loading="lazy"  onLoad={() => {console.log('ok')}}/>*/}



                                            <ImageListItemBar
                                                actionIcon={
                                                    [
                                                        <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}} key={0}>
                                                            <OpenInFullIcon/>
                                                        </IconButton>,
                                                        <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                                                    onClick={() => {
                                                                        removePicture(element.index)
                                                                    }} key={1}>
                                                            <DeleteForeverIcon/>
                                                        </IconButton>
                                                    ]}
                                            />
                                        </ImageListItem>)
                                    }
                                }
                            )}

                        </ImageList>
                        <br/>
                        <Row className="justify-content-center">
                            <Button onClick={updateProduct} variant="contained" component="span"
                                    style={{backgroundColor: 'darkred'}}>
                                Aggiorna prodotto
                            </Button>
                        </Row>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
});

export default UpdateProductDialog;
