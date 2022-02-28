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

export default function UpdateCarouselDialog(props) {
    // const [title, setTitle] = useState(null)

    // const onChangeTitle = (e) => {
    //     setTitle(e.target.value)
    // }

    const closeDialog = () => {
        props.onClose();
    };

    // const uploadTitle = () => {
    //     props.uploadTitle(title)
    // }

    return(
        <Dialog open={props.open} onClose={closeDialog}>
            <DialogTitle>Modifica copertina</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Modifica le immagini da mostrare nella copertina.
                </DialogContentText>
                <br/>
                <Container>
                    <Row>

                    </Row>
                    <br/>
                    <Row>
                        <Button onClick={() => {}} variant="contained" component="span" style={{backgroundColor: 'darkred'}}>
                            Aggiorna immagini
                        </Button>
                    </Row>
                </Container>
            </DialogContent>
        </Dialog>
    )
}