import {Navigate} from 'react-router-dom';
import React, {useContext} from "react";
import {useSelector} from "react-redux";
import GlobalContext from "./GlobalContext";

export default function UnprotectedRoute({ children }) {
    const appContext = useContext(GlobalContext);
    const token = useSelector((state) => state.token.value);
    const email = useSelector((state) => state.user.email);
    const username = useSelector((state) => state.user.username);
    return (!token || !username || !email) ? children : <Navigate to={appContext.routes.home}/>;
}