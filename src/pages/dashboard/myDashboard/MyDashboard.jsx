import React from "react";
import useAuth from "../../../hooks/useAuth";

const MyDashboard = () => {
    /* Custom hooks */
    const { user } = useAuth();

    return (
        <div>
            <div className="p-8 rounded-2xl bg-white shadow">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Welcome back{" "}
                    <span className="bg-linear-to-br from-[#B32346] to-[#46052D] bg-clip-text text-transparent">
                        {user.displayName}!
                    </span>
                </h1>
                <div></div>
            </div>
        </div>
    );
};

export default MyDashboard;
