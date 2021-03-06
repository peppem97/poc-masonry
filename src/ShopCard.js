import {makeStyles} from "@material-ui/core/styles";
import React, {Suspense, useState} from "react";
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
import {useCoverCardMediaStyles} from '@mui-treasury/styles/cardMedia/cover';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CheckIcon from '@mui/icons-material/Check';

const useStyles = makeStyles((theme) => ({
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
        width: 70,
        height: 70,
        boxShadow: theme.shadows[10]
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


export const ShopCard = React.memo(function News3Card(props) {
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const largeScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const ShopCarousel = React.lazy(() => import('./Carousel'));
    const [editAvatar, setEditAvatar] = useState(false);

    return (
        <>
            <Card className={styles.card}>
                <Box className={styles.main}
                     minHeight={smallScreen ? 200 : mediumScreen ? 300 : largeScreen ? 400 : 500}
                     position={'relative'}>
                    <CardMedia
                        classes={mediaStyles}
                        image={''}
                        children={<Suspense fallback={<></>}><ShopCarousel pictures={props.carousel}/></Suspense>}/>
                    <div className={styles.content}>
                        <Typography variant={'h3'} className="text-center" style={{color: 'white', fontWeight: 'bold'}}>
                            {props.title}
                            {props.selfUser &&
                                <>
                                    <IconButton color="inherit" size="medium" onClick={() => {
                                        props.openUpdateInfoDialog('title')
                                    }}>
                                        <EditIcon fontSize="inherit"/>
                                    </IconButton>
                                    <IconButton color="inherit" size="medium" onClick={props.openUpdateCarouselDialog}>
                                        <PanoramaIcon fontSize="inherit"/>
                                    </IconButton>
                                </>}
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
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2,
                        justifyContent: 'center'
                    }}>
                        <Item>
                            {props.selfUser && <label htmlFor="avatar-uploader" className='text-center'>
                                <Input accept="image/*" id="avatar-uploader" type="file" hidden
                                       onChange={props.updateAvatar}/>
                                <Avatar onMouseOver={() => {
                                    setEditAvatar(true)
                                }} onMouseLeave={() => {
                                    setEditAvatar(false)
                                }}
                                        className={styles.avatar}
                                        style={{cursor: editAvatar ? 'pointer' : null}}
                                        src={!editAvatar && props.avatar}>
                                    {editAvatar && <AddPhotoAlternateIcon/>}
                                </Avatar>
                            </label>}
                            {
                                !props.selfUser &&
                                <Avatar className={styles.avatar} src={props.avatar}/>
                            }
                        </Item>
                        <Info position={'middle'} useStyles={useNewsInfoStyles}>

                            <InfoTitle style={{fontWeight: 'bold'}}>{props.email}
                                {/*{props.selfUser && <IconButton color="inherit" size="small" onClick={() => {*/}
                                {/*    props.openUpdateInfoDialog('email')*/}
                                {/*}}><EditIcon*/}
                                {/*    fontSize="inherit"/>*/}
                                {/*</IconButton>}*/}
                            </InfoTitle>
                            <InfoTitle style={{fontWeight: 'bold'}}>{props.website}
                                {props.selfUser && <IconButton color="inherit" size="small" onClick={() => {
                                    props.openUpdateInfoDialog('website')
                                }}>
                                    <EditIcon fontSize="inherit"/>
                                </IconButton>}
                            </InfoTitle>
                            <InfoSubtitle>{props.telephone}
                                {props.selfUser && <IconButton color="inherit" size="small" onClick={() => {
                                    props.openUpdateInfoDialog('telephone')
                                }}>
                                    <EditIcon fontSize="inherit"/>
                                </IconButton>}
                            </InfoSubtitle>
                        </Info>
                    </Box>
                </Row>
                {!props.selfUser &&
                    <Row className={styles.author}
                         m={0}
                         p={1}
                         pt={2}
                         gap={1}
                         bgcolor={'common.white'}>
                        {props.followed ?
                            <Button onClick={props.toggleFollow}
                                    variant='outlined'
                                    endIcon={<CheckIcon/>}
                                    style={{color: 'darkred', borderColor: 'darkred'}}>
                                SEGUITO
                            </Button> :
                            <Button variant="contained"
                                    onClick={props.toggleFollow}
                                    endIcon={<AddBusinessIcon/>}
                                    style={{backgroundColor: 'darkred'}}>
                                Segui
                            </Button>
                        }
                    </Row>
                }
                <Row className={styles.author}
                     m={0}
                     p={3}
                     pt={2}
                     gap={2}
                     bgcolor={'common.white'}>
                    <Typography variant='subtitle1' className="text-center">
                        {props.description}
                        {props.selfUser && <IconButton color="inherit" size="small" onClick={() => {
                            props.openUpdateInfoDialog('description')
                        }}>
                            <EditIcon fontSize="inherit"/>
                        </IconButton>}
                    </Typography>
                </Row>
                <Row className={styles.author}
                     m={0}
                     p={3}
                     pt={2}
                     gap={2}
                     bgcolor={'common.white'}>
                    {props.selfUser && <Col className='text-center' xl={4}>
                        <Button variant="contained" endIcon={<AddShoppingCartIcon/>}
                                style={{backgroundColor: 'darkred'}}
                                onClick={props.openUploadProductDialog}>
                            Inserisci un nuovo prodotto
                        </Button>
                    </Col>}
                </Row>
                <div className={styles.shadow}/>
                <div className={`${styles.shadow} ${styles.shadow2}`}/>
            </Card>
        </>
    );
});

export default ShopCard;