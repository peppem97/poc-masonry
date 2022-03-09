import DialogTitle from "@mui/material/DialogTitle";
import {
    Card,
    CardContent,
    CardHeader,
    DialogContent,
    IconButton,
    ImageList,
    ImageListItem,
    useTheme
} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@mui/material/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {Col, Container, Row} from "react-bootstrap";
import PictureCard from "./PictureCard";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import GlobalContext from "./GlobalContext";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import cx from 'clsx';
import GridSystem from "./GridSystem";

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
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            // backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
            boxShadow: '0px 14px 50px rgba(34, 35, 58, 0.8)',
            borderRadius: spacing(2), // 16
            // opacity: 0.5,
        },
    },
    content: {
        padding: 24,
    },
    cta: {
        marginTop: 24,
        textTransform: 'initial',
    },
}));

export default function Product(props) {
    const [pictures, setPictures] = useState([]);
    const [cover, setCover] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [username, setUsername] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [shop, setShop] = useState(null);
    const appContext = useContext(GlobalContext);
    const {id} = useParams();
    const MAX_PICTURES = 10;
    let navigate = useNavigate();
    const styles = useStyles();

    const goToUser = () => {
        navigate("/user/" + username);
    };

    const getProductInfo = () => {
        appContext.setLoadingTrue();
        axios.get(appContext.hostProducts + "?id=" + id, {
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
            setUsername(response.data[0].username);
            setPictures(initImageList(tmpPictures));
            setCover(appContext.host + response.data[0].cover.url);
            setTitle(response.data[0].title);
            setDescription(response.data[0].description);
            getUserInfo();
            console.log(pictures)
            appContext.setLoadingFalse();
        }).catch((error) => {
        })
    };

    const getUserInfo = () => {
        appContext.setLoadingTrue();
        axios.get(appContext.hostShops + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        }).then((response) => {
            setAvatar(appContext.host + response.data[0].avatar.url);
            setShop(response.data[0].title);

            appContext.setLoadingFalse();
        }).catch((error) => {
        })
    }

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
        return initPictures

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

    useEffect(() => {
        getProductInfo();
    }, [])

    return (
        <Container>
            <br/>
            <br/>
            <br/>
            <br/>
            <Row>
                <Card className={cx(styles.root)}>
                    <CardMedia
                        className={styles.media}
                        image={cover}
                    />
                    <CardContent>
                        <Container>
                            <Row>
                                <Typography gutterBottom variant="h5">
                                    {title}
                                </Typography>
                            </Row>
                            <Row>
                                <Typography variant="body2" color="text.secondary">
                                    {description}
                                    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt
                                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
                                    exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
                                    consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu
                                    fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa
                                    qui officia deserunt mollit anim id est laborum.
                                    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt
                                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
                                    exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
                                    consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu
                                    fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa
                                    qui officia deserunt mollit anim id est laborum.
                                </Typography>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <GridSystem isProducts={false} pictures={pictures}/>
                                </Col>
                            </Row>
                        </Container>
                    </CardContent>
                </Card>
            </Row>
        </Container>
    )
}