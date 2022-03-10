import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteProductDialog(props) {
    const closeDialog = (consens) => {
        props.deleteProduct(consens);
        props.onClose();
    };

    return (
        <Dialog
            open={props.open}
            onClose={closeDialog}>
            <DialogTitle>
                Cancellazione prodotto
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Sei sicuro di voler cancellare questo prodotto e tutte le sue informazioni (titolo, descrizione, immagini...)? Una volta cancellato, il prodotto non è più recuperabile.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => closeDialog(false)} style={{color: 'black'}}>ANNULLA</Button>
                <Button onClick={() => closeDialog(true)} autoFocus variant="contained" style={{backgroundColor: 'darkred'}}>
                    CANCELLA
                </Button>
            </DialogActions>
        </Dialog>
    );
}
