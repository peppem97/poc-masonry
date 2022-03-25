import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Info} from '@mui-treasury/components/info';
import {useGalaxyInfoStyles} from '@mui-treasury/styles/info/galaxy';
import {useCoverCardMediaStyles} from '@mui-treasury/styles/cardMedia/cover';
import {CardActions, IconButton, Input} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const useStyles = makeStyles(() => ({
    card: {
        borderRadius: '1rem',
        position: 'relative',
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
                            {props.edit == null && <IconButton style={{color: 'white', fontWeight: 'bold'}} onClick={() => {
                                window.open(props.picture, '_blank', 'noopener,noreferrer')
                            }}>
                                <VisibilityIcon/>
                            </IconButton>}
                            {
                                (props.edit && props.add) &&
                                <>
                                    <label
                                        htmlFor="icon-button-file"
                                        key={0}>
                                        <Input accept="image/*"
                                               id="icon-button-file"
                                               type="file"
                                               hidden
                                               onChange={(e) => {
                                                   props.addPicture(e, props.index)}}/>
                                        <IconButton
                                            sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                            aria-label="upload picture"
                                            component="span">
                                            <PhotoCamera/>
                                        </IconButton>
                                    </label>
                                </>
                            }
                            {
                                (props.edit && !props.add) &&
                                <>
                                    <IconButton
                                        sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                        key={0}
                                        onClick={() => {window.open(props.picture, '_blank', 'noopener,noreferrer')}}>
                                        <OpenInFullIcon/>
                                    </IconButton>
                                    <IconButton
                                        sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                        onClick={() => {props.removePicture(props.index)}}>
                                        <DeleteForeverIcon/>
                                    </IconButton>

                                </>
                            }
                        </CardActions>
                    </Info>
                </Box>
            </Card>
            <br/>
        </>
    );
});
export default PictureCard;
