import React, {useEffect, useState} from "react";
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
import ErrorDialog from "./dialogs/ErrorDialog";
import About from "./About";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [disabledIncrease, setDisabledIncrease] = useState(false);
    const [disabledDecrease, setDisabledDecrease] = useState(false);
    const [columnWidth, setColumnWidth] = useState(200);
    const [loading, setLoading] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const getNewToken = () => {
        appContext.setLoadingTrue();
        let data = {identifier: 'prova@prova.it', password: 'provaprova'};
        axios.post(appContext.hostSignin, data).then((response) => {
            localStorage.setItem('token', response.data.jwt);
            setToken(response.data.jwt);
            appContext.setLoadingFalse();
        }).catch((error) => {
            appContext.setError('Errore di autenticazione. Riprovare.');
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

    const JWTisExpired = () => {
        // let decodedToken = jwt.decode(token, {complete: true});
        // let dateNow = new Date();
        // let isExpired;
        //
        // if (decodedToken.exp < dateNow.getTime())
        //     isExpired = true;
        //
        // console.log(isExpired);

    };

    const appContext = {
        token: token,
        disabledIncrease: disabledIncrease,
        disabledDecrease: disabledDecrease,
        increaseColumnsSize: increaseColumnsSize,
        decreaseColumnsSize: decreaseColumnsSize,
        getNewToken: getNewToken,
        columnWidth: columnWidth,
        loading: loading,
        errorDialog: errorDialog,
        errorMessage: errorMessage,
        setLoadingTrue: () => {
            setLoading(true)
        },
        setLoadingFalse: () => {
            setLoading(false)
        },
        setError: (message) => {
            setErrorMessage(message);
            setErrorDialog(true);
        },
        MAX_PICTURES_CAROUSEL: 3,
        MAX_PICTURES_PRODUCT: 9,
        qualityPictures: 0.3,
        host: "http://zion.datafactor.it:40505",
        hostShops: "http://zion.datafactor.it:40505/shops",
        hostProducts: "http://zion.datafactor.it:40505/products",
        hostExample: "http://zion.datafactor.it:40505/image-uploadeds",
        hostSignin: "http://zion.datafactor.it:40505/auth/local"
    };

    useEffect(() => {
    }, [])

    return (
        <>
            <GlobalContext.Provider value={appContext}>
                <Router>
                    <TopToolbar/>
                    <Routes>
                        <Route exact path="/" element={<Navigate to="/about"/>}/>
                        <Route exact path='/about' element={<About/>}/>
                        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                        <Route path="/user/:username" element={<ProtectedRoute><User/></ProtectedRoute>}/>
                        <Route path="/product/:id" element={<ProtectedRoute><Product/></ProtectedRoute>}/>
                        <Route path="/no-user" element={<ProtectedRoute><ErrorNoUser/></ProtectedRoute>}/>
                        <Route exact path='*' element={<Error404/>}/>
                    </Routes>
                </Router>
                <Backdrop
                    sx={{color: '#fff', zIndex: '999'}}
                    open={loading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <ErrorDialog
                    open={errorDialog}
                    errorMessage={errorMessage}
                    onClose={() => {
                        setErrorDialog(false);
                    }}/>
            </GlobalContext.Provider>
        </>
    );
}