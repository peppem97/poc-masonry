import {Typography} from "@mui/material";
import {Container, Row} from "react-bootstrap";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export default function Error404() {
    let navigate = useNavigate();

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
                            onClick={() => {
                                navigate("/home");
                            }}>HOME</Button>
                </Row>
            </Container>
        </>
    );
}