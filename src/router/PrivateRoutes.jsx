import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import LoadingPage from "../pages/loadingPage/LoadingPage";
import useDbUser from "../hooks/useDbUser";

const PrivateRoutes = ({ children }) => {
    /* React hooks */
    const location = useLocation();

    /* Custom hooks */
    const { user, loading } = useAuth();
    const { userLoading } = useDbUser();

    /* While finding user show loading page */
    if (userLoading || loading) {
        return <LoadingPage></LoadingPage>;
    }
    /* If user not available navigate use to login page */
    if (!user) {
        return (
            <Navigate to={"/auth/login"} state={location.pathname}></Navigate>
        );
    }

    /* If user is available redirect to desired page or home page */
    return children;
};

export default PrivateRoutes;
