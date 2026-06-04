import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import DonationCard from "../../../components/DonationCard";
import { Link } from "react-router";
import { toast } from "react-toastify";

const LatestDonationRequest = () => {
    // React hook
    const [latestDonations, setLatestDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Custom hook
    const axios = useAxios();

    useEffect(() => {
        const fetchDonations = async () => {
            setIsLoading(true);
            try {
                const result = await axios.get(
                    "/blood-donations/latest-pending",
                );

                // console.log(result);

                setLatestDonations(result.data);
            } catch (error) {
                // console.log(error);

                toast.error(
                    error?.response?.data?.message ||
                        error?.message ||
                        "Something went wrong",
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchDonations();
    }, [axios]);

    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div>
                    <div className="mb-8">
                        <h1 className="text-gray-900 text-2xl font-semibold md:text-3xl text-center mb-5">
                            Find Latest Donation Requests
                        </h1>
                        <p className="md:text-lg font-medium text-gray-600 max-w-250 w-full text-center mx-auto">
                            Explore the latest blood donation requests submitted
                            by patients and families in need. Find requests that
                            match your blood group and location, and help make a
                            meaningful difference.
                        </p>
                    </div>
                </div>
                {isLoading ? (
                    <div className="bg-white flex justify-center items-center shadow-lg rounded-xl py-40">
                        <Loading></Loading>
                    </div>
                ) : latestDonations.length ? (
                    <div className="px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {latestDonations?.map((donation) => (
                            <DonationCard
                                key={donation._id}
                                donation={donation}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <p className="bg-white rounded-xl shadow-sm p-6 mb-8 text-center py-30 text-gray-500">
                            No donation requests found
                        </p>
                    </div>
                )}
                <div className="flex justify-center items-center mt-10">
                    <Link to={"/blood-donations"}>
                        <button className="mt-4 px-8 h-11 rounded-lg bg-linear-to-r from-[#B32346] to-[#46052D] text-white font-medium flex items-center justify-center hover:opacity-90 transition">
                            All Donation Requests
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestDonationRequest;
