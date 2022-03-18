import {Typography} from "@mui/material";
import {Container, Row} from "react-bootstrap";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import GlobalContext from "./GlobalContext";

export default function ErrorNoUser() {
    let navigate = useNavigate();
    const appContext = useContext(GlobalContext);

    return (
        <>
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row className='justify-content-center'>
                    <Typography variant='h1' className='text-center'>Questo utente non esiste.</Typography>
                </Row>
                <br/>
                <Row className='justify-content-center'>
                    <Button variant="contained" style={{width: '20%', color: 'white', backgroundColor: 'darkred'}} onClick={() => {
                        navigate(appContext.routes.home);
                    }}>HOME</Button>
                </Row>
            </Container>
        </>
    );
}