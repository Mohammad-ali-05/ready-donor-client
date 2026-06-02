import React from "react";
import { Navigate } from "react-router";
import useDbUser from "../hooks/useDbUser";

const RoleRoute = ({ children, allowedRoles = [] }) => {
    const { dbUser } = useDbUser();

    if (!dbUser?.role) {
        return null;
    }

    if (!allowedRoles.includes(dbUser?.role)) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default RoleRoute;
