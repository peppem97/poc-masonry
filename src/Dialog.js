import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from "@mui/material/Typography";
import {CardContent, DialogContent, IconButton, useMediaQuery, useTheme} from "@mui/material";
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {Row, Column, Item} from '@mui-treasury/components/flex';
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import cx from "clsx";
import FavoriteBorderRounded from '@material-ui/icons/FavoriteBorderRounded';
import Share from '@material-ui/icons/Share';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useSlopeCardMediaStyles } from '@mui-treasury/styles/cardMedia/slope';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import Button from "@mui/material/Button";
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AppContext from "./AppContext";
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
        margin: '-56px 32px 0 auto',
        '& > img': {
            margin: 0,
        },
    },
}));

export const ProductDialog = React.memo(function PostCard(props) {
    const cardStyles = useStyles();
    const mediaStyles = useSlopeCardMediaStyles();
    const textCardContentStyles = useN01TextInfoContentStyles();
    const [shop, setShop] = useState(null)
    const appContext = useContext(AppContext);


    const closeDialog = (value) => {
        props.onClose(value);
    };

    useEffect(() => {
        axios.get("http://zion.datafactor.it:40505/shops?username=" + props.username, {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        }).then((response) => {
            setShop("http://zion.datafactor.it:40505" + response.data[0].title)
        }).catch((error) => {})
    }, [])

    return (
        <Dialog open={props.open} onClose={closeDialog} fullWidth={true} >
            <Card className={cx(cardStyles.root)} style={{width: '100%'}}>
                <CardMedia classes={mediaStyles} image={props.picture}/>
                {props.showAvatar && <Avatar className={cardStyles.avatar} src={props.avatar}/>}
                <CardContent className={cardStyles.content}>
                    <TextInfoContent
                        classes={textCardContentStyles}
                        heading={props.title}
                        body={props.description}
                    />
                </CardContent>
                <Box px={2} pb={2} mt={-1}>
                    <IconButton>
                        <Share />
                    </IconButton>
                    <IconButton>
                        <FavoriteBorderRounded />
                    </IconButton>
                </Box>
            </Card>
        </Dialog>
    );
});
//*******************//

// const useStyles = makeStyles(({ breakpoints, spacing }) => ({
//     root: {
//         margin: 'auto',
//         borderRadius: spacing(2), // 16px
//         transition: '0.3s',
//         boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
//         position: 'relative',
//         maxWidth: 500,
//         marginLeft: 'auto',
//         overflow: 'initial',
//         background: '#ffffff',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         paddingBottom: spacing(2),
//         [breakpoints.up('md')]: {
//             flexDirection: 'row',
//             paddingTop: spacing(2),
//         },
//     },
//     media: {
//         width: '100%',
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         marginTop: spacing(-3),
//         height: 0,
//         paddingBottom: '48%',
//         borderRadius: spacing(2),
//         backgroundColor: '#fff',
//         position: 'relative',
//         [breakpoints.up('md')]: {
//             width: '100%',
//             marginLeft: spacing(-3),
//             marginTop: 0,
//             transform: 'translateX(-8px)',
//         },
//         '&:after': {
//             content: '" "',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             // backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
//             borderRadius: spacing(2), // 16
//             opacity: 0.5,
//         },
//     },
//     content: {
//         padding: 24,
//     },
//     cta: {
//         marginTop: 24,
//         textTransform: 'initial',
//     },
// }));
//
// export const MediaCard = React.memo(function BlogCard(props) {
//     const styles = useStyles();
//     const {
//         button: buttonStyles,
//         ...contentStyles
//     } = useBlogTextInfoContentStyles();
//
//     const closeDialog = (value) => {
//         props.onClose(value);
//     };
//
//     return (
//         <Dialog open={props.open} onClose={closeDialog} >
//             <Card className={cx(styles.root)}>
//                 <CardMedia
//                     className={styles.media}
//                     image={
//                         props.picture
//                     }
//                 />
//                 <CardContent>
//                     <TextInfoContent
//                         classes={contentStyles}
//                         overline={'28 MAR 2019'}
//                         heading={'What is Git ?'}
//                         body={
//                             'Git is a distributed version control system. Every dev has a working copy of the code and...'
//                         }
//                     />
//                     <Button className={buttonStyles}>Read more</Button>
//                 </CardContent>
//             </Card>
//
//         </Dialog>
//     );
// });

export default ProductDialog;
