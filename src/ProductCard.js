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
import ShowProductDialog from "./dialogs/ShowProductDialog";
import axios from "axios";
import GlobalContext from "./GlobalContext";

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
    const mediaStyles = useCoverCardMediaStyles({bgPosition: 'top'});
    const styles = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [avatar, setAvatar] = useState(null)
    const [shop, setShop] = useState(null)

    const [loading, setLoading] = useState(false);
    const appContext = useContext(GlobalContext);
    let navigate = useNavigate();

    const goToUser = () => {
        navigate("/user/" + props.item.username);
    }

    useEffect(() => {
        setLoading(true)
        axios.get(appContext.hostShops + "?username=" + props.item.username, {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        }).then((response) => {
            setAvatar(appContext.host + response.data[0].avatar.url)
            setShop(response.data[0].title)
            setLoading(false)
        }).catch((error) => {
        })
    }, [])


    return (
        <>
            <Card className={styles.card} style={{height: props.item.height}} raised onClick={() => {setOpenDialog(true)}}>
                <CardMedia classes={mediaStyles} image={props.item.picture}/>
                <Box py={3} px={2} className={styles.contentHeader}>
                    {props.showAvatar && (
                        <IconButton onClick={goToUser}>
                            {loading ? <Skeleton variant="circular">
                                <Avatar src={avatar}/>
                            </Skeleton> : <Avatar src={avatar}/>}
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
            <ShowProductDialog
                open={openDialog}
                onClose={() => {setOpenDialog(false)}}
                avatar={avatar}
                showAvatar={props.showAvatar}
                title={props.item.title}
                description={props.item.description}
                picture={props.item.picture}
                username={props.item.username}
                id={props.item.id}
                shop={shop}
            />
        </>
    );
});
export default ProductCard;
