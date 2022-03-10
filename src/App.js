import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import User from "./User";
import TopToolbar from "./TopToolbar";
import Home from "./Home";
import GlobalContext from "./GlobalContext";
import axios from "axios";
import Error404 from "./Error404";
import ErrorNoUser from "./ErrorNoUser";
import {Backdrop, CircularProgress} from "@mui/material";
import Product from "./Product";

export default function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [disabledIncrease, setDisabledIncrease] = useState(false);
    const [disabledDecrease, setDisabledDecrease] = useState(false);
    const [columnWidth, setColumnWidth] = useState(200);
    const [loading, setLoading] = useState(false);
    const appContext = {
        token: token,
        disabledIncrease: disabledIncrease,
        disabledDecrease: disabledDecrease,
        columnWidth: columnWidth,
        loading: loading,
        setLoadingTrue: () => {setLoading(true)},
        setLoadingFalse: () => {setLoading(false)},
        qualityPictures: 0.1,
        host: "http://zion.datafactor.it:40505",
        hostShops: "http://zion.datafactor.it:40505/shops",
        hostProducts: "http://zion.datafactor.it:40505/products",
        hostExample: "http://zion.datafactor.it:40505/image-uploadeds",
        hostSignin: "http://zion.datafactor.it:40505/auth/local"
    };

    const getNewToken = () => {
        appContext.setLoadingTrue();
        let data = {identifier: 'prova@prova.it', password: 'provaprova'};
        axios.post(appContext.hostSignin, data).then((response) => {
            localStorage.setItem('token', response.data.jwt);
            setToken(response.data.jwt);
            appContext.setLoadingFalse();
        }).catch((error) => {
        })
    };

    const checkIncreaseDecrease = () => {
        if (columnWidth >= 500) {
            setDisabledIncrease(true);
            setDisabledDecrease(false);
            return;
        }

        if (columnWidth <= 250) {
            setDisabledIncrease(false);
            setDisabledDecrease(true);
            return;
        }
        setDisabledIncrease(false);
        setDisabledDecrease(false);
    };

    const increaseColumnsSize = () => {
        checkIncreaseDecrease();

        if (columnWidth >= 500) {
            setColumnWidth(columnWidth);
        } else {
            setColumnWidth(columnWidth + 50);
        }
    };

    const decreaseColumnsSize = () => {
        checkIncreaseDecrease();

        if (columnWidth <= 250) {
            setColumnWidth(columnWidth);
        } else {
            setColumnWidth(columnWidth - 50);
        }
    };

    return (
        <>
            <GlobalContext.Provider value={appContext}>
                <Router>
                    <TopToolbar increaseColumnsSize={increaseColumnsSize}
                                decreaseColumnsSize={decreaseColumnsSize}
                                getNewToken={getNewToken}/>
                    <Routes>
                        <Route exact path="/" element={<Navigate to="/home" />}/>
                        <Route exact path='/home' element={<Home/>}/>
                        <Route exact path='/user/:username' element={<User/>}/>
                        <Route exact path='/product/:id' element={<Product/>}/>
                        <Route exact path='/no-user' element={<ErrorNoUser/>}/>
                        <Route exact path='*' element={<Error404/>}/>
                    </Routes>
                </Router>
                <Backdrop
                    sx={{ color: '#fff', zIndex: '999' }}
                    open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </GlobalContext.Provider>
        </>
    );
}