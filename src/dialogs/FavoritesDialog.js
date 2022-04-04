import {Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import {blue} from "@mui/material/colors";
import PersonIcon from '@mui/icons-material/Person';

export default function FavoritesDialog(props) {
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
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user}/>
                        </ListItem>

                    )
                }
            </List>
        </Dialog>
    )
}