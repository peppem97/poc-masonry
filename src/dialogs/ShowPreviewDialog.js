import {Container, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, TextField} from "@mui/material";
import {Row} from "react-bootstrap";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';

export default function ShowPreviewDialog(props) {
    const closeDialog = () => {
        props.onClose();
    };

    return(
        <Dialog open={props.open} fullScreen={true}>
            <div style={{position: 'relative', display: 'block'}}>
                <img src={props.image} alt="" style={{display: 'block', width: '100%', height: 'auto'}}/>
                <IconButton style={{position: 'absolute', top: 0, left: 0, color: 'darkred'}} onClick={closeDialog}>
                    <CloseIcon />
                </IconButton>

            </div>
        </Dialog>
    )
}