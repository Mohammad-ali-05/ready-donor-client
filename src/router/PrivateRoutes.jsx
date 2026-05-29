import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
    /* React hooks */
    const location = useLocation();

    /* Custom hooks */
    const { user } = useAuth();

    /* If user not available navigate use to login page */
    if (!user)
        return (
            <Navigate to={"/auth/login"} state={location?.pathname}></Navigate>
        );
    /* If user available return children */
    if (user) return <>{children}</>;
};

export default PrivateRoutes;
