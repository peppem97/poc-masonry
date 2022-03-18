import Button from "@mui/material/Button";
import {
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField
} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import axios from "axios";
import GlobalContext from "../GlobalContext";
import {useDispatch} from "react-redux";
import {setToken} from "../store/token";
import {isError} from "../store/error";

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

    const onChangeEmail = (e) => {
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
        axios.post(appContext.ENDPOINT_AUTH, data).then((response) => {
            dispatch(setToken(response.data.jwt));
            setLoading(false);
            props.goToHome();
            closeDialog();
        }).catch(() => {
            setLoading(false);
            dispatch(isError('Errore di autenticazione. Riprovare.'));
        });
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
                                onChange={onChangeEmail}
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