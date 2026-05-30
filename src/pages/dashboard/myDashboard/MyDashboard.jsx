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
            <div className="p-8 rounded-2xl bg-white shadow-md mb-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Welcome back{" "}
                    <span className="bg-linear-to-br from-[#B32346] to-[#46052D] bg-clip-text text-transparent">
                        {user.displayName}!
                    </span>
                </h1>
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
