import {
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField
} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Button from "@mui/material/Button";

export default function SignupDialog(props) {
    const closeDialog = () => {
        props.onClose();
    }

    return (
        <>
            <Dialog
                open={props.open}
                onClose={closeDialog}>
                <DialogTitle>
                    Registrazione
                </DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button component="span" style={{color: 'darkred'}} onClick={closeDialog}>ANNULLA</Button>
                    <Button variant="contained" component="span" style={{backgroundColor: 'darkred'}}>LOGIN</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}