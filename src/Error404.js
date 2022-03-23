import {Typography} from "@mui/material";
import {Container, Row} from "react-bootstrap";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import GlobalContext from "./GlobalContext";
import {useSelector} from "react-redux";

export default function Error404() {
    let navigate = useNavigate();
    const appContext = useContext(GlobalContext);
    const stateLogin = useSelector((state) => state.token.value);

    const goToHome = () => {
        if (stateLogin) {
            navigate(appContext.routes.home);
        } else {
            navigate(appContext.routes.welcome);
        }
    };

    return (
        <>
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row className='justify-content-center'>
                    <Typography variant='h1' className='text-center'>ERRORE 404</Typography>
                </Row>
                <br/>
                <Row className='justify-content-center'>
                    <Button variant="contained" style={{width: '20%', color: 'white', backgroundColor: 'darkred'}}
                            onClick={goToHome}>HOME</Button>
                </Row>
            </Container>
        </>
    );
}