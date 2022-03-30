import {Typography, useMediaQuery, useTheme} from "@mui/material";
import {Container, Row} from "react-bootstrap";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import GlobalContext from "./GlobalContext";
import nouserSVG from "./assets/nouser.svg";
import Box from "@mui/material/Box";

export default function ErrorNoUser() {
    const navigate = useNavigate();
    const appContext = useContext(GlobalContext);
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row className='justify-content-center'>
                    <Typography variant='h2' className='text-center'>Questo utente non esiste!</Typography>
                </Row>
                <br/>
                <Row>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2,
                        justifyContent: 'center'
                    }}>
                    <img src={nouserSVG} alt='' style={{width: smallScreen ? '70%' : mediumScreen ? '50%' : '30%', height: 'auto'}}/>
                    </Box>
                </Row>
                <br/>
                <Row className='justify-content-center'>
                    <Button variant="contained" style={{width: '50%', color: 'white', backgroundColor: 'darkred'}} onClick={() => {
                        navigate(appContext.routes.home);
                    }}>RITORNA ALLA HOME</Button>
                </Row>
            </Container>
        </>
    );
}