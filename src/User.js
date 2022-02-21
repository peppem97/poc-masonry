import React, {Component, useEffect, useState} from 'react';
import image from './assets/leone.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PanoramaIcon from '@mui/icons-material/Panorama';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Row, Item} from '@mui-treasury/components/flex';
import {Info, InfoSubtitle, InfoTitle} from '@mui-treasury/components/info';
import {useNewsInfoStyles} from '@mui-treasury/styles/info/news';
import {useCoverCardMediaStyles} from '@mui-treasury/styles/cardMedia/cover';
import {Col, Container} from "react-bootstrap";
import GridSystem from "./GridSystem";
import Button from "@mui/material/Button";
import axios from "axios";
import {IconButton, Input} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {useParams} from "react-router-dom";

const useStyles = makeStyles(() => ({
    card: {
        minWidth: 320,
        position: 'relative',
        boxShadow: '0 8px 24px 0 rgba(0,0,0,0.12)',
        overflow: 'visible',
        borderRadius: '1.5rem',
    },
    main: {
        overflow: 'hidden',
        borderTopLeftRadius: '1.5rem',
        borderTopRightRadius: '1.5rem',
        zIndex: 1,
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            display: 'block',
            width: '100%',
            height: '25%',
            background: 'linear-gradient(to top, #000000, rgba(0,0,0,0))',
        },
    },
    content: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 1,
        padding: '1.5rem 1.5rem 1rem',
    },
    avatar: {
        width: 48,
        height: 48,
    },
    author: {
        zIndex: 1,
        position: 'relative',
        borderBottomLeftRadius: '1.5rem',
        borderBottomRightRadius: '1.5rem',
        justifyContent: 'center'

    },
    shadow: {
        transition: '0.2s',
        position: 'absolute',
        zIndex: 0,
        width: '88%',
        height: '100%',
        bottom: 0,
        borderRadius: '1.5rem',
        backgroundColor: 'rgba(0,0,0,0.06)',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    shadow2: {
        bottom: 0,
        width: '72%',
        backgroundColor: 'rgba(0,0,0,0.04)',
    },
}));

const UserCard = React.memo(function News3Card(props) {
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    return (
        <Card className={styles.card}>
        <Box className={styles.main} minHeight={500} position={'relative'}>
            <CardMedia
                classes={mediaStyles}
                image={props.carousel}
            />
            <div className={styles.content}>
                <Typography variant={'h2'} className="text-center" style={{color: 'white', fontWeight: 'bold'}}>
                    {props.title} <IconButton color="inherit" size="large"><EditIcon fontSize="inherit" /></IconButton>
                </Typography>
            </div>
        </Box>
        <Row
            className={styles.author}
            m={0}
            p={3}
            pt={2}
            gap={2}
            bgcolor={'common.white'}>
            <Item>
                <Avatar
                    className={styles.avatar}
                    src={props.avatar}
                />
            </Item>
            <Info position={'middle'} useStyles={useNewsInfoStyles}>
                <InfoTitle style={{fontWeight: 'bold'}}>{props.website}</InfoTitle>
                <InfoSubtitle>{props.telephone}<IconButton color="inherit" size="small"><EditIcon fontSize="inherit" /></IconButton></InfoSubtitle>
            </Info>
        </Row>
        <Row className={styles.author}
             m={0}
             p={3}
             pt={2}
             gap={2}
             bgcolor={'common.white'}>
            <Typography variant='subtitle1' className="text-center">
                {props.description} <IconButton color="inherit" size="small"><EditIcon fontSize="inherit" /></IconButton>
            </Typography>
        </Row>
        <Row
            className={styles.author}
            m={0}
            p={3}
            pt={2}
            gap={2}
            bgcolor={'common.white'}>
            <Col className='text-center'>
                <Button variant="contained" endIcon={<AddShoppingCartIcon/>} style={{backgroundColor: 'grey'}}>
                    Nuovo prodotto
                </Button>
            </Col>
            <Col className='text-center'>
                <label htmlFor="carousel-uploader" className='text-center'>
                    <Input accept="image/*" id="carousel-uploader" type="file" hidden onChange={props.updateCarousel}/>
                    <Button variant="contained" component="span" endIcon={<PanoramaIcon/>}
                            style={{backgroundColor: 'darkred'}}>
                        Cambia Copertina
                    </Button>
                </label>
            </Col>
            <Col className='text-center'>
                <label htmlFor="avatar-uploader" className='text-center'>
                    <Input accept="image/*" id="avatar-uploader" type="file" hidden onChange={props.updateAvatar}/>
                    <Button variant="contained" component="span" endIcon={<AccountCircleIcon/>}
                            style={{backgroundColor: 'darkred'}}>
                        Cambia immagine profilo
                    </Button>
                </label>
            </Col>
        </Row>
        <div className={styles.shadow}/>
        <div className={`${styles.shadow} ${styles.shadow2}`}/>
    </Card>);
});

