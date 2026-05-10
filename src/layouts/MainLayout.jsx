import React from 'react';
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    return (
        <>
            <header>
                <Navbar></Navbar>
            </header>
            <>
                <Outlet></Outlet>
            </>
        </>
    );
};

export default MainLayout;
