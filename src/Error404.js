import {Typography, useMediaQuery, useTheme} from "@mui/material";
import {Container, Row} from "react-bootstrap";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import GlobalContext from "./GlobalContext";
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import error404SVG from "./assets/404.svg";

export default function Error404() {
    const navigate = useNavigate();
    const appContext = useContext(GlobalContext);
    const stateLogin = useSelector((state) => state.token.value);
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));

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
                    <Typography variant='h2' className='text-center'>Questa pagina non esiste...</Typography>
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
                        <img src={error404SVG} alt=''
                             style={{width: smallScreen ? '70%' : mediumScreen ? '50%' : '30%', height: 'auto'}}/>
                    </Box>
                </Row>
                <br/>
                <Row className='justify-content-center'>
                    <Button variant="contained" style={{width: '20%', color: 'white', backgroundColor: 'darkred'}}
                            onClick={goToHome}>RITORNA ALLA HOME</Button>
                </Row>
            </Container>
        </>
    );
}