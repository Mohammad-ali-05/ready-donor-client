import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading";
import DonationCard from "../../components/DonationCard";

const BloodDonations = () => {
    // React hooks
    const [allDonations, setAllDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [donorCount, setDonorCount] = useState(0);

    // States for pagination
    const [donationRequestCount, setDonationRequestCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 12;

    // Custom hooks
    const axios = useAxios();

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                setIsLoading(true);

                const donations = await axios.get("/pending-blood-donations", {
                    params: {
                        limit,
                        skip: currentPage * limit,
                    },
                });

                const count = donations.data.donationsCount;

                setAllDonations(donations.data.donations);
                setDonorCount(donations.data.donationsCount);
                setDonationRequestCount(count);
                setTotalPage(Math.ceil(count / limit));
            } catch (error) {
                console.error("Failed to fetch donations:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDonations();
    }, [axios, currentPage]);

    return (
        <section className="min-h-screen bg-base-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-base-content text-2xl font-semibold md:text-3xl text-center mb-5">
                        Find Blood Donors
                    </h1>
                    <p className="md:text-lg font-medium text-base-content/60 max-w-250 w-full text-center mx-auto">
                        Search our database of registered blood donors. Connect
                        with donors who match your requirements.
                    </p>
                </div>
            </div>
            <>
                {isLoading ? (
                    <div className="bg-base-100 flex justify-center items-center shadow-md rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-55 w-full">
                        <Loading></Loading>
                    </div>
                ) : donorCount ? (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {allDonations?.map((donation) => (
                            <DonationCard
                                key={donation._id}
                                donation={donation}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <p className="bg-base-100 rounded-lg shadow-md p-6 mb-8 text-center py-30 text-base-content/50">
                            No donation requests found
                        </p>
                    </div>
                )}
            </>
            {/* If donation count is lower then the limit, hide pagination */}
            {donationRequestCount <= limit || (
                <div className="flex justify-center flex-wrap gap-3 py-10">
                    {currentPage > 0 && (
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="btn hover:text-white hover:bg-linear-to-r hover:from-[#B32346] hover:to-[#46052D]">
                            Prev
                        </button>
                    )}
                    {[
                        ...Array(totalPage)
                            .keys()
                            .map((i) => (
                                <button
                                    onClick={() => setCurrentPage(i)}
                                    key={i}
                                    className={`btn rounded-lg ${currentPage === i && "text-white bg-linear-to-r from-[#B32346] to-[#46052D] hover:opacity-85"}`}>
                                    {i + 1}
                                </button>
                            )),
                    ]}
                    {currentPage + 1 < totalPage && (
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="btn hover:text-white hover:bg-linear-to-r hover:from-[#B32346] hover:to-[#46052D]">
                            Next
                        </button>
                    )}
                </div>
            )}
        </section>
    );
};

export default BloodDonations;
