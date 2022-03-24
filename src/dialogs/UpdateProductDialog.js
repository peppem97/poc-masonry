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
import {useDispatch, useSelector} from "react-redux";
import {isError} from "../store/dialogs";
import PictureCard from "../PictureCard";
import Box from "@mui/material/Box";
import StackGrid, {easings, transitions} from "react-stack-grid";

export default function UpdateProductDialog(props) {
    const [pictures, setPictures] = useState([]);
    const [cover, setCover] = useState({image: null, rawPicture: null});
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [pieces, setPieces] = useState('');
    const [description, setDescription] = useState('');
    const appContext = useContext(GlobalContext);
    const token = useSelector((state) => state.token.value);
    const dispatch = useDispatch();


    const addCover = (e) => {
        console.log('cover')
        console.log(e)
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
        console.log(e, index)
        console.log('picture')
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
        console.log(index)
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
        setPieces(e.target.value.replace(/[^0-9]/g, ''));
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
    };

    const setPicturesList = (...pictures) => {
        let pictureList = [];
        for (let i = 0; i < pictures.length; i++) {
            if (pictures[i] != null) {
                pictureList.push({index: i, image: appContext.HOST + pictures[i].url, rawImage: null, add: false});
            }
        }
        return pictureList;
    };

    const getProductInfo = () => {
        axios.get(appContext.ENDPOINT_PRODUCTS + "?id=" + props.productToUpdate, {
            headers: {'Authorization': 'Bearer ' + token}
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
            setPictures(initImageList(tmpPictures, appContext.MAX_PICTURES_PRODUCT));
            setCover({image: appContext.HOST + response.data[0].cover?.url, rawPicture: null});
            setTitle(response.data[0]?.title);
            setDescription(response.data[0]?.description);
            setPrice(response.data[0]?.price);
            setPieces(response.data[0]?.pieces);
        }).catch(() => {
            dispatch(isError('Si è verificato un errore nella ricezione delle informazioni del prodotto. Riprovare.'));
        })
    };

    useEffect(() => {
        if (props.open) {
            setCover({image: null, rawPicture: null});
            setPictures(initImageList([], appContext.MAX_PICTURES_PRODUCT));

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
                                inputProps={{maxLength: 12}}
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
                            {<TextField
                                fullWidth
                                value={price}
                                onChange={onChangePrice}
                                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><EuroIcon/></InputAdornment>,
                                }}
                                color='secondary'
                                margin="dense"
                                label="Prezzo"
                                variant="outlined"/>}
                        </Col>
                    </Row>
                    <br/>
                    <Row className='justify-content-between'>
                        <Col sm={12} lg={6}>
                            {<TextField
                                fullWidth
                                value={pieces}
                                InputProps={{
                                    startAdornment: <InputAdornment
                                        position="start"><AutoAwesomeMotionIcon/></InputAdornment>,
                                }}
                                onChange={onChangePieces}
                                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
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
                                inputProps={{maxLength: 320}}
                                multiline
                                color='secondary'
                                rows={4}
                            />}
                        </Col>
                    </Row>
                    <br/>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2,
                        justifyContent: 'center'
                    }}>
                    {
                        cover.image ?
                            <PictureCard
                                height={200}
                                width={200}
                                edit={true}
                                add={false}
                                index={null}
                                picture={cover.image}
                                removePicture={removeCover}
                            /> :
                            <PictureCard
                                edit={true}
                                height={200}
                                width={200}
                                add={true}
                                index={null}
                                addPicture={addCover}
                            />

                    }
                    </Box>
                    <hr/>
                    <StackGrid duration={500}
                               columnWidth={200}
                               gutterWidth={30}
                               gutterHeight={30}
                               easing={easings.quartOut}
                               appear={transitions['fadeDown'].appear}
                               appeared={transitions['fadeDown'].appeared}
                               enter={transitions['fadeDown'].enter}
                               entered={transitions['fadeDown'].entered}
                               leaved={transitions['fadeDown'].leaved}
                               rtl={false}>

                        {pictures.map((item) => {
                            if (item.add) {
                                return (
                                    <PictureCard
                                        key={item.index}
                                        height={200}
                                        width={200}
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
                                        height={200}
                                        width={200}
                                        add={item.add}
                                        picture={item.image}
                                        index={item.index}
                                        removePicture={removePicture}/>
                                )
                            }
                        })}
                    {/*</Box>*/}
                    </StackGrid>
                    <br/>
                    {/*</Row>*/}
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