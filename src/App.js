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
import AlertDialog from "./dialogs/AlertDialog";
import Welcome from "./Welcome";
import ProtectedRoute from "./ProtectedRoute";
import {useDispatch, useSelector} from 'react-redux'
import {isNotError, isNotNotice} from "./store/dialogs";
import UnprotectedRoute from "./UnprotectedRoute";
import Wizard from "./Wizard";

export default function App() {
    const host = "http://zion.datafactor.it:40505"
    const loading = useSelector((state) => state.loading.value);
    const errorState = useSelector((state) => state.dialogs.error);
    const message = useSelector((state) => state.dialogs.message);
    const noticeState = useSelector((state) => state.dialogs.notice);
    const dispatch = useDispatch();
    const routes = {
        welcome: '/masonry/welcome',
        home: '/masonry/home',
        user: '/masonry/user',
        wizard: '/masonry/wizard',
        product: '/masonry/product',
        noUser: '/masonry/no-user'
    }
    const appContext = {
        routes: routes,
        MAX_PICTURES_CAROUSEL: 3,
        MAX_PICTURES_PRODUCT: 8,
        COMPRESSION_QUALITY: 0.3,
        HOST: host,
        ENDPOINT_SHOPS: host + "/shops",
        ENDPOINT_CLIENTS: host + "/clients",
        ENDPOINT_PRODUCTS: host + "/products",
        ENDPOINT_EXAMPLES: host + "/image-uploadeds",
        ENDPOINT_PENDENTS: host + "/pendents",
        ENDPOINT_AUTH: host + "/auth/local",
        ENDPOINT_REGISTER: host + "/auth/local/register"
    };

    return (
        <>
            <GlobalContext.Provider value={appContext}>
                <Router>
                    <TopToolbar/>
                    <Routes>
                        <Route exact path="/" element={<Navigate to={routes.welcome}/>}/>
                        <Route exact path="/masonry" element={<Navigate to={routes.welcome}/>}/>
                        <Route path={routes.welcome} element={<UnprotectedRoute><Welcome/></UnprotectedRoute>}/>
                        <Route path={routes.wizard} element={<ProtectedRoute><Wizard/></ProtectedRoute>}/>
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
                <AlertDialog
                    title={'Attenzione!'}
                    open={errorState}
                    errorMessage={message}
                    onClose={() => {dispatch(isNotError())}}/>
                <AlertDialog
                    title={null}
                    open={noticeState}
                    errorMessage={message}
                    onClose={() => {dispatch(isNotNotice())}}/>
            </GlobalContext.Provider>
        </>
    );
}