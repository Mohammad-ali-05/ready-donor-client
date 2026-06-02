import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";

// Filter options
const statuses = ["all", "pending", "inprogress", "done", "canceled"];

const MyDonationRequest = () => {
    // React hooks
    const [donationRequests, setDonationRequests] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [refetch, setRefetch] = useState(false);

    // States for pagination
    const [donationRequestCount, setRequestDonationCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;

    // State for filter
    const [statusFilter, setStatusFilter] = useState("all");

    /* Custom hooks */
    const axiosSecure = useAxiosSecure();

    // fetch donation requests
    useEffect(() => {
        const fetchDonationRequests = async () => {
            try {
                setLoadingData(true);
                const result = await axiosSecure.get("/blood-donation", {
                    params: {
                        limit,
                        skip: currentPage * limit,
                        statusFilter,
                    },
                });

                const count = result.data.donationCount;

                setDonationRequests(result.data.donations);
                setRequestDonationCount(count);
                setTotalPage(Math.ceil(count / limit));
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingData(false);
            }
        };
        fetchDonationRequests();
    }, [axiosSecure, currentPage, statusFilter, refetch]);

    //  Convert date to 12 hour formate
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

    // handle Status Update
    const handleUpdateStatus = (id, status) => {
        Swal.fire({
            title: `Are you sure you want to ${
                status === "canceled"
                    ? "cancel this request?"
                    : "mark this request as completed?"
            }`,
            text: "You won't be able to revert this!",
            icon: status === "canceled" ? "warning" : "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText:
                status === "canceled" ? "Yes, cancel it!" : "Yes, complete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/blood-donation/update-status/${id}`, { status })
                    .then((result) => {
                        if (result.data.modifiedCount) {
                            setRefetch(!refetch);
                            Swal.fire({
                                title: "Update Status!",
                                text:
                                    status === "canceled"
                                        ? "Your donation request has been canceled"
                                        : "Your donation request has been completed successfully",
                                icon: "success",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
                My Donation Requests{" "}
                <span className="bg-linear-to-br from-[#B32346] to-[#46052D] bg-clip-text text-transparent">
                    {donationRequestCount}
                </span>{" "}
                🩸
            </h2>{" "}
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => {
                            setStatusFilter(status);
                            setCurrentPage(0);
                        }}
                        className={`px-4 py-2 rounded-md border text-sm ${
                            statusFilter === status
                                ? "text-white bg-linear-to-r from-[#B32346] to-[#46052D] hover:opacity-85"
                                : "hover:text-white hover:bg-linear-to-r hover:from-[#B32346] hover:to-[#46052D]"
                        }`}>
                        {status}
                    </button>
                ))}
            </div>
            {loadingData ? (
                <div className="flex justify-center items-center my-20">
                    <Loading></Loading>
                </div>
            ) : (
                <>
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
                                        <td className="p-3">
                                            {req.recipientName}
                                        </td>

                                        <td className="p-3">
                                            {req.districtName},{" "}
                                            {req.upazilaName}
                                        </td>

                                        <td className="p-3">
                                            {req.donationDate
                                                .split("-")
                                                .join("/")}
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
                                                          : req.status ===
                                                              "done"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                }`}>
                                                {req.status}
                                            </span>
                                        </td>

                                        {/* donor info only if inprogress and done */}
                                        <td className="p-3">
                                            {req.status === "inprogress" ||
                                            req.status === "done" ? (
                                                <div className="text-sm text-gray-500 mt-1">
                                                    <p>
                                                        <span className="font-semibold">
                                                            Donor Name:
                                                        </span>{" "}
                                                        {req.donorName}
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">
                                                            Donor Email:
                                                        </span>{" "}
                                                        {req.donorEmail}
                                                    </p>
                                                </div>
                                            ) : req.status === "canceled" ? (
                                                <div className="text-xs text-red-400 mt-1">
                                                    {
                                                        "Request has been canceled"
                                                    }
                                                </div>
                                            ) : (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {"No donor found"}
                                                </div>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
                                            {/* View */}
                                            <Link
                                                to={`/dashboard/blood-donation/details/${req._id}`}
                                                className="col-span-2">
                                                <button className="px-2 py-1 w-full text-xs bg-gray-100 rounded">
                                                    View
                                                </button>
                                            </Link>

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
                                                    handleRequestDelete(req._id)
                                                }
                                                className="px-2 py-1 w-full text-xs bg-red-100 text-red-700 rounded">
                                                Delete
                                            </button>

                                            {/* Done or cancel button when request inprogress */}
                                            {req.status === "inprogress" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateStatus(
                                                                req._id,
                                                                "done",
                                                            )
                                                        }
                                                        className="px-2 py-1 w-full text-xs bg-green-100 text-green-700 rounded">
                                                        Done
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleUpdateStatus(
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
                                {donationRequestCount === 0 && (
                                    <tr>
                                        <td
                                            colSpan={"8"}
                                            className="text-center py-20 text-gray-500">
                                            No donation requests found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* If donation count is lower then the limit, hide pagination */}
                    {donationRequestCount <= limit || (
                        <div className="flex justify-center flex-wrap gap-3 py-10">
                            {currentPage > 0 && (
                                <button
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
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
                                            className={`btn rounded-md ${currentPage === i && "text-white bg-linear-to-r from-[#B32346] to-[#46052D] hover:opacity-85"}`}>
                                            {i + 1}
                                        </button>
                                    )),
                            ]}
                            {currentPage + 1 < totalPage && (
                                <button
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                    className="btn hover:text-white hover:bg-linear-to-r hover:from-[#B32346] hover:to-[#46052D]">
                                    Next
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyDonationRequest;
