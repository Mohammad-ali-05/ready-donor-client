import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";
import Swal from "sweetalert2";

const DonorLatestRequest = () => {
    // React hooks
    const [donationRequests, setDonationRequests] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [refetch, setRefetch] = useState(false);

    /* Custom hooks */
    const axiosSecure = useAxiosSecure();

    // fetch donation requests
    useEffect(() => {
        const fetchDonationRequests = async () => {
            try {
                setLoadingData(true);

                const result = await axiosSecure.get("/blood-donation/latest");
                setDonationRequests(result.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingData(false);
            }
        };
        fetchDonationRequests();
    }, [axiosSecure, refetch]);

    // Convert date to 12 hour formate
    const formatTime = (time24) => {
        const [hourStr, minute] = time24.split(":");
        let hour = parseInt(hourStr, 10);

        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12;
        if (hour === 0) hour = 12;

        return `${hour}:${minute} ${ampm}`;
    };

    const handleRequestDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed)
                axiosSecure
                    .delete(`/blood-donation/${id}`)
                    .then((result) => {
                        console.log(result);
                        if (result.data.deletedCount) {
                            setRefetch(!refetch);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
                Recent Donation Requests 🩸
            </h2>

            {loadingData ? (
                <div className="flex justify-center items-center mt-20">
                    <Loading></Loading>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3">Recipient</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Time</th>
                                <th className="p-3">Blood</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Donor</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {donationRequests.map((req) => (
                                <tr key={req._id} className="border-t">
                                    <td className="p-3">{req.recipientName}</td>

                                    <td className="p-3">
                                        {req.districtName}, {req.upazilaName}
                                    </td>

                                    <td className="p-3">
                                        {req.donationDate.split("-").join("/")}
                                    </td>
                                    <td className="p-3">
                                        {formatTime(req?.donationTime)}
                                    </td>
                                    <td className="p-3 font-semibold">
                                        {req.bloodGroup}
                                    </td>

                                    {/* Status */}
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 text-xs rounded ${
                                                req.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : req.status ===
                                                        "inprogress"
                                                      ? "bg-blue-100 text-blue-700"
                                                      : req.status === "done"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                            }`}>
                                            {req.status}
                                        </span>
                                    </td>

                                    {/* donor info only if inprogress */}
                                    <td className="p-3">
                                        {req.status === "inprogress" ? (
                                            <div className="text-xs text-gray-500 mt-1">
                                                {req.donorName} (
                                                {req.donorEmail})
                                            </div>
                                        ) : (
                                            <div className="text-xs text-gray-500 mt-1">
                                                {"No donor found"}
                                            </div>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="p-3 grid grid-cols-1 lg:grid-cols-3 gap-2">
                                        {/* View */}
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/dashboard/donation/${req._id}`,
                                                )
                                            }
                                            className="px-2 py-1 w-full text-xs bg-gray-100 rounded">
                                            View
                                        </button>

                                        {/* Edit and delete button when request pending */}
                                        {req.status === "pending" && (
                                            <>
                                                {/* Edit */}
                                                <Link
                                                    to={`/dashboard/my-donation-requests/edit/${req._id}`}>
                                                    <button className="px-2 w-full py-1 text-xs bg-blue-100 text-blue-700 rounded">
                                                        Edit
                                                    </button>
                                                </Link>
                                                {/* Delete */}
                                                <button
                                                    onClick={() =>
                                                        handleRequestDelete(
                                                            req._id,
                                                        )
                                                    }
                                                    className="px-2 py-1 w-full text-xs bg-red-100 text-red-700 rounded">
                                                    Delete
                                                </button>
                                            </>
                                        )}

                                        {/* Done or cancel button when request inprogress */}
                                        {req.status === "inprogress" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            req._id,
                                                            "done",
                                                        )
                                                    }
                                                    className="px-2 py-1 w-full text-xs bg-green-100 text-green-700 rounded">
                                                    Done
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            req._id,
                                                            "canceled",
                                                        )
                                                    }
                                                    className="px-2 py-1 w-full text-xs bg-red-100 text-red-700 rounded">
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* View All Button */}
            <div className="mt-4 text-right">
                <Link to={"/dashboard/my-donation-requests"}>
                    <button className="py-2 text-lg text-white font-semibold bg-linear-to-r rounded-md from-[#B32346] to-[#46052D] px-4 hover:opacity-85 ">
                        View My All Requests
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default DonorLatestRequest;
