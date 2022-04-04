import {Dialog, DialogTitle, List, ListItem, ListItemText} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext} from "react";
import GlobalContext from "../GlobalContext";
import {useSelector} from "react-redux";

export default function FavoritesDialog(props) {
    const navigate = useNavigate();
    const appContext = useContext(GlobalContext);
    const token = useSelector((state) => state.token.value);

    const goToUser = (username) => {
        axios.get(appContext.ENDPOINT_PENDENTS + '/?username=' + username, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            navigate((response.data[0].usertype === 'cliente' ? appContext.routes.client : appContext.routes.shop) + '/' + username);
        })
    };

    const closeDialog = () => {
        props.onClose();
    };

    return (
        <Dialog onClose={closeDialog} open={props.open}>
            <DialogTitle>Utenti che hanno apprezzato il prodotto:</DialogTitle>
            <List sx={{ pt: 0 }}>
                {
                    props.users.map((user) =>
                        <ListItem button>
                            {/*<ListItemAvatar>*/}
                            {/*    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>*/}
                            {/*        <PersonIcon />*/}
                            {/*    </Avatar>*/}
                            {/*</ListItemAvatar>*/}
                            <ListItemText primary={user} onClick={() => goToUser(user)}/>
                        </ListItem>
                    )
                }
            </List>
        </Dialog>
    )
}