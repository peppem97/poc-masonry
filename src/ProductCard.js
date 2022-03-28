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
import {CardActions, IconButton} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import GlobalContext from "./GlobalContext";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch, useSelector} from "react-redux";
import {setBusy, setIdle} from "./store/loading";

const useStyles = makeStyles(() => ({
    card: {
        borderRadius: '1rem',
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
    const dispatch = useDispatch();

    const goToShop = () => {
        navigate(appContext.routes.shop + "/" + props.product.username);
    };

    const goToProduct = () => {
        navigate(appContext.routes.product + "/" + props.product.id);
    };

    const getShopInfo = () => {
        dispatch(setBusy());
        axios.get(appContext.ENDPOINT_SHOPS + "?username=" + props.product.username, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            setAvatar(appContext.HOST + response.data[0].avatar.url);
            dispatch(setIdle());
        }).catch(() => {
            dispatch(setIdle());
        })
    };

    useEffect(() => {
        getShopInfo();
    }, []);

    return (
        <>
            <Card className={styles.card} style={{height: props.product.height}} raised>
                <CardMedia classes={mediaStyles} image={props.product.picture ?? ''}/>
                <Box py={3} px={2} className={styles.contentHeader}>
                    {props.showAvatar && (
                        <IconButton onClick={goToShop}>
                            <Avatar src={avatar ?? null}/>
                        </IconButton>)}
                </Box>
                <Box py={3} px={2} className={styles.contentDescription}>
                    <Info useStyles={useGalaxyInfoStyles} style={{position: 'absolute', bottom: 0}}>
                        <InfoTitle noWrap={false}>{props.product.title}</InfoTitle>
                        <CardActions className="justify-content-left">
                            {props.showAvatar ?
                                <IconButton style={{color: 'white', fontWeight: 'bold'}} onClick={goToProduct}>
                                    <OpenInNewIcon/>
                                </IconButton> :
                                props.editable ?
                                    <IconButton style={{color: 'white', fontWeight: 'bold'}} onClick={() => {
                                        props.updateProduct(props.product.id)
                                    }}>
                                        <EditIcon/>
                                    </IconButton> : null}
                            {props.showAvatar ?
                                null
                                :
                                <IconButton style={{color: 'white', fontWeight: 'bold'}} onClick={goToProduct}>
                                    <OpenInNewIcon/>
                                </IconButton>}
                            {props.showAvatar ?
                                // <IconButton style={{color: 'white', fontWeight: 'bold'}}>
                                //     <ShareIcon/>
                                // </IconButton>
                                null
                                :
                                props.editable ?
                                    <IconButton style={{color: 'white', fontWeight: 'bold'}} onClick={() => {
                                        props.deleteProduct(props.product.id)
                                    }}>
                                        <DeleteForeverIcon/>
                                    </IconButton> : null}
                        </CardActions>
                    </Info>
                </Box>
            </Card>
        </>
    );
});
export default ProductCard;
