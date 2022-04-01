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
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {setFavorites, setFollowing} from "./store/user";

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
const useAvatarShadow = makeStyles(theme => ({
    avatar: {
        boxShadow: theme.shadows[10],
    }
}));
const useActions = (theme) => ({
    display: "flex",
    justifyContent: "center"
});
const iconButtonStyle = {
    color: 'white',
    fontWeight: 'bold'
};

export const ProductCard = React.memo(function GalaxyCard(props) {
    const [avatar, setAvatar] = useState(null);
    const [favorite, setFavorite] = useState(false);
    const mediaStyles = useCoverCardMediaStyles({bgPosition: 'top'});
    const avatarShadow = useAvatarShadow();
    const styles = useStyles();
    const actions = useActions();
    const appContext = useContext(GlobalContext);
    const token = useSelector((state) => state.token.value);
    const favorites = useSelector((state) => state.user.favorites);
    const userType = useSelector((state) => state.user.type);
    const id = useSelector((state) => state.user.id);
    const navigate = useNavigate();
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

    const toggleFavorite = () => {
        let tmp;
        if (favorite) {
            tmp = favorites.filter((element) => (element !== props.product.id));
        } else {
            tmp = JSON.parse(JSON.stringify(favorites));
            tmp.push(props.product.id);
        }
        let data = {
            favorites: tmp
        };
        axios.put((userType === 'negozio' ? appContext.ENDPOINT_SHOPS : appContext.ENDPOINT_CLIENTS) + "/" + id, data,{
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            dispatch(setFavorites(response.data.favorites));
            checkFavorites(response.data.favorites);
        });
    };

    const checkFavorites = (favorites) => {
        setFavorite(favorites.includes(props.product.id));
    };

    useEffect(() => {
        getShopInfo();
    }, []);

    useEffect(() => {
        checkFavorites(favorites);
    }, [props.product.id]);

    return (
        <>
            <Card className={styles.card} style={{height: props.product.height}} raised>
                <CardMedia classes={mediaStyles} image={props.product.picture ?? ''}/>
                <Box py={3} px={2} className={styles.contentHeader}>
                    {props.showAvatar && (
                        <IconButton onClick={goToShop}>
                            <Avatar src={avatar ?? null} className={avatarShadow.avatar}/>
                        </IconButton>)}
                </Box>
                <Box py={3} px={2} className={styles.contentDescription}>
                    <Info useStyles={useGalaxyInfoStyles} style={{position: 'absolute', bottom: 0}}>
                        <InfoTitle noWrap={false}>{props.product.title}</InfoTitle>
                        <CardActions className={actions}>
                            {
                                <IconButton style={iconButtonStyle} onClick={goToProduct}>
                                    <OpenInNewIcon/>
                                </IconButton>
                            }
                            {
                                favorite ?
                                    <IconButton style={{color: 'red', fontWeight: 'bold'}} onClick={toggleFavorite}>
                                        <FavoriteIcon/>
                                    </IconButton> :
                                    <IconButton style={iconButtonStyle} onClick={toggleFavorite}>
                                        <FavoriteBorderIcon/>
                                    </IconButton>
                            }
                            {
                                props.editable ?
                                    <IconButton style={iconButtonStyle} onClick={() => {
                                        props.updateProduct(props.product.id)
                                    }}><EditIcon/>
                                    </IconButton> : null
                            }
                            {
                                props.editable ?
                                    <IconButton style={iconButtonStyle} onClick={() => {
                                        props.deleteProduct(props.product.id)
                                    }}><DeleteForeverIcon/>
                                    </IconButton> : null
                            }
                        </CardActions>
                    </Info>
                </Box>
            </Card>
        </>
    );
});
export default ProductCard;
