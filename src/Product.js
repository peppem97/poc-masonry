import DialogTitle from "@mui/material/DialogTitle";
import {Card, CardContent, CardHeader, DialogContent, IconButton, ImageList, ImageListItem} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@mui/material/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {Container} from "react-bootstrap";
import PictureCard from "./PictureCard";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import GlobalContext from "./GlobalContext";
import axios from "axios";

export default function Product(props) {
    let navigate = useNavigate();
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

    //OK
    const goToUser = () => {
        navigate("/user/" + username);
    };

    //OK
    const getProductInfo = () => {
        appContext.setLoadingTrue();
        axios.get(appContext.hostProducts + "?id=" + id, {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        }).then((response) => {
            console.log(response)
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
            appContext.setLoadingFalse();
        }).catch((error) => {
        })
    };

    //TODO
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

    //OK
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

    //OK
    const setPicturesList = (...pictures) => {
        let pictureList = [];
        for (let i = 0; i < pictures.length; i++) {
            if (pictures[i] != null) {
                pictureList.push({index: i, image: appContext.host + pictures[i].url, rawImage: null, add: false});
            }
        }
        return pictureList;
    };

    useEffect(() =>  {
        getProductInfo();
    }, [])

    return (
        // <>
        //     <br/>
        //     <br/>
        //     <br/>
        //     <br/>
        //     <Typography variant='h1'>PRODOTTO ID: {id}</Typography>
        // </>
        <Card>
                <CardHeader
                    avatar={
                        <IconButton onClick={goToUser}>
                            <Avatar src={avatar}/>
                        </IconButton>
                    }
                    sx={{maxHeight: '60px'}}
                    title={<Typography variant="h6">{shop}</Typography>}
                />
            <CardContent>
                <CardMedia
                    height="350"
                    component="img"
                    image={cover}
                />
                <br/>
                <Typography gutterBottom variant="h5" component="div" className="text-center">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="text-center">
                    {description}
                </Typography>
                <br/>
                <Container>
                    <ImageList gap={50} cols={10} sx={{overflowX: 'auto', padding: '20px'}}>
                        {pictures.map((element) => {
                                if (!element.add) {
                                    return <ImageListItem key={element.index} cols={1} rows={1}>
                                        <PictureCard picture={element.image}/>
                                    </ImageListItem>
                                } else {
                                    return null;
                                }
                            }
                        )}

                    </ImageList>

                </Container>
            </CardContent>
        </Card>
    )
}