import React from "react";
import { Link } from "react-router";

const DonationCard = ({ donation }) => {
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

    return (
        <div className="bg-base-100 border border-gray-100 rounded-lg shadow-md hover:shadow-md transition-all duration-200 p-5 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                    <p className="text-xs uppercase tracking-wider text-base-content/50 font-medium mb-1">
                        Blood Request For
                    </p>

                    <h3 className="text-lg font-semibold text-base-content">
                        {donation.recipientName}
                    </h3>
                </div>

                <div className="w-14 h-14 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                    <span className="font-bold text-red-600 text-lg">
                        {donation.bloodGroup}
                    </span>
                </div>
            </div>

            {/* Info Section */}
            <div className="space-y-4 grow">
                {/* Location */}
                <div className="flex items-center gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-base-content/50 shrink-0"
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
                        <p className="text-xs text-base-content/50">Location</p>

                        <p className="text-sm font-medium text-base-content">
                            {donation.upazilaName}, {donation.districtName}
                        </p>
                    </div>
                </div>

                {/* Hospital */}
                <div className="flex items-center gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-base-content/50 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.75}>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5"
                        />
                    </svg>

                    <div>
                        <p className="text-xs text-base-content/50">Hospital</p>

                        <p className="text-sm font-medium text-base-content">
                            {donation.hospitalName}
                        </p>
                    </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-base-content/50 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.75}>
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>

                    <div>
                        <p className="text-xs text-base-content/50">
                            Donation Date
                        </p>

                        <p className="text-sm font-medium text-base-content">
                            {formatDate(donation.donationDate)}
                        </p>
                    </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-base-content/50 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.75}>
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>

                    <div>
                        <p className="text-xs text-base-content/50">
                            Donation Time
                        </p>

                        <p className="text-sm font-medium text-base-content">
                            {formatTime(donation.donationTime)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div>
                <Link
                    to={`/blood-donations/details/${donation._id}`}
                    className="mt-4 h-11 rounded-lg bg-linear-to-r from-[#B32346] to-[#46052D] text-white font-medium flex items-center justify-center hover:opacity-90 transition">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default DonationCard;
