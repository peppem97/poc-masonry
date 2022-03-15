import {
    Container,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton, ImageList, ImageListItem, ImageListItemBar,
    Input, InputAdornment,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {Col, Row} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import GlobalContext from "../GlobalContext";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import EuroIcon from '@mui/icons-material/Euro';
import ProgressiveImg from "../ProgessiveImage";
import {initImageList} from "../Utility";

export default function UpdateProductDialog(props) {
    const [pictures, setPictures] = useState([]);
    const [cover, setCover] = useState({image: null, rawPicture: null});
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [pieces, setPieces] = useState('');
    const [description, setDescription] = useState('');
    const MAX_PICTURES = 9;
    const appContext = useContext(GlobalContext);

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

    const onChangePrice = (e) => {
        setPrice(e.target.value.replace(/[^0-9]/g, ''));
    };

    const onChangePieces = (e) => {
        setPieces(e.target.value)
    };

    const closeDialog = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setPieces('');
        setCover({image: null, rawPicture: null});
        setPictures([]);
        props.onClose();
    };

    const uploadUpdateProduct = () => {
        if (props.isUpload) {
            props.uploadProduct({
                pictures: pictures,
                title: title,
                description: description,
                cover: cover,
                price: price,
                pieces: pieces
            });
        } else if (props.isUpdate) {
            props.updateProduct({
                pictures: pictures,
                title: title,
                description: description,
                cover: cover,
                price: price,
                pieces: pieces
            });
        }
        closeDialog();
    };

    const canUpdate = () => {
        return (title && description && price && pieces && (cover.image));
    }

    const setPicturesList = (...pictures) => {
        let pictureList = [];
        for (let i = 0; i < pictures.length; i++) {
            if (pictures[i] != null) {
                pictureList.push({index: i, image: appContext.host + pictures[i].url, rawImage: null, add: false});
            }
        }
        return pictureList;
    };

    const getProductInfo = () => {
        axios.get(appContext.hostProducts + "?id=" + props.productToUpdate, {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        }).then((response) => {
            let tmpPictures = setPicturesList(
                response.data[0]?.picture0,
                response.data[0]?.picture1,
                response.data[0]?.picture2,
                response.data[0]?.picture3,
                response.data[0]?.picture4,
                response.data[0]?.picture5,
                response.data[0]?.picture6,
                response.data[0]?.picture7,
                response.data[0]?.picture8,
                response.data[0]?.picture9);
            setPictures(initImageList(tmpPictures, MAX_PICTURES));
            setCover({image: appContext.host + response.data[0].cover?.url, rawPicture: null});
            setTitle(response.data[0]?.title);
            setDescription(response.data[0]?.description);
            setPrice(response.data[0]?.price);
            setPieces(response.data[0]?.pieces);
        }).catch((error) => {
            appContext.setError('Si è verificato un errore nella ricezione delle informazioni del prodotto. Riprovare.');
        })
    }

    useEffect(() => {
        if (props.open) {
            setCover({image: null, rawPicture: null});
            setPictures(initImageList([], MAX_PICTURES));

            if (props.isUpdate) {
                getProductInfo();
            }
        }

    }, [props.open]);

    return (
        <Dialog open={props.open} onClose={closeDialog} fullWidth maxWidth={"lg"}>
            <DialogTitle>{props.isUpload ? 'Inserisci un nuovo prodotto' : 'Modifica prodotto'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.isUpload ? 'Riempi i campi per inserire un nuovo prodotto all\'interno della tua pagina.' :
                        'Riempi i campi per modifica il prodotto.'}
                </DialogContentText>
                <br/>
                <Container>
                    <Row className='justify-content-between'>
                        <Col sm={12} lg={6}>
                            {<TextField
                                fullWidth
                                value={title}
                                onChange={onChangeTitle}
                                required={true}
                                inputProps={{ maxLength: 12 }}
                                autoFocus
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><TextFieldsIcon/></InputAdornment>,
                                }}
                                color='secondary'
                                margin="dense"
                                label="Titolo"
                                variant="outlined"/>}
                        </Col>
                        <Col sm={12} lg={6}>
                            { <TextField
                                fullWidth
                                value={price}
                                onChange={onChangePrice}
                                pattern="[0-9]*"
                                type='number'
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><EuroIcon/></InputAdornment>,
                                }}
                                color='secondary'
                                margin="dense"
                                label="Prezzo"
                                variant="outlined"/>}
                        </Col>
                    </Row >
                    <br/>
                    <Row className='justify-content-between'>
                        <Col sm={12} lg={6}>
                            {<TextField
                                fullWidth
                                value={pieces}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><AutoAwesomeMotionIcon/></InputAdornment>,
                                }}
                                onChange={onChangePieces}
                                type='number'
                                color='secondary'
                                margin="dense"
                                label="Pezzi"
                                variant="outlined"/>}
                        </Col>
                        <Col sm={12} lg={6}>
                            {<TextField
                                fullWidth={true}
                                value={description}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><TextFieldsIcon/></InputAdornment>,
                                }}
                                onChange={onChangeDescription}
                                label="Descrizione"
                                inputProps={{ maxLength: 320 }}

                                multiline
                                color='secondary'
                                rows={4}
                            />}
                        </Col>
                    </Row>
                    <br/>
                    <Row className='justify-content-center'>
                        <ImageList rows={1} sx={{height: 220, width: 1200}}
                                   gap={5} cols={110}>
                            {
                                cover.image ? <ImageListItem cols={10} rows={1}>
                                        <ProgressiveImg image={cover.image} />

                                        <ImageListItemBar
                                            actionIcon={
                                                [
                                                    <IconButton
                                                        sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                                        key={0}
                                                        onClick={() => {
                                                            window.open(cover.image, '_blank', 'noopener,noreferrer')
                                                        }}>
                                                        <OpenInFullIcon/>
                                                    </IconButton>,
                                                    <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                                                onClick={() => {
                                                                    removeCover()
                                                                }}
                                                                key={1}>
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
                                                    <label htmlFor="icon-button-file" key={0}>
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
                                                                        key={1}
                                                                        aria-label="upload picture" component="span">
                                                                <PhotoCamera/>
                                                            </IconButton>
                                                        </label>]}
                                            />
                                        </ImageListItem>)
                                } else {
                                    return (<ImageListItem key={item.index} cols={10} rows={1}>
                                        <ProgressiveImg image={item.image} />

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
                        <Button
                            variant={"contained"}
                            disabled={!canUpdate()}
                            component="span"
                            style={{backgroundColor: canUpdate() ? 'darkred' : 'grey'}}
                                onClick={() => {
                                    uploadUpdateProduct();
                                }}>
                            {props.isUpload ? 'Inserisci' : 'Modifica'} prodotto
                        </Button>
                    </Row>
                </Container>
            </DialogContent>
        </Dialog>
    )
}