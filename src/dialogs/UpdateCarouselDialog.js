import {
    Container,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton, ImageList, ImageListItem, ImageListItemBar,
    Input,
} from "@mui/material";
import Button from "@mui/material/Button";
import {Row} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ProgressiveImg from "../ProgessiveImage";
import {initImageList} from "../Utility";
import GlobalContext from "../GlobalContext";
import PictureCard from "../PictureCard";
import Box from "@mui/material/Box";

export default function UpdateCarouselDialog(props) {
    const [pictures, setPictures] = useState([]);
    const appContext = useContext(GlobalContext);

    const closeDialog = () => {
        setPictures([]);
        props.onClose();
    };

    const addPicture = (e, i) => {
        let tmpPictures = [];
        for (let picture of pictures) {
            if (picture.index === i) {
                tmpPictures.push({
                    index: picture.index,
                    image: URL.createObjectURL(e.target.files[0]),
                    rawImage: e.target.files[0],
                    add: false
                });
            } else {
                tmpPictures.push(picture);
            }
        }
        setPictures(tmpPictures);
    };

    const removePicture = (i) => {
        let tmpPictures = [];

        for (let picture of pictures) {
            if (picture.index === i) {
                tmpPictures.push({index: picture.index, image: null, rawImage: null, add: true});
            } else {
                tmpPictures.push(picture);
            }
        }
        setPictures(tmpPictures);
    };

    const updateCarousel = () => {
        props.updateCarousel(pictures);
        closeDialog();
    };

    useEffect(() => {
        if (props.open) {
            setPictures(initImageList(props.carousel, appContext.MAX_PICTURES_CAROUSEL));
        }
    }, [props.open]);

    return (
        <Dialog open={props.open} onClose={closeDialog}>
            <DialogTitle>Modifica copertina</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Modifica le immagini da mostrare nella copertina.
                </DialogContentText>
                <br/>
                <Container>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2,
                        justifyContent: 'center'
                    }}>
                        {pictures.map((item) => {
                            if (item.add) {
                                return (
                                    <PictureCard
                                        key={item.index}
                                        height={250}
                                        width={180}
                                        edit={true}
                                        add={item.add}
                                        index={item.index}
                                        addPicture={addPicture}/>
                                )
                            } else {
                                return (
                                    <PictureCard
                                        key={item.index}
                                        edit={true}
                                        height={250}
                                        width={180}
                                        add={item.add}
                                        picture={item.image}
                                        removePicture={removePicture}/>
                                )
                            }
                        })}
                    </Box>
                    <br/>
                    <Row>
                        <Button onClick={updateCarousel} variant="contained" component="span"
                                style={{backgroundColor: 'darkred'}}>
                            Aggiorna immagini
                        </Button>
                    </Row>
                </Container>
            </DialogContent>
        </Dialog>
    )
}