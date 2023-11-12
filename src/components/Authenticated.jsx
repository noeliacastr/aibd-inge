import React from "react";
import {redirect} from 'react-router-dom'

const AuthenticatedComponent = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');

    if(isAuthenticated) {
        return <>{children}</>
    } else {
        return <redirect to="/"/>
    }
};

export default AuthenticatedComponent;
