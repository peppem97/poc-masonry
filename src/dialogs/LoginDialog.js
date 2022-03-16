import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";

export default function LoginDialog(props) {
    const closeDialog = () => {
        props.onClose();
    };

    return (
        <>
            <Dialog
                open={props.open}
                onClose={closeDialog}>
                <DialogTitle>
                    Autenticati
                </DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button>ANNULLA</Button>
                    <Button>LOGIN</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}