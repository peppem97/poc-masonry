import {Container} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import React from "react";
import girl from './assets/girl.svg';

export default function About() {
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
                    <img src={girl} style={{width: '50%', height: 'auto'}}/>
                </Row>
                <br/>
            </Container>
        </>
    )
}