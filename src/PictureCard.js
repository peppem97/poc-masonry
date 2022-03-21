import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Info} from '@mui-treasury/components/info';
import {useGalaxyInfoStyles} from '@mui-treasury/styles/info/galaxy';
import {useCoverCardMediaStyles} from '@mui-treasury/styles/cardMedia/cover';
import {CardActions, IconButton} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

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
    }
}));

export const PictureCard = React.memo(function GalaxyCard(props) {
    const mediaStyles = useCoverCardMediaStyles({bgPosition: 'top'});
    const styles = useStyles();

    return (
        <>
            <Card className={styles.card} style={{height: props.height, width: props.width}} raised>
                <CardMedia classes={mediaStyles} image={props.picture ?? null}/>
                <Box py={3} px={2} className={styles.contentDescription}>
                    <Info useStyles={useGalaxyInfoStyles}>
                        <CardActions className={styles.contentDescription}>
                            <IconButton style={{color: 'white', fontWeight: 'bold'}} onClick={() => {
                                window.open(props.picture, '_blank', 'noopener,noreferrer')
                            }}>
                                <VisibilityIcon/>
                            </IconButton>
                        </CardActions>
                    </Info>
                </Box>
            </Card>
            <br/>
        </>
    );
});
export default PictureCard;
