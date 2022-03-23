import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";

export default function AlertDialog(props) {
    const closeDialog = () => {
        props.onClose();
    };

    return (
        <>
            <Dialog
                open={props.open}
                onClose={closeDialog}>
                <DialogTitle>
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.errorMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" style={{backgroundColor: 'darkred'}} onClick={closeDialog}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}