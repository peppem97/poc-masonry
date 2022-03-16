import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import User from "./User";
import TopToolbar from "./TopToolbar";
import Home from "./Home";
import GlobalContext from "./GlobalContext";
import Error404 from "./Error404";
import ErrorNoUser from "./ErrorNoUser";
import {Backdrop, CircularProgress} from "@mui/material";
import Product from "./Product";
import ErrorDialog from "./dialogs/ErrorDialog";
import About from "./About";
import ProtectedRoute from "./ProtectedRoute";
import jwtDecode from "jwt-decode";
import {useDispatch} from 'react-redux'
import {isLogged, isNotLogged} from './store/login';
import {setToken} from "./store/token";

export default function App() {
    const [loading, setLoading] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const checkStateLogin = () => {
        let token = localStorage.getItem('token');
        try {
            if ((jwtDecode(token).exp * 1000 >= new Date().getTime())) {
                dispatch(isLogged());
                dispatch(setToken(token));
            } else {
                localStorage.removeItem('token');
                dispatch(isNotLogged());
            }
        } catch (e) {
            dispatch(isNotLogged());
        }
    };

    const appContext = {
        loading: loading,
        errorDialog: errorDialog,
        errorMessage: errorMessage,
        setLoading: (state) => {setLoading(state)},
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
        checkStateLogin();
    }, []);

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