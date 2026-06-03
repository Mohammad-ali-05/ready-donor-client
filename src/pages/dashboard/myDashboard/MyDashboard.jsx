import React, { useEffect, useMemo, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { Link } from "react-router";
import useDbUser from "../../../hooks/useDbUser";
import DonorLatestRequest from "./components/DonorLatestRequest";
import AdminDashboard from "./components/AdminDashboard";

const MyDashboard = () => {
    /* Custom hooks */
    const { user } = useAuth();
    const { dbUser } = useDbUser();

    return (
        <div>
            <div className="bg-gradient-to-r from-[#B32346] p-6 to-[#46052D] text-white rounded-lg mb-15 shadow-sm">
                <h1 className="text-2xl font-bold">Welcome Back👋</h1>
                <p className="text-2xl font-bold"> {user.displayName}</p>
            </div>
            {dbUser?.role === "donor" ? (
                /* 🩸 Donor Recent Requests */
                <DonorLatestRequest></DonorLatestRequest>
            ) : (
                /* Admin dashboard with all donor and user data */
                <AdminDashboard></AdminDashboard>
            )}
        </div>
    );
};

export default MyDashboard;
