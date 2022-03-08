import {
    Container,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {Row} from "react-bootstrap";
import {useState} from "react";

export default function UpdateInfoDialog(props) {
    const [info, setInfo] = useState(null)

    const onChangeInfo = (e) => {
        setInfo(e.target.value);
    }

    const closeDialog = () => {
        props.onClose();
    };

    const uploadInfo = () => {
        props.updateInfo(info);
        props.onClose();
    }

    return(
        <Dialog open={props.open} onClose={closeDialog}>
            <DialogTitle>Modifica informazioni</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Riempi il campo sottostante per aggiornare l'informazione del negozio.
                </DialogContentText>
                <br/>
                <Container>
                    <Row>
                        <TextField
                            onChange={onChangeInfo}
                            autoFocus
                            defaultValue={props.info}
                            color='secondary'
                            multiline={props.infoToEdit == 'description'}
                            margin="dense"
                            label="Informazione"
                            variant="outlined"/>
                    </Row>
                    <br/>
                    <Row>
                        <Button onClick={uploadInfo} variant="contained" component="span" style={{backgroundColor: 'darkred'}}>
                            Aggiorna informazione
                        </Button>
                    </Row>
                </Container>
            </DialogContent>
        </Dialog>
    )
}