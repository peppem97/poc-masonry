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
import {useEffect, useState} from "react";

export default function InsertProductDialog(props) {
    const [picture, setPicure] = useState(null)
    const [rawPicture, setRawPicure] = useState(null)


    const onChangePicture = (e) => {
        setPicure(URL.createObjectURL(e.target.files[0]));
        setRawPicure(e.target.files[0])
    };

    const closeDialog = (value) => {
        props.onClose(value);
    };

    useEffect(() => {
        setPicure(null)
    }, [props.open])

    return(
        <Dialog open={props.open} onClose={closeDialog}>
            <DialogTitle>Inserisci un nuovo prodotto</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Riempi i campi per inserire un nuovo prodotto all'interno della tua pagina.
                </DialogContentText>
                <br/>
                <Container>
                    <Row className='text-center'>
                        <Col>
                            <Row>
                                <TextField
                                    autoFocus
                                    color='secondary'
                                    margin="dense"
                                    label="Titolo prodotto"
                                    variant="outlined"/>
                            </Row>
                            <br/>
                            <Row>
                                <TextField
                                    label="Descrizione prodotto"
                                    multiline
                                    color='secondary'
                                    rows={4}
                                />
                            </Row>
                            <br/>
                            <Row>
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" multiple type="file" hidden onChange={onChangePicture}/>
                                    <Button variant="contained" component="span" style={{backgroundColor: 'darkred'}}>
                                        Carica immagine
                                    </Button>
                                </label>
                            </Row>
                            <br/>
                            <Row>
                                <Button variant={picture ? "contained": null} component="span" style={{backgroundColor: picture ? 'darkred' : 'grey'}}>
                                    Inserisci prodotto
                                </Button>
                            </Row>
                        </Col >
                        <Col className='text-center'>
                            <img src={picture} alt="" style={{width: '80%', height: 'auto', borderRadius: '1rem'}}/>
                        </Col>
                    </Row>
                </Container>
            </DialogContent>
            {/*<DialogActions>*/}
            {/*    <Button onClick={closeDialog}>Cancel</Button>*/}
            {/*    <Button onClick={closeDialog}>Subscribe</Button>*/}
            {/*</DialogActions>*/}
        </Dialog>
    )
}