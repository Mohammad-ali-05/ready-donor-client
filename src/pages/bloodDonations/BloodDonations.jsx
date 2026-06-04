import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading";
import DonationCard from "../../components/DonationCard";

const BloodDonations = () => {
    // React hooks
    const [allDonations, setAllDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [donorCount, setDonorCount] = useState(0);

    // Custom hooks
    const axios = useAxios();

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                setIsLoading(true);

                const donations = await axios.get("/pending-blood-donations");

                setAllDonations(donations.data.donations);
                setDonorCount(donations.data.donationsCount);
            } catch (error) {
                console.error("Failed to fetch donations:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDonations();
    }, [axios]);

    return (
        <section className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-gray-900 text-2xl font-semibold md:text-3xl text-center mb-5">
                        Find Blood Donors
                    </h1>
                    <p className="md:text-lg font-medium text-gray-600 max-w-250 w-full text-center mx-auto">
                        Search our database of registered blood donors. Connect
                        with donors who match your requirements.
                    </p>
                </div>
            </div>
            {isLoading ? (
                <div className="bg-white flex justify-center items-center shadow-sm rounded-xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-55 w-full">
                    <Loading></Loading>
                </div>
            ) : donorCount ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {allDonations?.map((donation) => (
                        <DonationCard key={donation._id} donation={donation} />
                    ))}
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <p className="bg-white rounded-xl shadow-sm p-6 mb-8 text-center py-30 text-gray-500">
                        No donation requests found
                    </p>
                </div>
            )}
        </section>
    );
};

export default BloodDonations;
