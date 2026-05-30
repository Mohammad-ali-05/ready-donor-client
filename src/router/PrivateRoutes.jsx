import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import LoadingPage from "../pages/loadingPage/LoadingPage";

const PrivateRoutes = ({ children }) => {
    /* React hooks */
    const location = useLocation();

    /* Custom hooks */
    const { user, loading } = useAuth();

    /* While finding user show loading page */
    if (loading) {
        return <LoadingPage></LoadingPage>;
    }
    /* If user not available navigate use to login page */
    if (user) {
        return children;
    }

    /* If user is available redirect to desired page or home page */
    return <Navigate to={"/auth/login"} state={location.pathname}></Navigate>;
};

export default PrivateRoutes;
