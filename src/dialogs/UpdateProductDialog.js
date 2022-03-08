import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from "@mui/material/Typography";
import {
    CardHeader,
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

export const UpdateProductDialog = React.memo(function PostCard(props) {
    const [pictures, setPictures] = useState([]);
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
        for (let picture of pictures) {
            appContext.setLoadingTrue();
            if (picture.image != null) {
                new Compressor(picture.rawImage, {
                    quality: appContext.qualityPictures, success(result) {
                        const formData = new FormData();
                        formData.append('files.picture' + picture.index, result, 'example.jpg');
                        formData.append('data', JSON.stringify({}));
                        axios.put(appContext.hostProducts + "/" + props.id, formData, {
                            headers: {'Authorization': 'Bearer ' + appContext.token,}
                        }).then((response) => {
                            appContext.setLoadingFalse();
                        }).catch((error) => {
                        })
                    }, error(err) {
                    }
                })
            } else {
                appContext.setLoadingTrue();
                let data = {};
                data['picture' + picture.index] = null;
                axios.put(appContext.hostProducts + "/" + props.id, data, {
                    headers: {'Authorization': 'Bearer ' + appContext.token,}
                }).then((response) => {
                    appContext.setLoadingFalse();
                }).catch((error) => {
                })
            }
        }
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

                                            <img src={element.image}
                                                 alt=""
                                                 loading="lazy"/>
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
