import {
    Card,
    CardContent, IconButton
} from "@mui/material";
import Typography from "@mui/material/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {Col, Container, Row} from "react-bootstrap";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import GlobalContext from "./GlobalContext";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import cx from 'clsx';
import GridSystem from "./GridSystem";
import Avatar from "@material-ui/core/Avatar";
import {initImageList} from "./Utility";
import {useDispatch, useSelector} from "react-redux";
import {setBusy, setIdle} from "./store/loading";
import {isError} from "./store/dialogs";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FavoriteIcon from "@mui/icons-material/Favorite";
import {setFavorites} from "./store/user";
import FavoritesDialog from "./dialogs/FavoritesDialog";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const useStyles = makeStyles(({breakpoints, spacing}) => ({
    root: {
        margin: 'auto',
        borderRadius: spacing(2), // 16px
        transition: '0.3s',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        position: 'relative',
        // maxWidth: 500,
        marginLeft: 'auto',
        overflow: 'initial',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: spacing(2),
        [breakpoints.up('md')]: {
            flexDirection: 'row',
            paddingTop: spacing(2),
        },
    },
    media: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: spacing(-3),
        height: 0,
        paddingBottom: '60%',
        borderRadius: spacing(2),
        backgroundColor: '#fff',
        boxShadow: '0px 14px 30px rgba(34, 35, 58, 0.8)',
        position: 'relative',
        [breakpoints.up('md')]: {
            width: '100%',
            marginLeft: spacing(-3),
            marginTop: 0,
            transform: 'translateX(-8px)',
        },
        '&:after': {
            content: '" "',
            position: 'absolute',
            // top: 0,
            // left: 0,
            bottom: 0,
            width: '100%',
            height: '20%',
            background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
            borderRadius: spacing(2), // 16
            // opacity: 0.5,
        },
    },
    content: {
        width: '100%',
        padding: 24,
    },
    cta: {
        marginTop: 24,
        textTransform: 'initial',
    },
}));

const useAvatarShadow = makeStyles(theme => ({
    avatar: {
        boxShadow: theme.shadows[10],
    }
}));

