import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import BloodDonations from "../pages/bloodDonations/BloodDonations";
import Funding from "../pages/funding/Funding";
import FindDonor from "../pages/findDonor/FindDonor";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/login/Login";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
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
                element: <Funding></Funding>,
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "login",
                element: <Login></Login>,
            },
        ],
    },
]);

export default routes;
