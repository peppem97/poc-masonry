import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from "@mui/material/Typography";
import {
    CardActions,
    CardContent,
    CardHeader,
    DialogContent,
    IconButton, ImageList, ImageListItem,
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
const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 1000,
        margin: 'auto',
    },
    content: {
        padding: 24,
    },
    avatar: {
        width: 50,
        height: 50,
        border: '2px solid #fff',
        margin: '-76px 32px 0 auto',
        '& > img': {
            margin: 0,
        },
    },
}));

export const ShowProductDialog = React.memo(function PostCard(props) {
    let navigate = useNavigate();
    const [fullScreen, setFullScreen] = useState(false)
    const [carousel, setCarousel] = useState([])
    const appContext = useContext(GlobalContext);


    const closeDialog = (value) => {
        props.onClose(value);
    };

    const goToUser = () => {
        navigate("/user/" + props.username);
    }

    const getCarouselList = (...carousels) => {
        let returnList = []
        for (let i = 0; i < carousels.length; i++) {
            if (carousels[i] != null) {
                returnList.push({index: i, image: appContext.host + carousels[i].url, rawImage: null, add: false})
            }
        }
        return returnList
    }


    useEffect(() => {
        if (props.open) {
            axios.get(appContext.hostProducts + "?id=" + props.id, {
                headers: {'Authorization': 'Bearer ' + appContext.token}
            }).then((response) => {
                console.log(response)
                setCarousel(getCarouselList(
                    response.data[0].picture0,
                    response.data[0].picture1,
                    response.data[0].picture2,
                    response.data[0].picture3,
                    response.data[0].picture4))

            }).catch((error) => {
            })
        }
    }, [props.open])

    return (
        <Dialog open={props.open} onClose={closeDialog} fullWidth={true} fullScreen={fullScreen}>
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
            </DialogTitle>
            <DialogContent>
                <CardMedia
                    height="350"
                    component="img"
                    image={props.picture}
                />
                <Typography gutterBottom variant="h5" component="div" className="text-center">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="text-center">
                    {props.description}
                </Typography>
                <br/>
                <Container>
                    <ImageList sx={{width: 550, height: 200}} gap={5} cols={50}>
                        {carousel.map((element) =>
                            <ImageListItem cols={10} rows={1}>
                                <img
                                    src={element.image}
                                    alt=""
                                    loading="lazy"
                                />
                            </ImageListItem>)}
                        {carousel.map((element) =>
                            <ImageListItem cols={10} rows={1}>
                                <img
                                    src={element.image}
                                    alt=""
                                    loading="lazy"
                                />
                            </ImageListItem>)}

                    </ImageList>

                </Container>

            </DialogContent>
        </Dialog>
    );
});

export default ShowProductDialog;
