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

    const routes = {
        about: '/masonry/about',
        home: '/masonry/home',
        signup: '/masonry/signup',
        user: '/masonry/user',
        product: '/masonry/product',
        noUser: '/masonry/no-user'
    }

    const appContext = {
        routes: routes,
        MAX_PICTURES_CAROUSEL: 3,
        MAX_PICTURES_PRODUCT: 9,
        COMPRESSION_QUALITY: 0.3,
        HOST: "http://zion.datafactor.it:40505",
        ENDPOINT_SHOPS: "http://zion.datafactor.it:40505/shops",
        ENDPOINT_PRODUCTS: "http://zion.datafactor.it:40505/products",
        ENDPOINT_EXAMPLES: "http://zion.datafactor.it:40505/image-uploadeds",
        ENDPOINT_AUTH: "http://zion.datafactor.it:40505/auth/local",
        ENDPOINT_REGISTER: "http://zion.datafactor.it:40505/auth/local/register"
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
                        <Route exact path="/" element={<Navigate to={routes.about}/>}/>
                        <Route exact path={routes.about} element={<About/>}/>
                        <Route exact path={routes.signup} element={<Signup/>}/>
                        <Route path={routes.home} element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                        <Route path={routes.user + '/:username'} element={<ProtectedRoute><User/></ProtectedRoute>}/>
                        <Route path={routes.product + '/:id'} element={<ProtectedRoute><Product/></ProtectedRoute>}/>
                        <Route path={routes.noUser} element={<ProtectedRoute><ErrorNoUser/></ProtectedRoute>}/>
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