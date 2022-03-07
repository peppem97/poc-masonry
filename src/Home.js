import React, {useContext, useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from "@mui/material/Typography";
import GridSystem from "./GridSystem";
import axios from "axios";
import GlobalContext from "./GlobalContext";
import {generateHeight} from "./Utility";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const appContext = useContext(GlobalContext);

    const getProducts = () => {
        // appContext.setLoadingTrue();
        setLoadingProduct(true);
        axios.get(appContext.hostProducts, {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        }).then((response) => {
            let tmpProducts = response.data.map((element) => ({
                height: generateHeight(),
                title: element.title,
                id: element.id,
                description: element.description,
                picture: appContext.host + element.cover.url,
                username: element.username}))
            setProducts(tmpProducts);
            // appContext.setLoadingFalse();
            setLoadingProduct(false);
        }).catch((error) => {})
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
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
                    <GridSystem loadingProducts={loadingProduct} products={products} columnWidth={appContext.columnWidth} isUser={false}/>
                </Row>
            </Container>
        </>
    );
}
