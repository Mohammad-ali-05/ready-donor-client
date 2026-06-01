import React from "react";
import { Navigate } from "react-router";
import { useUserRole } from "../contexts/UserProvider";

const RoleRoute = ({ children, allowedRoles = [] }) => {
    const { role } = useUserRole();

    if (!role) {
        return null; 
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default RoleRoute;
