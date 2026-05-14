import React from "react";

const DonorFilter = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <form className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Division */}
                <select
                    defaultValue=""
                    className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                    <option value="">Select Division</option>
                    <option>Dhaka</option>
                    <option>Chattogram</option>
                    <option>Rajshahi</option>
                    <option>Khulna</option>
                    <option>Sylhet</option>
                </select>

                {/* District */}
                <select
                    defaultValue=""
                    className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                    <option value="">Select District</option>
                    <option>Dhaka</option>
                    <option>Comilla</option>
                    <option>Barishal</option>
                    <option>Rangpur</option>
                </select>

                {/* Upazila */}
                <select
                    defaultValue=""
                    className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                    <option value="">Select Upazila</option>
                    <option>Savar</option>
                    <option>Dhanmondi</option>
                    <option>Mirpur</option>
                </select>

                {/* Blood Type */}
                <select
                    defaultValue=""
                    className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                    <option value="">All Blood Types</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                </select>

                {/* Search Button */}
                <button className="w-full bg-linear-to-r from-[#B32346] to-[#46052D] text-white font-medium rounded-lg px-3 h-10 hover:opacity-85">
                    Search
                </button>
            </form>
        </div>
    );
};

export default DonorFilter;
