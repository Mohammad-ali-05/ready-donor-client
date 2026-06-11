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
import DashboardLayout from "../layouts/DashboardLayout";
import MyDashboard from "../pages/dashboard/myDashboard/MyDashboard";
import MyDonationRequest from "../pages/dashboard/myDonationRequest/MyDonationRequest";
import CreateDonationRequest from "../pages/dashboard/createDonationRequest/CreateDonationRequest";
import PublicRoutes from "./PublicRoutes";
import EditDonationRequest from "../pages/dashboard/editDonationRequest/EditDonationRequest";
import BloodDonationDetails from "../pages/dashboard/bloodDonationDetails/BloodDonationDetails";
import RoleRoute from "./RoleRoutes";
import AllUsers from "../pages/dashboard/allUsers/AllUsers";
import AllDonationRequests from "../pages/dashboard/allDoantionRequests/AllDonationRequests";
import NotFound from "../pages/error/NotFound";
import Profile from "../pages/dashboard/profile/Profile";

const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <UserProvider>
                <MainLayout></MainLayout>
            </UserProvider>
        ),
        errorElement: <NotFound></NotFound>,
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
                path: "blood-donations/details/:id",
                element: <BloodDonationDetails></BloodDonationDetails>,
            },
            {
                path: "funding",
                element: (
                    <PrivateRoutes>
                        <Funding></Funding>
                    </PrivateRoutes>
                ),
            },
            {
                path: "dashboard",
                element: (
                    <PrivateRoutes>
                        <DashboardLayout></DashboardLayout>
                    </PrivateRoutes>
                ),
                children: [
                    /* All user routes */
                    {
                        index: true,
                        element: <Navigate to={"my-dashboard"}></Navigate>,
                    },
                    {
                        path: "profile",
                        element: <Profile></Profile>,
                    },
                    {
                        path: "my-dashboard",
                        element: <MyDashboard></MyDashboard>,
                    },
                    {
                        path: "my-donation-requests",
                        element: (
                            <RoleRoute allowedRoles={["admin", "donor"]}>
                                <MyDonationRequest></MyDonationRequest>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: "my-donation-requests/edit/:id",
                        element: (
                            <RoleRoute allowedRoles={["admin", "donor"]}>
                                <EditDonationRequest></EditDonationRequest>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: "create-donation-request",
                        element: (
                            <RoleRoute allowedRoles={["admin", "donor"]}>
                                <CreateDonationRequest></CreateDonationRequest>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: "all-users",
                        element: (
                            <RoleRoute allowedRoles={["admin"]}>
                                <AllUsers></AllUsers>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: "all-blood-donation-requests",
                        element: (
                            <RoleRoute allowedRoles={["admin", "volunteer"]}>
                                <AllDonationRequests></AllDonationRequests>
                            </RoleRoute>
                        ),
                    },
                ],
            },
        ],
    },
    {
        path: "/auth",
        element: (
            <UserProvider>
                <PublicRoutes>
                    <AuthLayout></AuthLayout>
                </PublicRoutes>
            </UserProvider>
        ),
        errorElement: <NotFound></NotFound>,
        children: [
            {
                index: true,
                element: <Navigate to={"/auth/login"}></Navigate>,
            },

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
