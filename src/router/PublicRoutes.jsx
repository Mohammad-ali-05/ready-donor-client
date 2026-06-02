import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PublicRoutes = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    /* If user is not available redirect to desired page or home page */
    if (user && user?.photoURL) {
        return (
            <Navigate
                to={location.state || "/"}
                state={location.pathname}></Navigate>
        );
    }

    /* If user not available return children */
    return children;
};

export default PublicRoutes;
