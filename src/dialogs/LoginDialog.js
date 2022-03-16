import Button from "@mui/material/Button";
import {
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, IconButton, InputAdornment,
    InputLabel, OutlinedInput,
    TextField
} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import {Row} from "react-bootstrap";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@material-ui/icons";

export default function LoginDialog(props) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const closeDialog = () => {
        props.onClose();
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Dialog
                open={props.open}
                onClose={closeDialog}>
                <DialogTitle>
                    Autenticati
                </DialogTitle>
                <DialogContent>
                    <Container>
                        <Row>
                            <TextField
                                onChange={onChangeUsername}
                                autoFocus
                                color='secondary'
                                margin="dense"
                                label="Username"
                                variant="outlined"/>
                        </Row>
                        <Row>
                            <TextField
                                onChange={onChangePassword}
                                autoFocus
                                type={showPassword ? 'text' : 'password'}
                                color='secondary'
                                margin="dense"
                                InputProps={{
                                    endAdornment: <IconButton position="start" onClick={onChangeShowPassword}>{
                                        showPassword ? <VisibilityOff/> : <Visibility/>}</IconButton>,
                                }}

                                label="Password"
                                variant="outlined"/>
                        </Row>
                    </Container>

                </DialogContent>
                <DialogActions>
                    <Button component="span" style={{color: 'darkred'}}>ANNULLA</Button>
                    <Button variant="contained" component="span" style={{backgroundColor: 'darkred'}}>LOGIN</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}