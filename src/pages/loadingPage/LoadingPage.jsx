import React from "react";
import Loading from "../../components/Loading";

const LoadingPage = () => {
    return (
        <section className="flex justify-center min-h-[calc(100vh-64px)] items-center">
            <Loading></Loading>
        </section>
    );
};

export default LoadingPage;
