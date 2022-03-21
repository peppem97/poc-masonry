import {Container, useMediaQuery, useTheme} from "@mui/material";
import {Row} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import React from "react";
import girl from './assets/girl.svg';

export default function About() {
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const largeScreen = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <>
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Typography variant="h1" gutterBottom className="text-center" style={{color: 'black', fontWeight: 'bold'}}>
                        Masonry
                    </Typography>
                    <Typography variant="h3" gutterBottom className="text-center" style={{color: 'darkred'}}>
                        Descrizione Masonry
                    </Typography>
                </Row>
                <br/>
                <br/>
                <Row className='justify-content-center'>
                    <img src={girl} style={{width: smallScreen ? '80%' : mediumScreen ? '60%' : '50%', height: 'auto'}} alt=""/>
                </Row>
                <br/>
            </Container>
        </>
    )
}