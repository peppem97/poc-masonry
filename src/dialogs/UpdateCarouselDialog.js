import {
    Card,
    CardMedia,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton, ImageList, ImageListItem, ImageListItemBar,
    Input,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {Col, Row} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import GlobalContext from "../GlobalContext";
import InfoIcon from '@mui/icons-material/Info';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AddIcon from '@mui/icons-material/Add';

export default function UpdateCarouselDialog(props) {
    const MAX_PICTURES = 3;
    const [pictures, setPictures] = useState([])
    const [initPictures, setInitPictures] = useState([])

    const closeDialog = () => {
        setPictures(initPictures)
        props.onClose();
    };

    const addPicture = (e, i) => {
        let tmpPictures = []
        for (let picture of pictures) {
            if (picture.index == i) {
                tmpPictures.push({index: picture.index, image: URL.createObjectURL(e.target.files[0]), rawImage: e.target.files[0], add: false})
            } else {
                tmpPictures.push(picture)
            }
        }

        setPictures(tmpPictures)
    }

    const removePicture = (i) => {
        let tmpPictures = []

        for (let picture of pictures) {
            if (picture.index == i) {
                tmpPictures.push({index: picture.index, image: null, rawImage: null, add: true})
            } else {
                tmpPictures.push(picture)
            }
        }
        setPictures(tmpPictures)
    }

    const updateCarousel = () => {
        props.updateCarousel(pictures)
        props.onClose()
    }

    useEffect(() => {
        let initPictures = []
        for (let i = 0; i < MAX_PICTURES; i++) {
            if (props.carousel[i] != undefined) {
                initPictures.push({index: i, image: props.carousel[i].image, rawImage: props.carousel[i].rawImage, add: false})
            } else {
                initPictures.push({index: i, image: null, rawImage: null, add: true})
            }
        }
        setInitPictures(initPictures)
        setPictures(initPictures)
    }, [props.carousel])

    return (
        <Dialog open={props.open} onClose={closeDialog}>
            <DialogTitle>Modifica copertina</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Modifica le immagini da mostrare nella copertina.
                </DialogContentText>
                <br/>
                <Container>
                    <ImageList sx={{width: 500, height: 250}}
                               gap={5} cols={30}>
                        {pictures.map((item) => {
                            if (item.add) {
                                return (<ImageListItem key={item.index} cols={10} rows={1}>
                                    {/*<img src={null}*/}
                                    {/*     alt=""*/}
                                    {/*     loading="lazy"/>*/}

                                    <ImageListItemBar
                                        actionIcon={
                                            [
                                                <label htmlFor="icon-button-file" key={0}>
                                                    <Input accept="image/*" id="icon-button-file" type="file" hidden onChange={(e) => {addPicture(e, item.index)}}/>
                                                    <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}} aria-label="upload picture" component="span">
                                                        <PhotoCamera />
                                                    </IconButton>
                                                </label>]}
                                    />
                                </ImageListItem>)
                            } else {
                                return (<ImageListItem key={item.index} cols={10} rows={1}>
                                    <img src={item.image}
                                         alt=""
                                         loading="lazy"/>
                                    <ImageListItemBar
                                        actionIcon={
                                            [
                                                <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}} key={0}>
                                                    <OpenInFullIcon/>
                                                </IconButton>,
                                                <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}} onClick={() => {removePicture(item.index)}} key={1}>
                                                    <DeleteForeverIcon/>
                                                </IconButton>
                                            ]}
                                    />
                                </ImageListItem>)

                            }
                        })}
                    </ImageList>
                    <br/>
                    <Row>
                        <Button onClick={updateCarousel} variant="contained" component="span" style={{backgroundColor: 'darkred'}}>
                            Aggiorna immagini
                        </Button>
                    </Row>
                </Container>
            </DialogContent>
        </Dialog>
    )
}