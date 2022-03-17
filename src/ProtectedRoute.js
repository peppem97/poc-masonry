import {Navigate} from 'react-router-dom';
import React, {useContext} from "react";
import {useSelector} from "react-redux";
import GlobalContext from "./GlobalContext";

export default function ProtectedRoute({ children }) {
    const stateLogin = useSelector((state) => state.login.value);
    return stateLogin ? children : <Navigate to="/about"/>;
}