import React, {useEffect} from "react";
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
import {useDispatch, useSelector} from 'react-redux'
import {isLogged, isNotLogged} from './store/login';
import {setToken} from "./store/token";
import {isNotError} from "./store/error";
import Stepper from "./Signup";
import Signup from "./Signup";

export default function App() {
    const loading = useSelector((state) => state.loading.value);
    const errorState = useSelector((state) => state.error.value);
    const errorMessage = useSelector((state) => state.error.message);
    const dispatch = useDispatch();

    // const jwtIsValid = (token) => {
    //     return (jwtDecode(token).exp * 1000 >= new Date().getTime());
    // }

    const checkStateLogin = () => {
        let token = localStorage.getItem('token');

        try {
            if ((jwtDecode(token).exp * 1000 >= new Date().getTime())) {
                dispatch(setToken(token));
                dispatch(isLogged());
            } else {
                localStorage.removeItem('token');
                dispatch(isNotLogged());
            }
        } catch (e) {
            dispatch(isNotLogged());
        }
    };

    const appContext = {
        // jwtIsValid: (token) => { return jwtIsValid(token)},
        MAX_PICTURES_CAROUSEL: 3,
        MAX_PICTURES_PRODUCT: 9,
        COMPRESSION_QUALITY: 0.3,
        HOST: "http://zion.datafactor.it:40505",
        ENDPOINT_SHOPS: "http://zion.datafactor.it:40505/shops",
        ENDPOINT_PRODUCTS: "http://zion.datafactor.it:40505/products",
        ENDPOINT_EXAMPLES: "http://zion.datafactor.it:40505/image-uploadeds",
        ENDPOINT_AUTH: "http://zion.datafactor.it:40505/auth/local"
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
                        <Route exact path='/signup' element={<Signup/>}/>
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
                    open={errorState}
                    errorMessage={errorMessage}
                    onClose={() => {dispatch(isNotError())}}/>
            </GlobalContext.Provider>
        </>
    );
}