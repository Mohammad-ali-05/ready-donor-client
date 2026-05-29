import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import BloodDonations from "../pages/bloodDonations/BloodDonations";
import Funding from "../pages/funding/Funding";
import FindDonor from "../pages/findDonor/FindDonor";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import PrivateRoutes from "./PrivateRoutes";
import UserProvider from "../contexts/UserProvider";

const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <UserProvider>
                <MainLayout></MainLayout>
            </UserProvider>
        ),
        children: [
            {
                index: true,
                element: <Navigate to={"/home"}></Navigate>,
            },
            {
                path: "home",
                element: <Home></Home>,
            },
            {
                path: "find-donor",
                element: <FindDonor></FindDonor>,
            },
            {
                path: "blood-donations",
                element: <BloodDonations></BloodDonations>,
            },
            {
                path: "funding",
                element: (
                    <PrivateRoutes>
                        <Funding></Funding>
                    </PrivateRoutes>
                ),
            },
        ],
    },
    {
        path: "/auth",
        element: (
            <UserProvider>
                <AuthLayout></AuthLayout>
            </UserProvider>
        ),
        children: [
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "register",
                element: <Register></Register>,
            },
        ],
    },
]);

export default routes;
