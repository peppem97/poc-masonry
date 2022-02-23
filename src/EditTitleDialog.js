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
import GlobalContext from "./GlobalContext";

export default function EditTitleDialog(props) {
    const [title, setTitle] = useState(null)

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const closeDialog = () => {
        props.onClose();
    };

    const uploadTitle = () => {
        props.uploadTitle(title)
    }

    return(
        <Dialog open={props.open} onClose={closeDialog}>
            <DialogTitle>Inserisci un nuovo titolo per il negozio</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Riempi i campi per inserire un nuovo prodotto all'interno della tua pagina.
                </DialogContentText>
                <br/>
                <Container>
                    <Row>
                        <TextField
                            onChange={onChangeTitle}
                            autoFocus
                            color='secondary'
                            margin="dense"
                            label="Titolo negozio"
                            variant="outlined"/>
                    </Row>
                    <br/>
                    <Row>
                        <Button onClick={uploadTitle} variant="contained" component="span" style={{backgroundColor: 'darkred'}}>
                            Aggiorna titolo
                        </Button>
                    </Row>
                </Container>
            </DialogContent>
        </Dialog>
    )
}