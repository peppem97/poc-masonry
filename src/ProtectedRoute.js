import {Navigate} from 'react-router-dom';
import React from "react";

export default function ProtectedRoute({ children }) {
    const auth = true;
    return auth ? children : <Navigate to="/about"/>;
}