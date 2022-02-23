import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {IconButton, Input} from "@mui/material";
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
import { useArrowDarkButtonStyles } from '@mui-treasury/styles/button/arrowDark';
import cx from "clsx";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import DotIndicator from '@mui-treasury/components/indicator/dot';
import ParallaxSlide from '@mui-treasury/components/slide/parallax';
import image from './assets/example.png';

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

const useStyles2 = makeStyles(({ palette, breakpoints, spacing }) => ({
    root: {
        // a must if you want to set arrows, indicator as absolute
        // position: 'relative',
        width: '100%',
    },
    // slide: {
    //     perspective: 1000, // create perspective
    //     overflow: 'hidden',
    //     // relative is a must if you want to create overlapping layers in children
    //     position: 'relative',
    //     paddingTop: spacing(8),
    //     [breakpoints.up('sm')]: {
    //         paddingTop: spacing(10),
    //     },
    //     [breakpoints.up('md')]: {
    //         paddingTop: spacing(14),
    //     },
    // },
    // imageContainer: {
    //     display: 'block',
    //     position: 'relative',
    //     zIndex: 2,
    //     // paddingBottom: '40%',
    // },
    image: {
        // display: 'block',
        // position: 'absolute',
        zIndex: 10,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        // marginLeft: '12%',
        // [breakpoints.up('sm')]: {
        //     marginLeft: '4%',
        // },
    },
    arrow: {
        // display: 'none',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [breakpoints.up('sm')]: {
            display: 'inline-flex',
        },
    },
    arrowLeft: {
        left: 0,
        // [breakpoints.up('lg')]: {
        //     left: -100,
        // },
    },
    arrowRight: {
        right: 0,
        // [breakpoints.up('lg')]: {
        //     right: -100,
        // },
    },
    // text: {
    //     // shared style for text-top and text-bottom
    //     fontFamily: 'Poppins, san-serif',
    //     fontWeight: 900,
    //     position: 'absolute',
    //     color: palette.common.white,
    //     padding: '0 8px',
    //     transform: 'rotateY(45deg)',
    //     lineHeight: 1.2,
    //     [breakpoints.up('sm')]: {
    //         padding: '0 16px',
    //     },
    //     [breakpoints.up('md')]: {
    //         padding: '0 24px',
    //     },
    // },
    // title: {
    //     top: 20,
    //     left: '20%',
    //     height: '40%',
    //     fontSize: 40,
    //     zIndex: 1,
    //     background: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, #9c9c9c 100%)',
    //     [breakpoints.up('sm')]: {
    //         top: 40,
    //         fontSize: 72,
    //     },
    //     [breakpoints.up('md')]: {
    //         top: 52,
    //         fontSize: 72,
    //     },
    // },
    // subtitle: {
    //     top: 60,
    //     left: '0%',
    //     height: '52%',
    //     fontSize: 56,
    //     zIndex: 2,
    //     background: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, #888888 100%)',
    //     [breakpoints.up('sm')]: {
    //         top: 112,
    //         left: '6%',
    //         fontSize: 96,
    //     },
    //     [breakpoints.up('md')]: {
    //         top: 128,
    //         fontSize: 104,
    //     },
    // },
    indicatorContainer: {
        textAlign: 'center',
    },
}));

const data = [
    {
        id: 1,
        title: 'Huarache',
        subtitle: 'Gripp',
        image: image
    },
    {
        id: 2,
        title: 'Air Max',
        subtitle: '270 P',
        image: image
    },
    {
        id: 3,
        title: 'Air Max',
        subtitle: 'Deluxe',
        image: image
    },
];

const ParallaxCarousel = () => {
    const classes = useStyles2();
    const arrowStyles = useArrowDarkButtonStyles();
    const createStyle = (slideIndex, fineIndex) => {
        const diff = slideIndex - fineIndex;
        if (Math.abs(diff) > 1) return {};
        return {
            transform: `rotateY(${(-diff + 1) * 45}deg)`,
        };
    };
    const renderElements = ({ index, onChangeIndex }) => (
        <>
            <Button
                className={cx(classes.arrow, classes.arrowLeft)}
                classes={arrowStyles}
                disabled={index === 0}
                onClick={() => onChangeIndex(index - 1)}>
                <KeyboardArrowLeft />
            </Button>
            <Button
                className={cx(classes.arrow, classes.arrowRight)}
                classes={arrowStyles}
                disabled={index === data.length - 1}
                onClick={() => onChangeIndex(index + 1)}
            >
                <KeyboardArrowRight />
            </Button>
            {/*<div className={classes.indicatorContainer}>*/}
            {/*    {data.map(({ id }, i) => (*/}
            {/*        <DotIndicator*/}
            {/*            key={id}*/}
            {/*            active={i === index}*/}
            {/*            onClick={() => onChangeIndex(i)}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</div>*/}
        </>
    );
    const renderChildren = ({ injectStyle, fineIndex }) =>
        data.map(({ id, title, subtitle, image }, i) => (
            <div key={id}>
                {/*<Typography*/}
                {/*    noWrap*/}
                {/*    className={cx(classes.text, classes.title)}*/}
                {/*    style={{ ...injectStyle(i, 60), ...createStyle(i, fineIndex) }}*/}
                {/*>*/}
                {/*    {title}*/}
                {/*</Typography>*/}
                {/*<Typography*/}
                {/*    noWrap*/}
                {/*    className={cx(classes.text, classes.subtitle)}*/}
                {/*    style={{ ...injectStyle(i, 40), ...createStyle(i, fineIndex) }}*/}
                {/*>*/}
                {/*    {subtitle}*/}
                {/*</Typography>*/}
                {/*<img className={classes.image} src={image} alt={'slide'} />*/}
            </div>
        ));
    return (
        <div className={classes.root}>
            <ParallaxSlide renderElements={renderElements}>
                {renderChildren}
            </ParallaxSlide>
        </div>
    );
};

export const UserCard = React.memo(function News3Card(props) {
    const styles = useStyles1();
    const mediaStyles = useCoverCardMediaStyles();
    return (
        <Card className={styles.card}>
            <Box className={styles.main} minHeight={500} position={'relative'}>
                <CardMedia
                    classes={mediaStyles}
                    image={props.carousel}>
                    <ParallaxCarousel/>
                </CardMedia>


                <div className={styles.content}>
                    <Typography variant={'h2'} className="text-center" style={{color: 'white', fontWeight: 'bold'}}>
                        {props.title}
                        <IconButton color="inherit" size="large" onClick={props.openEditTitleDialog}>
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
                    {props.description} <IconButton color="inherit" size="small"><EditIcon
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
                <Col className='text-center'>
                    <Button variant="contained" endIcon={<AddShoppingCartIcon/>} style={{backgroundColor: 'darkred'}} onClick={props.openNewProductDialog}>
                        Nuovo prodotto
                    </Button>
                </Col>
                <Col className='text-center'>
                    <label htmlFor="carousel-uploader" className='text-center'>
                        <Input accept="image/*" id="carousel-uploader" type="file" hidden
                               onChange={props.updateCarousel}/>
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

export default UserCard;