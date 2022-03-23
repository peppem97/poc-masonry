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
import AlertDialog from "./dialogs/AlertDialog";
import Welcome from "./Welcome";
import ProtectedRoute from "./ProtectedRoute";
import {useDispatch, useSelector} from 'react-redux'
import {isNotError, isNotNotice} from "./store/dialogs";
import Signup from "./Signup";
import UnprotectedRoute from "./UnprotectedRoute";
import Wizard from "./Wizard";

export default function App() {
    const loading = useSelector((state) => state.loading.value);
    const errorState = useSelector((state) => state.dialogs.error);
    const message = useSelector((state) => state.dialogs.message);
    const noticeState = useSelector((state) => state.dialogs.notice);
    const dispatch = useDispatch();
    const routes = {
        welcome: '/masonry/welcome',
        home: '/masonry/home',
        signup: '/masonry/signup',
        user: '/masonry/user',
        wizard: '/masonry/wizard',
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
        ENDPOINT_PENDENTS: "http://zion.datafactor.it:40505/pendents",
        ENDPOINT_AUTH: "http://zion.datafactor.it:40505/auth/local",
        ENDPOINT_REGISTER: "http://zion.datafactor.it:40505/auth/local/register"
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
                        <Route path={routes.signup} element={<UnprotectedRoute><Signup/></UnprotectedRoute>}/>
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