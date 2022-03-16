import Button from "@mui/material/Button";
import {
    CircularProgress,
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
import {Col, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Box from "@mui/material/Box";
import axios from "axios";
import GlobalContext from "../GlobalContext";
import {useDispatch, useSelector} from "react-redux";
import {isLogged} from "../store/login";
import {setToken} from "../store/token";

export default function LoginDialog(props) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const appContext = useContext(GlobalContext);
    const dispatch = useDispatch();


    const closeDialog = () => {
        setEmail(null);
        setPassword(null);
        setLoading(false);
        setShowPassword(false);
        props.onClose();
    };

    const onChangeUsername = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const login = () => {
        setLoading(true);
        let data = {identifier: email, password: password};
        axios.post(appContext.hostSignin, data).then((response) => {
            localStorage.setItem('token', response.data.jwt);
            dispatch(setToken(response.data.jwt));
            setLoading(false);
            dispatch(isLogged());
            props.goToHome();
            closeDialog();
        }).catch(() => {
            setLoading(false);
            appContext.setError('Errore di autenticazione. Riprovare.');
        })
    }

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
                                label="Email"
                                variant="outlined"/>
                        </Row>
                        <Row>
                            <TextField
                                onChange={onChangePassword}
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
                        <br/>
                        {loading ? <Row className='justify-content-center'>
                            <Col className='align-self-center'>
                                <CircularProgress color={'error'} className='text-center'/>
                            </Col>
                        </Row> : null}
                    </Container>

                </DialogContent>
                <DialogActions>
                    <Button component="span" style={{color: 'darkred'}} onClick={closeDialog}>ANNULLA</Button>
                    <Button variant="contained" component="span" style={{backgroundColor: 'darkred'}} onClick={login}>LOGIN</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}