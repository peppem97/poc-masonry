import React, {Component} from 'react';
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
import {Input} from "@mui/material";

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

export const UserCard = React.memo(function News3Card(props) {
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    return (<Card className={styles.card}>
        <Box className={styles.main} minHeight={500} position={'relative'}>
            <CardMedia
                classes={mediaStyles}
                image={props.carousel}
            />
            <div className={styles.content}>
                <Typography variant={'h2'} className="text-center" style={{color: 'white', fontWeight: 'bold'}}>
                    {props.title}
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
                <InfoSubtitle>{props.telephone}</InfoSubtitle>
            </Info>
        </Row>
        <Row className={styles.author}
             m={0}
             p={3}
             pt={2}
             gap={2}
             bgcolor={'common.white'}>
            <Typography variant='subtitle1' className="text-center">
                {props.description}
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

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idShopStrapi: null,
            email: null,
            title: null,
            description: null,
            avatar: null,
            carousel: null,
            website: null,
            telephone: null,
            items: [],
        };
    }

    componentDidMount = () => {
        this.getUserInfo();
        // this.getInitialItems();
        // window.addEventListener('scroll', () => {
        //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        //         this.getMultipleItems();
        //     }
        // });
    }

    generateHeight = () => {
        return Math.floor((Math.random() * (380)) + 80);
    }

    getUserInfo = () => {
        axios.get("http://zion.datafactor.it:40505/shops?email=shop2@shop2.it", {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        })
            .then((response) => {
                this.setState({
                    idShopStrapi: response.data[0].id,
                    email: response.data[0].email,
                    title: response.data[0].title,
                    description: response.data[0].description,
                    avatar: "http://zion.datafactor.it:40505" + response.data[0].avatar.url,
                    carousel: "http://zion.datafactor.it:40505" + response.data[0].carousel.url,
                    telephone: response.data[0].telephone,
                    website: response.data[0].website
                })
            }).catch((error) => {
        })
    }

    updateAvatar = (e) => {
        const formData = new FormData();
        formData.append('files.avatar', e.target.files[0], 'avatar.jpg');
        formData.append('data', JSON.stringify({}));
        axios.put("http://zion.datafactor.it:40505/shops/" + this.state.idShopStrapi, formData, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        })
            .then((response) => {
                this.getUserInfo();
            }).catch((error) => {
        })
    }

    updateCarousel = (e) => {
        const formData = new FormData();
        formData.append('files.carousel', e.target.files[0], 'example.jpg');
        formData.append('data', JSON.stringify({}));
        axios.put("http://zion.datafactor.it:40505/shops/" + this.state.idShopStrapi, formData, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        })
            .then((response) => {
                this.getUserInfo();
            }).catch((error) => {
        })
    }

    getInitialItems = () => {
        let tmpItems = [];
        for (let i = 0; i < 30; i += 1) {
            tmpItems.push({
                height: this.generateHeight(),
                imageCard: image,
                imageAvatar: 'https://i.pravatar.cc/300',
                user: 'Utente... ',
                title: 'Titolo...',
                description: 'Descrizione...'
            });
        }
        this.setState({items: tmpItems})
    }

    getMultipleItems = () => {
        this.props.setLoading(true)
        const newItems = [];
        for (let i = 0; i < 5; i++) {
            newItems.push({
                height: this.generateHeight(),
                imageCard: image,
                imageAvatar: 'https://i.pravatar.cc/300',
                user: 'Utente... ',
                title: 'Titolo...',
                description: 'Descrizione...'
            });
        }
        this.setState({
            items: [...this.state.items, ...newItems],
        });
        setTimeout(() => {
            this.props.setLoading(false)
        }, 500)
    }

    render() {
        return (
            <>
                <Container>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <UserCard
                        email={this.state.email}
                        title={this.state.title}
                        description={this.state.description}
                        avatar={this.state.avatar}
                        carousel={this.state.carousel}
                        website={this.state.website}
                        telephone={this.state.telephone}
                        updateAvatar={this.updateAvatar.bind(this)}
                        updateCarousel={this.updateCarousel.bind(this)}/>
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
                    <GridSystem items={this.state.items} columnWidth={this.props.columnWidth} isUser={true}/>
                </Container>
            </>
        )
    }
}

export default User;