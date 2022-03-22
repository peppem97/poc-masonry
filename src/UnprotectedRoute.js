import {Navigate} from 'react-router-dom';
import React, {useContext} from "react";
import {useSelector} from "react-redux";
import GlobalContext from "./GlobalContext";

export default function UnprotectedRoute({ children }) {
    const appContext = useContext(GlobalContext);
    const stateLogin = useSelector((state) => state.token.value);
    return !stateLogin ? children : <Navigate to={appContext.routes.home}/>;
}