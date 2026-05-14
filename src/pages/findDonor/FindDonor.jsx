import React from "react";
import DonorFilter from "./components/DonorFilter";

const FindDonor = () => {
    return (
        <section className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-gray-900 text-4xl md:text-5xl text-center font-medium mb-5">
                        Find Blood Donors
                    </h1>
                    <p className="text-lg font-medium text-gray-600 max-w-250 w-full text-center mx-auto">
                        Search our database of registered blood donors. Connect
                        with donors who match your requirements.
                    </p>
                </div>
                {/* Find donor filter form */}
                <DonorFilter></DonorFilter>
            </div>
        </section>
    );
};

export default FindDonor;
