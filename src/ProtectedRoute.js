import {Navigate} from 'react-router-dom';
import React from "react";
import {useSelector} from "react-redux";

export default function ProtectedRoute({ children }) {
    const stateLogin = useSelector((state) => state.login.value);
    return stateLogin ? children : <Navigate to="/about"/>;
}