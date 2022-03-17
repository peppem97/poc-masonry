import {Navigate} from 'react-router-dom';
import React, {useContext} from "react";
import {useSelector} from "react-redux";
import GlobalContext from "./GlobalContext";

export default function ProtectedRoute({ children }) {
    let token = localStorage.getItem('token');
    let appContext = useContext(GlobalContext);
    // let stateLogin = appContext.jwtIsValid(token);
    // console.log(stateLogin)

    const stateLogin = useSelector((state) => state.login.value);
    return stateLogin ? children : <Navigate to="/about"/>;
}