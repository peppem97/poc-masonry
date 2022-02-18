import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Info, InfoTitle,} from '@mui-treasury/components/info';
import {useGalaxyInfoStyles} from '@mui-treasury/styles/info/galaxy';
import {useCoverCardMediaStyles} from '@mui-treasury/styles/cardMedia/cover';
import {CardActions, IconButton} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import {useNavigate} from "react-router-dom";
import ProductDialog from "./Dialog";

const useStyles = makeStyles(() => ({
    card: {
        borderRadius: '1rem',
        // boxShadow: 1,
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
    const mediaStyles = useCoverCardMediaStyles({bgPosition: 'top'});
    const styles = useStyles();
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const goToUser = () => {
        navigate("/user/1", {id: 123});
    }

    // function openProduct() {
    //     console.log('Apro il prodotto ' + props.index)
    // }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        // setSelectedValue(value);
    };

    return (
        <>
            <Card className={styles.card} style={{height: props.item.height}} raised onClick={handleClickOpen}>
                <CardMedia classes={mediaStyles} image={props.item.imageCard}/>
                <Box py={3} px={2} className={styles.contentHeader}>
                    {props.showAvatar && (<IconButton onClick={goToUser}>
                        <Avatar
                            src={'https://i.pravatar.cc/300?img=13'}/>
                    </IconButton>)}
                </Box>
                <Box py={3} px={2} className={styles.contentDescription}>
                    <Info useStyles={useGalaxyInfoStyles}>
                        <InfoTitle>{props.item.title}</InfoTitle>
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
            <ProductDialog
                selectedValue={(e) => {
                    console.log(e)
                }}
                open={open}
                imageProduct={props.item.imageCard}
                onClose={handleClose}
                title={props.item.title}
                description={props.item.description}
                user={props.item.user}
                image={props.item.imageCard}
            />
        </>
    );
});

export default MediaCard;
