import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Info} from '@mui-treasury/components/info';
import {useGalaxyInfoStyles} from '@mui-treasury/styles/info/galaxy';
import {useCoverCardMediaStyles} from '@mui-treasury/styles/cardMedia/cover';
import {CardActions, IconButton, Skeleton} from "@mui/material";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ShowPreviewDialog from "./dialogs/ShowPreviewDialog";

const useStyles = makeStyles(() => ({
    card: {
        borderRadius: '1rem',
        // boxShadow: 1,
        position: 'relative',
        // minWidth: 200,
        // minHeight: 200,
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
        left: 0,
        width: '100%',
    },
    // contentHeader: {
    //     position: 'absolute',
    //     zIndex: 2,
    //     top: 0,
    //     width: '100%',
    // },
}));

export const PictureCard = React.memo(function GalaxyCard(props) {
    const mediaStyles = useCoverCardMediaStyles({bgPosition: 'top'});
    // const [dialogOpened, setDialogOpened] = useState(false)
    const styles = useStyles();

    const openInNewTab = (url) => {

    }

    return (
        <>
            <Card className={styles.card} style={{height: props.height, width: props.width}} raised>
                <CardMedia classes={mediaStyles} image={props.picture}/>
                {/*<Box py={3} px={2} className={styles.contentHeader}>*/}
                {/*</Box>*/}
                <Box py={3} px={2} className={styles.contentDescription}>
                    <Info useStyles={useGalaxyInfoStyles}>
                        <CardActions className={styles.contentDescription}>
                            <IconButton style={{color: 'white', fontWeight: 'bold'}} onClick={() => {
                                window.open(props.picture, '_blank', 'noopener,noreferrer')
                            }}>
                                <OpenInFullIcon/>
                            </IconButton>
                        </CardActions>
                    </Info>
                </Box>
            </Card>
            <br/>
            {/*<ShowPreviewDialog open={dialogOpened}*/}
            {/*                   image={props.picture}*/}
            {/*                   onClose={() => {*/}
            {/*                       setDialogOpened(false)*/}
            {/*                   }}/>*/}
        </>
    );
});
export default PictureCard;