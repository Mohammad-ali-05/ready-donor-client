import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <title>Page Not Found</title>
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
                <h1 className="text-8xl font-bold text-[#B32346]">404</h1>

                <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>

                <p className="text-base-content/50 mt-2 max-w-md">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 px-6 py-3 rounded-lg bg-[#B32346] text-white font-medium">
                    Go back
                </button>
            </div>
        </>
    );
};

export default NotFound;
