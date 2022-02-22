import React, {useContext, useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from "@mui/material/Typography";
import GridSystem from "./GridSystem";
import axios from "axios";
import AppContext from "./AppContext";

export default function Home() {
    const [items, setItems] = useState([])
    const appContext = useContext(AppContext);

    const generateHeight = () => {
        return Math.floor((Math.random() * (380)) + 80);
    }

    const getInitialItems = () => {
        axios.get("http://zion.datafactor.it:40505/products", {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        }).then((response) => {
            let items = response.data.map((element) => ({
                height: generateHeight(),
                title: element.title,
                token: appContext.token,
                description: element.description,
                picture: "http://zion.datafactor.it:40505" + element.picture.url,
                username: element.username}))
            setItems(items)
        }).catch((error) => {})
    }

    useEffect(() => {
        getInitialItems();
    }, [])

    return (
        <Container fluid>
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
            <br/>
            <Row>
                <GridSystem items={items} columnWidth={appContext.columnWidth} isUser={false}/>
            </Row>
        </Container>
    );
}
