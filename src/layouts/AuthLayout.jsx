import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <>
            <header>
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
        </>
    );
};

export default AuthLayout;
