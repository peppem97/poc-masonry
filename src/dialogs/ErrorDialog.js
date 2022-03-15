import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";

export default function ErrorDialog(props) {
    const onClose = () => {
        props.onClose();
    };

    return (
        <>
            <Dialog
                open={props.open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    Attenzione
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.errorMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" style={{backgroundColor: 'darkred'}} onClick={onClose}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}