import {makeStyles} from "@material-ui/core/styles";
import React, {Suspense} from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {IconButton, Input, useMediaQuery, useTheme} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {Item, Row} from "@mui-treasury/components/flex";
import Avatar from "@material-ui/core/Avatar";
import {Info, InfoSubtitle, InfoTitle} from "@mui-treasury/components/info";
import {useNewsInfoStyles} from "@mui-treasury/styles/info/news";
import {Col} from "react-bootstrap";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PanoramaIcon from "@mui/icons-material/Panorama";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {useCoverCardMediaStyles} from '@mui-treasury/styles/cardMedia/cover';
import {useArrowDarkButtonStyles} from '@mui-treasury/styles/button/arrowDark';
import cx from "clsx";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import DotIndicator from '@mui-treasury/components/indicator/dot';
import ParallaxSlide from '@mui-treasury/components/slide/parallax';
import image1 from './assets/example1.png';
import image2 from './assets/example2.jpg';
import image3 from './assets/example3.jpg';


const useStyles1 = makeStyles(() => ({
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
    const styles = useStyles1();
    const mediaStyles = useCoverCardMediaStyles();
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const largeScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const UserCarousel = React.lazy(() => import('./Carousel'));

    return (
        <Card className={styles.card}>
            <Box className={styles.main} minHeight={smallScreen ? 200 : mediumScreen ? 300 : largeScreen ? 400 : 500}
                 position={'relative'}>
                <CardMedia
                    classes={mediaStyles}
                    image={null}
                    children={<Suspense fallback={<></>}><UserCarousel items={props.carousel}/></Suspense>}/>
                <div className={styles.content}>
                    <Typography variant={'h2'} className="text-center" style={{color: 'white', fontWeight: 'bold'}}>
                        {props.title}
                        <IconButton color="inherit" size="large" onClick={props.openUpdateTitleDialog}>
                            <EditIcon fontSize="inherit"/>
                        </IconButton>
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
                    <InfoSubtitle>{props.telephone}<IconButton color="inherit" size="small"><EditIcon
                        fontSize="inherit"/></IconButton></InfoSubtitle>
                </Info>
            </Row>
            <Row className={styles.author}
                 m={0}
                 p={3}
                 pt={2}
                 gap={2}
                 bgcolor={'common.white'}>
                <Typography variant='subtitle1' className="text-center">
                    {props.description} <IconButton color="inherit" size="small" onClick={props.openUpdateDescriptionDialog}><EditIcon
                    fontSize="inherit"/></IconButton>
                </Typography>
            </Row>
            <Row
                className={styles.author}
                m={0}
                p={3}
                pt={2}
                gap={2}
                bgcolor={'common.white'}>
                <Col className='text-center' xl={4} >
                    <Button variant="contained" endIcon={<AddShoppingCartIcon/>} style={{backgroundColor: 'darkred'}}
                            onClick={props.openUploadProductDialog}>
                        Prodotto
                    </Button>
                </Col>
                &nbsp;
                <Col className='text-center' xl={4}>
                    <label htmlFor="carousel-uploader" className='text-center'>
                        {/*<Input accept="image/*" id="carousel-uploader" type="file" hidden*/}
                        {/*       onChange={props.updateCarousel}/>*/}
                        <Button variant="contained" component="span" endIcon={<PanoramaIcon/>}
                                style={{backgroundColor: 'darkred'}} onClick={props.openUpdateCarouselDialog}>
                            Copertina
                        </Button>
                    </label>
                </Col>
                &nbsp;
                <Col className='text-center' xl={4}>
                    <label htmlFor="avatar-uploader" className='text-center'>
                        <Input accept="image/*" id="avatar-uploader" type="file" hidden onChange={props.updateAvatar}/>
                        <Button variant="contained" component="span" endIcon={<AccountCircleIcon/>}
                                style={{backgroundColor: 'darkred'}}>
                            Avatar
                        </Button>
                    </label>
                </Col>
            </Row>
            <div className={styles.shadow}/>
            <div className={`${styles.shadow} ${styles.shadow2}`}/>
        </Card>);
});

export default UserCard;