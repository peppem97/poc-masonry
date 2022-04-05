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
import {useDispatch, useSelector} from "react-redux";
import {isError} from "./store/dialogs";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const appContext = useContext(GlobalContext);
    const token = useSelector((state) => state.token.value);
    const firstAccess = useSelector((state) => state.user.firstAccess);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProducts = () => {
        setLoadingProduct(true);
        axios.get(appContext.ENDPOINT_PRODUCTS, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            let tmpProducts = response.data.map((element) => ({
                height: generateHeight(),
                title: element.title,
                id: element.id,
                picture: appContext.HOST + element.cover?.url,
                username: element.username}))
            setProducts(tmpProducts);
            setLoadingProduct(false);
        }).catch(() => {
            setLoadingProduct(false);
            dispatch(isError('Si è verificato un errore nella ricezione della lista dei prodotti. Riprovare ad aggiornare la pagina.'));
        })
    };

    useEffect(() => {
        if (firstAccess) {
            navigate(appContext.routes.wizard);
        } else {
            appContext.setFavoritesFollowing();
            getProducts();
        }
    }, []);

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
                <br/>
                <Row>
                    <GridSystem loadingProducts={loadingProduct} isProducts={true} products={products} isUser={false}/>
                </Row>
                <br/>
                <br/>
            </Container>
        </>
    );
}
