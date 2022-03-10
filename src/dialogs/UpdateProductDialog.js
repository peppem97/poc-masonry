import {
    Container,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton, ImageList, ImageListItem, ImageListItemBar,
    Input,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function UpdateProductDialog(props) {
    const [pictures, setPictures] = useState([]);
    const [cover, setCover] = useState({image: null, rawPicture: null});
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const MAX_PICTURES = 9;

    const addCover = (e) => {
        let tmpCover = {
            image: URL.createObjectURL(e.target.files[0]),
            rawPicture: e.target.files[0]
        }
        setCover(tmpCover);
    };

    const removeCover = () => {
        let tmpCover = {
            image: null,
            rawPicture: null
        }
        setCover(tmpCover);
    };

    const addPicture = (e, index) => {
        let picturesList = [];
        for (let picture of pictures) {
            if (picture.index === index) {
                picturesList.push({
                    index: picture.index,
                    image: URL.createObjectURL(e.target.files[0]),
                    rawPicture: e.target.files[0],
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
                tmpPictures.push({index: picture.index, image: null, rawPicture: null, add: true});
            } else {
                tmpPictures.push(picture);
            }
        }
        setPictures(tmpPictures);
    };

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    };

    const closeDialog = () => {
        props.onClose();
    };

    const uploadProduct = () => {
        props.uploadProduct({
            pictures: pictures,
            title: title,
            description: description,
            cover: cover
        });
        props.onClose();
    };

    const initImageList = () => {
        let initPictures = [];
        for (let i = 0; i < MAX_PICTURES; i++) {
            initPictures.push({index: i, image: null, rawPicture: null, add: true});
        }
        // setInitPictures(initPictures)
        setCover({image: null, rawPicture: null});
        setPictures(initPictures);
    };

    useEffect(() => {
        initImageList();
    }, [props.open]);

    return (
        <Dialog open={props.open} onClose={closeDialog} fullWidth maxWidth={"lg"}>
            <DialogTitle>Inserisci un nuovo prodotto</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Riempi i campi per inserire un nuovo prodotto all'interno della tua pagina.
                </DialogContentText>
                <br/>
                <Container>
                    <Row className='justify-content-center'>
                        <TextField
                            fullWidth
                            onChange={onChangeTitle}
                            autoFocus
                            color='secondary'
                            margin="dense"
                            label="Titolo prodotto"
                            variant="outlined"/>
                    </Row>
                    <br/>
                    <Row className='justify-content-center'>
                        <TextField
                            onChange={onChangeDescription}
                            label="Descrizione prodotto"
                            multiline
                            color='secondary'
                            rows={4}
                        />
                    </Row>
                    <br/>
                    <Row className='justify-content-center'>
                        <ImageList rows={1} sx={{height: 220, width: 1200}}
                                   gap={5} cols={110}>
                            {
                                cover.image ? <ImageListItem cols={10} rows={1}>
                                        <img src={cover.image}
                                             alt=""
                                             loading="lazy"/>
                                        <ImageListItemBar
                                            actionIcon={
                                                [
                                                    <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}} key={0} onClick={() => {
                                                        window.open(cover.image, '_blank', 'noopener,noreferrer')
                                                    }}>
                                                        <OpenInFullIcon/>
                                                    </IconButton>,
                                                    <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                                                onClick={() => {
                                                                    removeCover()
                                                                }} key={1}>
                                                        <DeleteForeverIcon/>
                                                    </IconButton>]}
                                        />
                                    </ImageListItem> :
                                    <ImageListItem cols={10} rows={1}>
                                        {/*<img src={item.image}*/}
                                        {/*     alt=""*/}
                                        {/*     loading="lazy"/>*/}
                                        <ImageListItemBar
                                            actionIcon={
                                                [
                                                    <label htmlFor="icon-button-file">
                                                        <Input accept="image/*" id="icon-button-file" type="file" hidden
                                                               onChange={(e) => {
                                                                   addCover(e)
                                                               }}/>
                                                        <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                                                    aria-label="upload picture" component="span">
                                                            <PhotoCamera/>
                                                        </IconButton>
                                                    </label>]}
                                        />
                                    </ImageListItem>
                            }
                            <div className="vr" style={{fontWeight: 'bold'}}/>
                            {pictures.map((item) => {
                                if (item.add) {
                                    return (
                                        <ImageListItem key={item.index} cols={10} rows={1}>
                                            {/*<img src={null}*/}
                                            {/*     alt=""*/}
                                            {/*     loading="lazy"/>*/}

                                            <ImageListItemBar
                                                actionIcon={
                                                    [
                                                        <label htmlFor="icon-button-file" key={0}>
                                                            <Input accept="image/*" id="icon-button-file" type="file"
                                                                   hidden onChange={(e) => {
                                                                addPicture(e, item.index)
                                                            }}/>
                                                            <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                                                        aria-label="upload picture" component="span">
                                                                <PhotoCamera/>
                                                            </IconButton>
                                                        </label>]}
                                            />
                                        </ImageListItem>)
                                } else {
                                    return (<ImageListItem key={item.index} cols={10} rows={1}>
                                        <img src={item.image}
                                             alt=""
                                             loading="lazy"/>
                                        {/*<LazyLoadImage*/}
                                        {/*    alt=""*/}
                                        {/*    src={item.image}/>*/}
                                        <ImageListItemBar
                                            actionIcon={
                                                [
                                                    <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}} key={0}
                                                                onClick={() => {
                                                                    window.open(item.image, '_blank', 'noopener,noreferrer')
                                                                }}>
                                                        <OpenInFullIcon/>
                                                    </IconButton>,
                                                    <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}} key={1}
                                                                onClick={() => {
                                                                    removePicture(item.index)
                                                                }}>
                                                        <DeleteForeverIcon/>
                                                    </IconButton>
                                                ]}
                                        />
                                    </ImageListItem>)
                                }
                            })}
                        </ImageList>
                    </Row>
                    <Row>
                        <Button variant={"contained"} component="span" style={{backgroundColor: 'darkred'}}
                                onClick={() => {
                                    uploadProduct()
                                }}>
                            Inserisci prodotto
                        </Button>
                    </Row>
                </Container>
            </DialogContent>
        </Dialog>
    )
}