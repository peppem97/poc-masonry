import React from "react";
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
import Signin from "./Signin";
import ProtectedRoute from "./ProtectedRoute";
import {useDispatch, useSelector} from 'react-redux'
import {isNotError} from "./store/error";
import Signup from "./Signup";
import UnprotectedRoute from "./UnprotectedRoute";

export default function App() {
    const loading = useSelector((state) => state.loading.value);
    const errorState = useSelector((state) => state.error.value);
    const errorMessage = useSelector((state) => state.error.message);
    const dispatch = useDispatch();
    const routes = {
        signin: '/masonry/welcome',
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

    return (
        <>
            <GlobalContext.Provider value={appContext}>
                <Router>
                    <TopToolbar/>
                    <Routes>
                        <Route exact path="/" element={<Navigate to={routes.signin}/>}/>
                        <Route exact path="/masonry" element={<Navigate to={routes.signin}/>}/>
                        <Route path={routes.signin} element={<UnprotectedRoute><Signin/></UnprotectedRoute>}/>
                        <Route path={routes.signup} element={<UnprotectedRoute><Signup/></UnprotectedRoute>}/>
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