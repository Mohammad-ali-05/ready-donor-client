
import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                index: "home",
                element: <Navigate to={"/home"}></Navigate>,
            },
        ],
    },
]);

export default routes;
