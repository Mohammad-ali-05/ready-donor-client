import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { GoDotFill } from "react-icons/go";
import DonateBloodModal from "./components/DonateBloodModal";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const BloodDonationDetails = () => {
    // React hooks
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [donationDetails, setDonationDetails] = useState(null);
    const [status, setStatus] = useState(null);
    const [updatedDonor, setUpdatedDonor] = useState(false);
    const modalRef = useRef(null);

    // Custom hooks
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchBloodDonationDetails = async () => {
            try {
                const result = await axiosSecure.get(`/blood-donation/${id}`);
                setDonationDetails(result.data);
                setStatus(result.data.status);
            } catch (error) {
                // console.log(error);

                toast.error(
                    error?.response?.data?.message ||
                        error?.message ||
                        "Something went wrong",
                );
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
        if (!user) {
            toast.info("Login to donate blood");
            navigate("/auth/login", {
                state: location.pathname,
            });
        }
        modalRef.current?.showModal();
    };

    return (
        <>
            <title>Donation Details</title>
            <div>
                <div className="max-w-3xl mx-auto px-4 py-8 pb-16">
                    {/* Back link */}
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-1.5  text-sm font-medium text-base-content/60  hover:text-[#46052D] mb-6 transition-colors no-underline">
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
                    </button>

                    {/* Page header */}
                    <div className="flex items-start justify-between gap-4 mb-6 bg-base-100 border shadow-md border-gray-100 rounded-lg p-5 flex-wrap">
                        <div className="flex items-center gap-3">
                            <div className="w-13 h-13 shrink-0 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 font-semibold text-sm">
                                {donationDetails?.bloodGroup}
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-base-content leading-snug">
                                    Blood request for{" "}
                                    {donationDetails?.recipientName}
                                </h1>
                                <p className="text-sm font-medium text-base-content/60 mt-0.5">
                                    Requested by{" "}
                                    {donationDetails?.requesterName}{" "}
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
                    <div className="bg-base-100 border shadow-md border-gray-100 rounded-lg p-5 mb-4">
                        <p className="text-sm font-medium text-base-content/60 uppercase tracking-widest mb-4">
                            Recipient & blood details
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                            {/* Left column */}
                            <div>
                                <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-base-content/60 shrink-0"
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
                                        <p className="text-[12px] text-base-content/60">
                                            Recipient name
                                        </p>
                                        <p className="text-sm font-medium text-base-content">
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
                                        <p className="text-[12px] text-base-content/60">
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
                                        className="w-4 h-4 text-base-content/60 shrink-0"
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
                                        <p className="text-[12px] text-base-content/60">
                                            Donation date
                                        </p>
                                        <p className="text-sm font-medium text-base-content">
                                            {formatDate(
                                                donationDetails?.donationDate,
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 py-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-base-content/60 shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.75}>
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    <div>
                                        <p className="text-[12px] text-base-content/60">
                                            Donation time
                                        </p>
                                        <p className="text-sm font-medium text-base-content">
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
                                        className="w-4 h-4 text-base-content/60 shrink-0"
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
                                        <p className="text-[12px] text-base-content/60">
                                            Hospital
                                        </p>
                                        <p className="text-sm font-medium text-base-content">
                                            {donationDetails?.hospitalName}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-base-content/60 shrink-0"
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
                                        <p className="text-[12px] text-base-content/60">
                                            Division
                                        </p>
                                        <p className="text-sm font-medium text-base-content">
                                            {donationDetails?.divisionName}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-base-content/60 shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.75}>
                                        <polygon points="3 11 22 2 13 21 11 13 3 11" />
                                    </svg>
                                    <div>
                                        <p className="text-[12px] text-base-content/60">
                                            District / Upazila
                                        </p>
                                        <p className="text-sm font-medium text-base-content">
                                            {donationDetails?.districtName} ·{" "}
                                            {donationDetails?.upazilaName}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 py-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-base-content/60 shrink-0"
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
                                        <p className="text-[12px] text-base-content/60">
                                            Full address
                                        </p>
                                        <p className="text-sm font-medium text-base-content">
                                            {donationDetails?.fullAddress}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Donor info */}
                    {(status === "inprogress" || status === "done") && (
                        <div className="bg-base-100 border shadow-md border-gray-100 rounded-lg p-5 mb-4">
                            <p className="text-sm font-medium text-base-content/60 uppercase tracking-widest mb-4">
                                Donor details
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                {/* Donor name */}
                                <div className="flex items-center gap-3 py-3">
                                    <svg
                                        className="w-4 h-4 text-base-content/60 shrink-0"
                                        stroke="currentColor"
                                        fill="currentColor"
                                        stroke-width="0"
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 21h9.62a3.995 3.995 0 0 0 3.037-1.397l5.102-5.952a1 1 0 0 0-.442-1.6l-1.968-.656a3.043 3.043 0 0 0-2.823.503l-3.185 2.547-.617-1.235A3.98 3.98 0 0 0 9.146 11H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h5.146c.763 0 1.448.423 1.789 1.105l.447.895H7v2h6.014a.996.996 0 0 0 .442-.11l.003-.001.004-.002h.003l.002-.001h.004l.001-.001c.009.003.003-.001.003-.001.01 0 .002-.001.002-.001h.001l.002-.001.003-.001.002-.001.002-.001.003-.001.002-.001c.003 0 .001-.001.002-.001l.003-.002.002-.001.002-.001.003-.001.002-.001h.001l.002-.001h.001l.002-.001.002-.001c.009-.001.003-.001.003-.001l.002-.001a.915.915 0 0 0 .11-.078l4.146-3.317c.262-.208.623-.273.94-.167l.557.186-4.133 4.823a2.029 2.029 0 0 1-1.52.688H4v-6zM16 2h-.017c-.163.002-1.006.039-1.983.705-.951-.648-1.774-.7-1.968-.704L12.002 2h-.004c-.801 0-1.555.313-2.119.878C9.313 3.445 9 4.198 9 5s.313 1.555.861 2.104l3.414 3.586a1.006 1.006 0 0 0 1.45-.001l3.396-3.568C18.688 6.555 19 5.802 19 5s-.313-1.555-.878-2.121A2.978 2.978 0 0 0 16.002 2H16zm1 3c0 .267-.104.518-.311.725L14 8.55l-2.707-2.843C11.104 5.518 11 5.267 11 5s.104-.518.294-.708A.977.977 0 0 1 11.979 4c.025.001.502.032 1.067.485.081.065.163.139.247.222l.707.707.707-.707c.084-.083.166-.157.247-.222.529-.425.976-.478 1.052-.484a.987.987 0 0 1 .701.292c.189.189.293.44.293.707z"></path>
                                    </svg>
                                    <div>
                                        <p className="text-[12px] text-base-content/60">
                                            Donor name
                                        </p>
                                        <p className="text-sm font-medium text-base-content">
                                            {donationDetails?.donorName}
                                        </p>
                                    </div>
                                </div>

                                {/* Donor email */}
                                <div className="flex items-center gap-3 py-3">
                                    <svg
                                        className="w-4 h-4 text-base-content/60 shrink-0"
                                        stroke="currentColor"
                                        fill="currentColor"
                                        stroke-width="0"
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill="none"
                                            d="M0 0h24v24H0V0z"></path>
                                        <path d="M12 1.95c-5.52 0-10 4.48-10 10s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57v-1.43c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57v-1.43c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path>
                                    </svg>
                                    <div>
                                        <p className="text-[12px] text-base-content/60">
                                            Donor name
                                        </p>
                                        <p className="text-sm font-medium text-base-content">
                                            {donationDetails?.donorEmail}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Request message card */}
                    <div className="bg-base-100 border border-gray-100 rounded-lg shadow-md p-5 mb-4">
                        <p className="text-sm font-medium text-base-content/60 uppercase tracking-widest mb-4">
                            Request message
                        </p>
                        <p className="text-sm text-base-content/60 bg-base-200 rounded-lg px-4 py-3 leading-relaxed">
                            {donationDetails?.requestMessage}
                        </p>
                        <div className="flex items-center gap-1.5 mt-4 text-xs text-base-content/60">
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
                            <span className="text-base-content/60">
                                <GoDotFill className="" />
                            </span>
                            {formatDate(donationDetails?.createdAt)}
                        </div>
                    </div>

                    {/* Donation button to open donation modal */}
                    {status === "pending" && (
                        <button
                            onClick={openModal}
                            className={`text-lg text-white font-semibold rounded-lg bg-linear-to-r from-[#B32346] to-[#46052D] h-12 hover:opacity-85 w-full mt-6 py-3.5 flex items-center justify-center gap-2 border transition-opacity`}>
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
        </>
    );
};

export default BloodDonationDetails;
