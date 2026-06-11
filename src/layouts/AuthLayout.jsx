import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <>
            <header className="relative">
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
        </>
    );
};

export default AuthLayout;
