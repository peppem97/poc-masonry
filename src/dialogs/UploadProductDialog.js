import {
    Container,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {Col, Row} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function UploadProductDialog(props) {
    const [picture, setPicure] = useState(null)
    const [rawPicture, setRawPicure] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)

    const onChangePicture = (e) => {
        setPicure(URL.createObjectURL(e.target.files[0]));
        setRawPicure(e.target.files[0])
    };

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const closeDialog = () => {
        props.onClose();
    };

    const uploadProduct = () => {
        props.uploadProduct({
            rawPicture: rawPicture,
            title: title,
            description: description
        });
        props.onClose();
    }

    useEffect(() => {
        setPicure(null)
    }, [props.open]);

    return(
        <Dialog open={props.open} onClose={closeDialog}>
            <DialogTitle>Inserisci un nuovo prodotto</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Riempi i campi per inserire un nuovo prodotto all'interno della tua pagina.
                </DialogContentText>
                <br/>
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                <TextField
                                    onChange={onChangeTitle}
                                    autoFocus
                                    color='secondary'
                                    margin="dense"
                                    label="Titolo prodotto"
                                    variant="outlined"/>
                            </Row>
                            <br/>
                            <Row>
                                <TextField
                                    onChange={onChangeDescription}
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
                                <Button onClick={uploadProduct} variant={picture ? "contained": null} component="span" style={{backgroundColor: picture ? 'darkred' : 'grey'}}>
                                    Inserisci prodotto
                                </Button>
                            </Row>
                        </Col >
                        <Col >

                            <img src={picture} alt="" style={{width: '100%', height: 'auto', borderRadius: '1rem', filter: 'drop-shadow(5px 5px 4px #000000)'}}/>
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