export default function Product() {
    const avatarShadow = useAvatarShadow();
    const styles = useStyles();

    const [pictures, setPictures] = useState([]);
    const [cover, setCover] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [username, setUsername] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [shop, setShop] = useState(null);
    const [price, setPrice] = useState(null);
    const [pieces, setPieces] = useState(null);
    const [favorite, setFavorite] = useState(false);
    const [favoritesOfProduct, setFavoritesOfProduct] = useState([]);
    const [favoritesDialog, setFavoritesDialog] = useState(false);
    const appContext = useContext(GlobalContext);
    const token = useSelector((state) => state.token.value);
    const favoritesOfUser = useSelector((state) => state.user.favorites);
    const myUsername = useSelector((state) => state.user.username);
    const userType = useSelector((state) => state.user.type);
    const idUser = useSelector((state) => state.user.id);
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();

    const goToShop = () => {
        navigate(appContext.routes.shop + "/" + username);
    };

    const getProductInfo = () => {
        dispatch(setBusy());
        axios.get(appContext.ENDPOINT_PRODUCTS + "?id=" + id, {
            headers: {'Authorization': 'Bearer ' + token}
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
            setUsername(response.data[0]?.username);
            setPictures(initImageList(tmpPictures, appContext.MAX_PICTURES_PRODUCT));
            setCover(appContext.HOST + response.data[0]?.cover?.url);
            setTitle(response.data[0]?.title);
            setPrice(response.data[0]?.price);
            setPieces(response.data[0]?.pieces);
            setDescription(response.data[0]?.description);
            //TODO: fare in modo che si prendano sia avatar che username
            setFavoritesOfProduct(response.data[0]?.favorites);
            dispatch(setIdle());
        }).catch(() => {
            dispatch(setIdle());
            dispatch(isError('Si è verificato un errore nella ricezione delle informazioni del prodotto. Riprovare ad aggiornare la pagina.'));
        })
    };

    const getShopInfo = () => {
        dispatch(setBusy());
        axios.get(appContext.ENDPOINT_SHOPS + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            setAvatar(appContext.HOST + response.data[0]?.avatar?.url);
            setShop(response.data[0]?.title);
            dispatch(setIdle());
        }).catch(() => {
            dispatch(setIdle());
            dispatch(isError('Si è verificato un errore nella ricezione delle informazioni dell\'utente. Riprovare ad aggiornare la pagina.'));
        })
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

    const toggleFavorite = () => {
        let tmpFavoritesOfUser;
        let tmpFavoritesOfProduct;
        if (favorite) {
            tmpFavoritesOfUser = favoritesOfUser.filter((element) => (element !== id));
            tmpFavoritesOfProduct = favoritesOfProduct.filter((element) => (element !== myUsername));

        } else {
            tmpFavoritesOfUser = JSON.parse(JSON.stringify(favoritesOfUser));
            tmpFavoritesOfUser.push(id);

            tmpFavoritesOfProduct = JSON.parse(JSON.stringify(favoritesOfProduct));
            tmpFavoritesOfProduct.push(myUsername);
        }
        let dataUser = {
            favorites: tmpFavoritesOfUser
        };
        let dataProduct = {
            favorites: tmpFavoritesOfProduct
        };
        axios.put((userType === 'negozio' ? appContext.ENDPOINT_SHOPS : appContext.ENDPOINT_CLIENTS) + "/" + idUser, dataUser ,{
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            dispatch(setFavorites(response.data.favorites));
            checkFavorites(response.data.favorites);
        });
        axios.put(appContext.ENDPOINT_PRODUCTS + "/" + id, dataProduct, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then(() => {
            setFavoritesOfProduct(tmpFavoritesOfProduct);
        });
    };

    const checkFavorites = (favorites) => {
        setFavorite(favorites.includes(id));
    };

    useEffect(() => {
        getProductInfo();
    }, []);

    useEffect(() => {
        getShopInfo();
    }, [username]);

    useEffect(() => {
        checkFavorites(favoritesOfUser);
    }, [id]);

    return (
        <>
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Card className={cx(styles.root)}>
                        <CardMedia
                            className={styles.media}
                            image={cover ?? ''}
                        />
                        <CardContent className={styles.content}>
                            <Container>
                                <Row className='row-cols-auto '>
                                    <Col>
                                        <IconButton onClick={goToShop}>
                                            <Avatar
                                                src={avatar ?? null}
                                                className={avatarShadow.avatar}
                                                style={{width: '50px', height: '50px'}}/>
                                        </IconButton>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Typography variant='subtitle2' color="text.secondary">Pubblicato
                                                da: </Typography>
                                            <Typography variant='subtitle2'
                                                        color={'text.primary'}>{shop}</Typography>
                                        </Row>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Typography gutterBottom variant="h3">
                                        {title}
                                    </Typography>
                                </Row>
                                <Row>
                                    <Typography variant="body2" color="text.secondary">
                                        {description}
                                    </Typography>
                                </Row>
                                <br/>
                                {(price && pieces) &&
                                    <Row className='row-cols-auto'>
                                        <Col>
                                            <Typography variant='subtitle2' color="text.secondary">Prezzo: </Typography>
                                            <Typography variant='h6'
                                                        sx={{display: 'inline'}}>{'€ ' + price ?? ' N.D.'}</Typography>
                                        </Col>
                                        <Col>
                                            <Typography variant='subtitle2' color="text.secondary">Pezzi: </Typography>
                                            <Typography variant='h6'
                                                        sx={{display: 'inline'}}>{pieces ?? ' N.D.'}</Typography>
                                        </Col>
                                        <Col>
                                            {
                                                favorite ?
                                                    <IconButton style={{color: 'red', fontWeight: 'bold'}}
                                                                onClick={toggleFavorite} >
                                                        <FavoriteIcon/>&nbsp;
                                                        <Typography variant='h5'>{favoritesOfProduct.length}</Typography>

                                                    </IconButton> :
                                                    <IconButton onClick={toggleFavorite}>
                                                        <FavoriteBorderIcon/>
                                                    </IconButton>
                                            }
                                        </Col>
                                        <Col>
                                            <IconButton onClick={() => setFavoritesDialog(true)}>
                                                <PeopleOutlineIcon/>
                                            </IconButton>
                                        </Col>
                                        {/*<Col>*/}
                                        {/*    <AvatarGroup max={4} onClick={() => setFavoritesDialog(true)}>*/}
                                        {/*        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />*/}
                                        {/*        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />*/}
                                        {/*        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />*/}
                                        {/*        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />*/}
                                        {/*        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />*/}
                                        {/*    </AvatarGroup>*/}
                                        {/*</Col>*/}
                                    </Row>}
                                <br/>
                                <Row>
                                    <Col style={{width: '100%'}}>
                                        <GridSystem isProducts={false} pictures={pictures} columnWidth={150}/>
                                    </Col>
                                </Row>
                            </Container>
                        </CardContent>
                    </Card>
                </Row>
                <br/>
                <br/>
                <FavoritesDialog
                    open={favoritesDialog}
                    users={favoritesOfProduct}
                    onClose={() => setFavoritesDialog(false)}/>

            </Container>
        </>
    );
}