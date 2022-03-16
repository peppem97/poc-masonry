import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Info, InfoTitle,} from '@mui-treasury/components/info';
import {useGalaxyInfoStyles} from '@mui-treasury/styles/info/galaxy';
import {useCoverCardMediaStyles} from '@mui-treasury/styles/cardMedia/cover';
import {CardActions, IconButton, Skeleton} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import GlobalContext from "./GlobalContext";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useSelector} from "react-redux";

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

export const ProductCard = React.memo(function GalaxyCard(props) {
    const [avatar, setAvatar] = useState(null);
    const mediaStyles = useCoverCardMediaStyles({bgPosition: 'top'});
    const styles = useStyles();
    const appContext = useContext(GlobalContext);
    const token = useSelector((state) => state.token.value);
    let navigate = useNavigate();

    const goToUser = () => {
        navigate("/user/" + props.product.username);
    };

    const goToProduct = () => {
        navigate("/product/" + props.product.id);
    };

    const getUserInfo = () => {
        appContext.setLoading(true);
        axios.get(appContext.hostShops + "?username=" + props.product.username, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            setAvatar(appContext.host + response.data[0].avatar.url);
            appContext.setLoading(false);
        }).catch(() => {
            appContext.setLoading(false);
        })
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <>
            <Card className={styles.card} style={{height: props.product.height}} raised>
                <CardMedia classes={mediaStyles} image={props.product.picture}/>
                <Box py={3} px={2} className={styles.contentHeader}>
                    {props.showAvatar && (
                        <IconButton onClick={goToUser}>
                            <Avatar src={avatar}/>
                        </IconButton>)}
                </Box>
                <Box py={3} px={2} className={styles.contentDescription}>
                    <Info useStyles={useGalaxyInfoStyles} style={{position: 'absolute', bottom: 0}}>
                        <InfoTitle>{props.product.title}</InfoTitle>
                        <CardActions className="justify-content-left">
                            {props.showAvatar ?
                                <IconButton style={{color: 'white', fontWeight: 'bold'}} onClick={goToProduct}>
                                    <OpenInNewIcon/>
                                </IconButton> :
                                <IconButton style={{color: 'white', fontWeight: 'bold'}} onClick={() => {props.updateProduct(props.product.id)}}>
                                    <EditIcon/>
                                </IconButton>}
                            {props.showAvatar ?
                                // <IconButton style={{color: 'white', fontWeight: 'bold'}}>
                                //     <FavoriteIcon/>
                                // </IconButton>
                                null
                                :
                                <IconButton style={{color: 'white', fontWeight: 'bold'}} onClick={goToProduct}>
                                    <OpenInNewIcon />
                                </IconButton>}
                            {props.showAvatar ?
                                // <IconButton style={{color: 'white', fontWeight: 'bold'}}>
                                //     <ShareIcon/>
                                // </IconButton>
                                null
                                :
                                <IconButton style={{color: 'white', fontWeight: 'bold'}} onClick={() => {props.deleteProduct(props.product.id)}}>
                                    <DeleteForeverIcon/>
                                </IconButton>}
                        </CardActions>
                    </Info>
                </Box>
            </Card>
        </>
    );
});
export default ProductCard;
