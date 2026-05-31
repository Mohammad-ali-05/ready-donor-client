import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { GoDotFill } from "react-icons/go";
import DonateBloodModal from "./components/DonateBloodModal";

const BloodDonationDetails = () => {
    // React hooks
    const { id } = useParams();
    const [donationDetails, setDonationDetails] = useState(null);
    const [status, setStatus] = useState(null);
    const [updatedDonor, setUpdatedDonor] = useState(false);
    const modalRef = useRef(null);
    console.log(donationDetails);
    // Custom hooks
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchBloodDonationDetails = async () => {
            try {
                const result = await axiosSecure.get(`/blood-donation/${id}`);
                setDonationDetails(result.data);
                setStatus(result.data.status);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBloodDonationDetails();
    }, [axiosSecure, id, updatedDonor]);

    // Formate time function
    const formatTime = (t) => {
        if (!t) return;

        const [h, m] = t.split(":").map(Number);
        return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
    };

    // Formate date function
    const formatDate = (d) => {
        if (!d) return;

        return new Date(d).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Function to open modal
    const openModal = () => {
        modalRef.current?.showModal();
    };

    return (
        <div>
            <div className="max-w-3xl mx-auto px-4 py-8 pb-16">
                {/* Back link */}
                <a
                    href="#"
                    className="inline-flex items-center gap-1.5  text-sm font-medium text-gray-700  hover:text-[#46052D] mb-6 transition-colors no-underline">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to requests
                </a>

                {/* Page header */}
                <div className="flex items-start justify-between gap-4 mb-6 bg-white border shadow-sm border-gray-100 rounded-xl p-5 flex-wrap">
                    <div className="flex items-center gap-3">
                        <div className="w-13 h-13 shrink-0 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 font-semibold text-sm">
                            {donationDetails?.bloodGroup}
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900 leading-snug">
                                Blood request for{" "}
                                {donationDetails?.recipientName}
                            </h1>
                            <p className="text-sm font-medium text-gray-700 mt-0.5">
                                Requested by {donationDetails?.requesterName}{" "}
                                <GoDotFill className="inline text-xs" />{" "}
                                {donationDetails?.upazilaName},{" "}
                                {donationDetails?.districtName}
                            </p>
                        </div>
                    </div>
                    {status === "pending" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600 border border-yellow-100 self-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                            Pending
                        </span>
                    ) : status === "inprogress" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100 self-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            In Progress
                        </span>
                    ) : status === "done" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-100 self-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Done
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100 self-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Canceled
                        </span>
                    )}
                </div>

                {/* Recipient & blood details card */}
                <div className="bg-white border shadow-sm border-gray-100 rounded-xl p-5 mb-4">
                    <p className="text-sm font-medium text-gray-700 uppercase tracking-widest mb-4">
                        Recipient & blood details
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                        {/* Left column */}
                        <div>
                            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-gray-700 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.75}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                <div>
                                    <p className="text-[12px] text-gray-700">
                                        Recipient name
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {donationDetails?.recipientName}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-red-400 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.75}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 2C6 9 4 13 4 16a8 8 0 0016 0c0-3-2-7-8-14z"
                                    />
                                </svg>
                                <div>
                                    <p className="text-[12px] text-gray-700">
                                        Blood group
                                    </p>
                                    <p className="text-sm font-semibold text-red-500">
                                        {donationDetails?.bloodGroup}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-gray-700 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.75}>
                                    <rect
                                        x="3"
                                        y="4"
                                        width="18"
                                        height="18"
                                        rx="2"
                                        ry="2"
                                    />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <div>
                                    <p className="text-[12px] text-gray-700">
                                        Donation date
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {formatDate(
                                            donationDetails?.donationDate,
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 py-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-gray-700 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.75}>
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <div>
                                    <p className="text-[12px] text-gray-700">
                                        Donation time
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {formatTime(
                                            donationDetails?.donationTime,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Right column */}
                        <div>
                            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-gray-700 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.75}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1M9 21v-3a3 3 0 016 0v3"
                                    />
                                </svg>
                                <div>
                                    <p className="text-[12px] text-gray-700">
                                        Hospital
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {donationDetails?.hospitalName}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-gray-700 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.75}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <div>
                                    <p className="text-[12px] text-gray-700">
                                        Division
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {donationDetails?.divisionName}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-gray-700 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.75}>
                                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                                </svg>
                                <div>
                                    <p className="text-[12px] text-gray-700">
                                        District / Upazila
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {donationDetails?.districtName} ·{" "}
                                        {donationDetails?.upazilaName}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 py-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-gray-700 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.75}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                    />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                <div>
                                    <p className="text-[12px] text-gray-700">
                                        Full address
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {donationDetails?.fullAddress}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Donor info */}
                {(status === "inprogress" || status === "done") && (
                    <div className="bg-white border shadow-sm border-gray-100 rounded-xl p-5 mb-4"></div>
                )}

                {/* Request message card */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 mb-4">
                    <p className="text-sm font-medium text-gray-700 uppercase tracking-widest mb-4">
                        Request message
                    </p>
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3 leading-relaxed">
                        {donationDetails?.requestMessage}
                    </p>
                    <div className="flex items-center gap-1.5 mt-4 text-xs text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.75}>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                        Posted by {donationDetails?.requesterName}
                        <span className="text-gray-700">
                            <GoDotFill className="" />
                        </span>
                        {formatDate(donationDetails?.createdAt)}
                    </div>
                </div>

                {/* Donation button to open donation modal */}
                {status === "pending" && (
                    <button
                        onClick={openModal}
                        className={`text-lg text-white font-semibold rounded-md bg-linear-to-r from-[#B32346] to-[#46052D] h-12 hover:opacity-85 w-full mt-6 py-3.5 flex items-center justify-center gap-2 border transition-opacity`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.75}>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        Donate Blood
                    </button>
                )}
            </div>
            <DonateBloodModal
                modalRef={modalRef}
                donationDetails={donationDetails}
                updatedDonor={updatedDonor}
                setUpdatedDonor={setUpdatedDonor}></DonateBloodModal>
        </div>
    );
};

export default BloodDonationDetails;
