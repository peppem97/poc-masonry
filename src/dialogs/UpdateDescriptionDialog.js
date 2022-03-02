import {
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {Col, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import GlobalContext from "../GlobalContext";

export default function UpdateDescriptionDialog(props) {
    const [description, setDescription] = useState(null)

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const closeDialog = () => {
        props.onClose();
    };

    const uploadDescription = () => {
        props.updateDescription(description)
        props.onClose()
    }

    return(
        <Dialog open={props.open} onClose={closeDialog}>
            <DialogTitle>Inserisci una nuova descrizione per il negozio</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Riempi il campo di testo qui sotto per inserire la descrizione alla tua pagina.
                </DialogContentText>
                <br/>
                <Container>
                    <Row>
                        <TextField
                            onChange={onChangeDescription}
                            autoFocus
                            defaultValue={props.description}
                            color='secondary'
                            multiline
                            margin="dense"
                            label="Titolo negozio"
                            variant="outlined"/>
                    </Row>
                    <br/>
                    <Row>
                        <Button onClick={uploadDescription} variant="contained" component="span" style={{backgroundColor: 'darkred'}}>
                            Aggiorna descrizione
                        </Button>
                    </Row>
                </Container>
            </DialogContent>
        </Dialog>
    )
}