import { FaUsers } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import { GiBlood } from "react-icons/gi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
    // React hooks
    const [totalDonors, setTotalDonors] = useState(0);
    const [totalDonations, setTotalDonations] = useState(0);

    // Custom hooks
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const result = await axiosSecure.get("/dashboard-data");

                setTotalDonors(result.data.donorCount);
                setTotalDonations(result.data.donationCount);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDashboardData();
    }, [axiosSecure]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Total Donors
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-1">
                            {totalDonors}
                        </h2>
                    </div>

                    <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-xl">
                        <FaUsers />
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Total Funding
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-1">
                            ৳{"50000"}fake data
                        </h2>
                    </div>

                    <div className="w-12 h-12 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center text-green-600 text-xl">
                        <FaHandHoldingUsd />
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Blood Donation Requests
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-1">
                            {totalDonations}
                        </h2>
                    </div>

                    <div className="w-12 h-12 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600 text-xl">
                        <GiBlood />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
