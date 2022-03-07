import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from "@mui/material/Typography";
import {
    Backdrop,
    CardActions,
    CardContent,
    CardHeader, CircularProgress,
    DialogContent,
    IconButton, ImageList, ImageListItem, ImageListItemBar, Input,
    Skeleton,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {Row, Column, Item} from '@mui-treasury/components/flex';
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import cx from "clsx";
import FavoriteBorderRounded from '@material-ui/icons/FavoriteBorderRounded';
import Share from '@material-ui/icons/Share';
import {useSoftRiseShadowStyles} from '@mui-treasury/styles/shadow/softRise';
import {useSlopeCardMediaStyles} from '@mui-treasury/styles/cardMedia/slope';
import {useN01TextInfoContentStyles} from '@mui-treasury/styles/textInfoContent/n01';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import Button from "@mui/material/Button";
import {useBlogTextInfoContentStyles} from '@mui-treasury/styles/textInfoContent/blog';
import {useOverShadowStyles} from '@mui-treasury/styles/shadow/over';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import GlobalContext from "../GlobalContext";
import {useNavigate} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {red} from "@mui/material/colors";
import {useCoverCardMediaStyles} from '@mui-treasury/styles/cardMedia/cover';

import UserCarousel from "../Carousel";
import {Container} from "react-bootstrap";
import ProductCard from "../ProductCard";
import PictureCard from "../PictureCard";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Compressor from "compressorjs";
//*******************//
// const useBasicProfileStyles = makeStyles(({palette}) => ({
//     overline: {
//         fontSize: 10,
//         textTransform: 'uppercase',
//         letterSpacing: 1,
//         color: '#8D9CAD',
//     },
//     name: {
//         fontSize: 14,
//         fontWeight: 500,
//         color: '#495869',
//     },
// }));
// const useCardHeaderStyles = makeStyles(() => ({
//     root: {paddingBottom: 0},
//     title: {
//         fontSize: '1.25rem',
//         color: '#122740',
//     },
//     subheader: {
//         fontSize: '0.875rem',
//         color: '#495869',
//     },
// }));
// export default function ProductDialog(props) {
//     const {onClose, selectedValue, open} = props;
//     const fullScreen = useMediaQuery(useTheme().breakpoints.down('md'));
//     const gap = {xs: 1, sm: 1.5, lg: 2}
//     const descriptionStyle = useCardHeaderStyles();
//     const userInfoStyle = useBasicProfileStyles();
//
//     const closeDialog = (value) => {
//         onClose(value);
//     };
//
//     return (
//         <Dialog onClose={closeDialog} open={open} fullScreen={fullScreen} fullWidth={true} maxWidth={'lg'}>
//             <DialogContent>
//                 <Row p={{xs: 0.5, sm: 0.75, lg: 1}} gap={gap}>
//                     <Column>
//                         <Item grow>
//                             <Box minHeight={200} borderRadius={8}>
//                                 {/*<CardMedia*/}
//                                 {/*    image={props.picture} style={{borderRadius: '1rem'}}*/}
//                                 {/*/>*/}
//                                 <img src={props.picture} style={{borderRadius: '1rem', width: '100%', height: 'auto%'}}/>
//                             </Box>
//                         </Item>
//                     </Column>
//                     <Column>
//                         <Row className="justify-content-center">
//                             <Item position={'middle'}>
//                                 <Typography variant='h3' className="text-center">
//                                     <b>{props.title}</b>
//                                 </Typography>
//                                 <Typography variant='subtitle1' className={descriptionStyle.subheader}>
//                                     {props.description}
//                                 </Typography>
//                             </Item>
//                         </Row>
//                         <Row position={'bottom'}>
//                             <Item>
//                                 <IconButton>
//                                     <Avatar src={props.avatar}/>
//                                 </IconButton>
//                             </Item>
//                             <Item position={'middle'} pl={{sm: 0.5, lg: 0.5}}>
//                                 <Typography className={userInfoStyle.overline}>Pubblicato da:</Typography>
//                                 <Typography className={userInfoStyle.name}>{props.titleShop}</Typography>
//                             </Item>
//                         </Row>
//                     </Column>
//                 </Row>
//             </DialogContent>
//         </Dialog>
//     );
// }
//*******************//
// const useStyles = makeStyles(() => ({
//     root: {
//         maxWidth: 1000,
//         margin: 'auto',
//     },
//     content: {
//         padding: 24,
//     },
//     avatar: {
//         width: 50,
//         height: 50,
//         border: '2px solid #fff',
//         margin: '-76px 32px 0 auto',
//         '& > img': {
//             margin: 0,
//         },
//     },
// }));

export const ShowProductDialog = React.memo(function PostCard(props) {
    let navigate = useNavigate();
    const [pictures, setPictures] = useState([]);
    // const [loading, setLoading] = useState(false);
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
                    {props.showAvatar &&
                        <CardHeader
                            avatar={
                                <IconButton onClick={goToUser}>
                                    <Avatar src={props.avatar}/>
                                </IconButton>
                            }
                            sx={{maxHeight: '60px'}}
                            title={<Typography variant="h6">{props.shop}</Typography>}
                        />}
                    {!props.showAvatar &&
                        <CardHeader
                            title={<Typography variant="h6">Modifica prodotto</Typography>}
                        />}
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
                        {
                            !props.showAvatar && <IconButton color="inherit" size="small">
                                <EditIcon fontSize="inherit"/>
                            </IconButton>
                        }
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="text-center">
                        {props.description}
                        {
                            !props.showAvatar && <IconButton color="inherit" size="small">
                                <EditIcon fontSize="inherit"/>
                            </IconButton>
                        }
                    </Typography>
                    <br/>
                    {props.showAvatar && <Container>
                        <ImageList gap={50} cols={10}>
                            {pictures.map((element) => {
                                    if (!element.add) {
                                        return <ImageListItem cols={1} rows={1}>
                                            <PictureCard picture={element.image}/>
                                            {/*<img*/}
                                            {/*    src={element.image}*/}
                                            {/*    style={{objectFit: 'cover', height: '150px', width: '150px', borderRadius: '1rem', padding: '10px'}}*/}
                                            {/*    alt=""*/}
                                            {/*    loading="lazy"*/}
                                            {/*/>*/}
                                        </ImageListItem>
                                    } else {
                                        return null;
                                    }
                                }
                            )}

                        </ImageList>

                    </Container>}
                    {!props.showAvatar && <Container>
                        <ImageList gap={10} cols={10} rows={1} sx={{height: 220}}>
                            {pictures.map((element) => {
                                    if (element.add) {
                                        return (<ImageListItem key={element.index} cols={1} rows={1}>
                                            {/*<img src={null}*/}
                                            {/*     alt=""*/}
                                            {/*     loading="lazy"/>*/}

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
                                        return (<ImageListItem cols={1} rows={1}>
                                            {/*<PictureCard picture={element.image}/>*/}
                                            {/*<img*/}
                                            {/*    src={element.image}*/}
                                            {/*    style={{objectFit: 'cover', height: '150px', width: '150px', borderRadius: '1rem', padding: '10px'}}*/}
                                            {/*    alt=""*/}
                                            {/*    loading="lazy"*/}
                                            {/*/>*/}
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

                    </Container>}

                </DialogContent>
            </Dialog>
        </>
    );
});

export default ShowProductDialog;