export default function User(props) {
    const [idShopStrapi, setIdShopStrapi] = useState(null)
    const [email, setEmail] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [carousel, setCarousel] = useState(null)
    const [website, setWebsite] = useState(null)
    const [telephone, setTelephone] = useState(null)
    const [items, setItems] = useState([])
    const {username} = useParams();

    const generateHeight = () => {
        return Math.floor((Math.random() * (380)) + 80);
    }

    const getUserInfo = () => {
        axios.get("http://zion.datafactor.it:40505/shops?username=" + username, {
            headers: {'Authorization': 'Bearer ' + props.token,}})
            .then((response) => {
                setIdShopStrapi(response.data[0].id)
                setEmail(response.data[0].email)
                setTitle(response.data[0].title)
                setDescription(response.data[0].description)
                setAvatar("http://zion.datafactor.it:40505" + response.data[0].avatar.url)
                setCarousel("http://zion.datafactor.it:40505" + response.data[0].carousel.url)
                setTelephone(response.data[0].telephone)
                setWebsite(response.data[0].website)
            }).catch((error) => {})
    }

    const getInitialItems = () => {
        axios.get("http://zion.datafactor.it:40505/products?username=" + username, {
            headers: {'Authorization': 'Bearer ' + props.token}
        }).then((response) => {
                let items = response.data.map((element) => ({
                    height: generateHeight(),
                    avatar: avatar,
                    title: element.title,
                    description: element.description,
                    picture: "http://zion.datafactor.it:40505" + element.picture.url,
                    titleShop: title,
                    emailShop: element.emailShop}))
            setItems(items)}).catch((error) => {})
    }

    const updateAvatar = (e) => {
        const formData = new FormData();
        formData.append('files.avatar', e.target.files[0], 'avatar.jpg');
        formData.append('data', JSON.stringify({}));
        axios.put("http://zion.datafactor.it:40505/shops/" + idShopStrapi, formData, {
            headers: {
                'Authorization': 'Bearer ' + props.token,
            }
        }).then((response) => {
                getUserInfo();
            }).catch((error) => {})
    }

    const updateCarousel = (e) => {
        const formData = new FormData();
        formData.append('files.carousel', e.target.files[0], 'example.jpg');
        formData.append('data', JSON.stringify({}));
        axios.put("http://zion.datafactor.it:40505/shops/" + idShopStrapi, formData, {
            headers: {'Authorization': 'Bearer ' + props.token,}
        }).then((response) => {
                getUserInfo();
            }).catch((error) => {})
    }

    // const getMultipleItems = () => {
    //     props.setLoading(true)
    //     const newItems = [];
    //     for (let i = 0; i < 5; i++) {
    //         newItems.push({
    //             height: generateHeight(),
    //             imageCard: image,
    //             imageAvatar: 'https://i.pravatar.cc/300',
    //             user: 'Utente... ',
    //             title: 'Titolo...',
    //             description: 'Descrizione...'
    //         });
    //     }
    //     setItems([...items, ...newItems]);
    //     setTimeout(() => {
    //         props.setLoading(false)
    //     }, 500)
    // }

    useEffect(() => {
        getUserInfo();
        getInitialItems();
    }, [])

    return (
        <>
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <UserCard
                    email={email}
                    title={title}
                    description={description}
                    avatar={avatar}
                    carousel={carousel}
                    website={website}
                    telephone={telephone}
                    updateAvatar={updateAvatar}
                    updateCarousel={updateCarousel}/>
                <br/>
                <br/>
                <br/>
                <Row className="justify-content-center">
                    <Typography variant="h3" gutterBottom component="div" className="text-center"
                                style={{color: 'darkred', fontWeight: 'bold'}}>
                        Tutti i prodotti:
                    </Typography>
                </Row>
            </Container>
            <Container fluid>
                <GridSystem items={items} columnWidth={props.columnWidth} isUser={true}/>
            </Container>
        </>
    )
}