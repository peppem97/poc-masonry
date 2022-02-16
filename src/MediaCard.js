// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardMedia from '@mui/material/CardMedia';
// import {Avatar, CardHeader, IconButton} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// import {useNavigate} from 'react-router-dom';

// function MediaCard(props) {
//     let navigate = useNavigate();
//
//     function goToUser() {
//         navigate("/user/" + props.index, {id: 123});
//     }
//
//     return (
//         <Card sx={{maxWidth: 345}}>
//             <CardMedia component="img" height={props.item.height} image={props.item.imageCard} alt="green iguana"/>
//             <CardHeader
//                 avatar={<IconButton onClick={goToUser}><Avatar src={props.item.imageAvatar}>R</Avatar></IconButton>}
//                 title={"Utente " + props.index}/>
//             <CardActions className="justify-content-between">
//                 <IconButton>
//                     <OpenInNewIcon/>
//                 </IconButton>
//                 <IconButton>
//                     <FavoriteIcon/>
//                 </IconButton>
//                 <IconButton>
//                     <ShareIcon/>
//                 </IconButton>
//             </CardActions>
//         </Card>
//     );
//
// }

import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {
    Info,
    InfoCaption,
    InfoSubtitle,
    InfoTitle,
} from '@mui-treasury/components/info';
import { useGalaxyInfoStyles } from '@mui-treasury/styles/info/galaxy';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import {CardActions, IconButton} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles(() => ({
    card: {
        borderRadius: '1rem',
        boxShadow: 'none',
        position: 'relative',
        minWidth: 200,
        minHeight: 200,
        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '30%',
            bottom: 0,
            zIndex: 1,
            background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        },
    },
    contentDescription: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        width: '100%',
    },

    contentHeader: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        width: '100%',
    },
}));

export const MediaCard = React.memo(function GalaxyCard(props) {
    const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'top' });
    const styles = useStyles();
    let navigate = useNavigate();

    function goToUser() {
        navigate("/user/" + props.index, {id: 123});
    }

    return (
        <>
            {/*<NoSsr>*/}
            {/*    <GoogleFontLoader*/}
            {/*        fonts={[*/}
            {/*            { font: 'Spartan', weights: [300] },*/}
            {/*            { font: 'Montserrat', weights: [200, 400, 700] },*/}
            {/*        ]}*/}
            {/*    />*/}
            {/*</NoSsr>*/}
            <Card className={styles.card} style={{height: props.item.height}}>
                <CardMedia
                    classes={mediaStyles}
                    image={props.item.imageCard}
                />
                <Box py={3} px={2} className={styles.contentHeader}>
                    <IconButton onClick={goToUser}>
                        <Avatar
                            className={styles.avatar}
                            src={'https://i.pravatar.cc/300?img=13'}
                        />
                    </IconButton>

                    {/*<Info useStyles={useGalaxyInfoStyles}>*/}
                    {/*    <InfoSubtitle>Utente {props.index}</InfoSubtitle>*/}
                    {/*    /!*<InfoTitle>Esempio {props.index}</InfoTitle>*!/*/}
                    {/*    /!*<InfoCaption>Breve descrizione del prodotto</InfoCaption>*!/*/}
                    {/*</Info>*/}
                </Box>
                <Box py={3} px={2} className={styles.contentDescription}>
                    <Info useStyles={useGalaxyInfoStyles}>
                        {/*<InfoSubtitle>Galaxy</InfoSubtitle>*/}
                        <InfoTitle>Esempio {props.index}</InfoTitle>
                        {/*<InfoCaption>Breve descrizione del prodotto</InfoCaption>*/}
                        <CardActions className="justify-content-between">
                            <IconButton style={{color: 'white', fontWeight: 'bold'}}>
                                <OpenInNewIcon/>
                            </IconButton>
                            <IconButton style={{color: 'white', fontWeight: 'bold'}}>
                                <FavoriteIcon/>
                            </IconButton>
                            <IconButton style={{color: 'white', fontWeight: 'bold'}}>
                                <ShareIcon/>
                            </IconButton>
                        </CardActions>
                    </Info>
                </Box>
            </Card>
        </>
    );
});

export default MediaCard;
