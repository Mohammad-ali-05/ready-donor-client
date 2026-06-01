import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useDivision from "../../../hooks/useDivision";
import useBloodCategory from "../../../hooks/useBloodCategory";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const CreateDonationRequest = () => {
    // react hooks
    const navigate = useNavigate();

    // react form hook
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    // Custom hooks
    const { user } = useAuth();
    const axios = useAxios();
    const axiosSecure = useAxiosSecure();
    const divisionData = useDivision();
    const bloodCategory = useBloodCategory();

    // States
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    // Observer
    const selectedDivision = useWatch({
        control,
        name: "recipientDivision",
    });
    const selectedDistrict = useWatch({
        control,
        name: "recipientDistrict",
    });

    // Load districts when division changes
    useEffect(() => {
        if (!selectedDivision) return;
        axios
            .get(`/district?divisionId=${selectedDivision.split(" ")[0]}`)
            .then((data) => {
                setDistricts(data.data);

                // reset lower fields
                setUpazilas([]);
                setValue("recipientDistrict", "");
                setValue("recipientUpazila", "");
            });
    }, [axios, selectedDivision, setValue]);

    // Load upazilas when district changes
    useEffect(() => {
        if (!selectedDistrict) return;
        axios
            .get(`/upazila?districtId=${selectedDistrict.split(" ")[0]}`)
            .then((data) => {
                setUpazilas(data.data);

                // reset upazila
                setValue("recipientUpazila", "");
            });
    }, [axios, selectedDistrict, setValue]);

    /* handle create donation form submit */
    const handleCreateDonation = (data) => {
        const donationPromise = async () => {
            /* Donation request from data */
            const {
                bloodGroup,
                donationDate,
                donationTime,
                fullAddress,
                hospitalName,
                recipientDistrict,
                recipientDivision,
                recipientName,
                recipientUpazila,
                requestMessage,
                requesterEmail,
                requesterName,
            } = data;

            /* Donation recipient location id and name */
            const [divisionId, divisionName] = recipientDivision.split(" ");
            const [districtId, districtName] = recipientDistrict.split(" ");
            const [upazilaId, upazilaName] = recipientUpazila.split(" ");

            /* Donation request object */
            const donationRequest = {
                requesterName,
                requesterEmail,

                recipientName,
                bloodGroup,

                divisionId,
                divisionName,

                districtId,
                districtName,

                upazilaId,
                upazilaName,

                hospitalName,
                fullAddress,

                donationDate,
                donationTime,

                requestMessage,
            };

            const result = await axiosSecure.post(
                "/blood-donation",
                donationRequest,
            );

            console.log(result);
            if (!result.data.insertedId) {
                throw new Error("Donation request was not created");
            }

            return result;
        };

        toast.promise(donationPromise(), {
            pending: "Creating donation request...",
            success: "Donation request created successfully",
            error: "Failed to create donation request!",
        });
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(handleCreateDonation)}
                className="card-body p-6 rounded-lg shadow-xl">
                <div className="flex justify-between items-center">
                    <legend className="text-xl font-semibold mb-4">
                        Create Donation Requests
                    </legend>
                    <button
                        onClick={() => navigate(-1)}
                        type="button"
                        className="text-lg text-white font-semibold rounded-md bg-linear-to-r from-[#B32346] to-[#46052D] px-4 py-1 hover:opacity-85">
                        Go Back
                    </button>
                </div>
                {/* Requester info */}
                <fieldset className="fieldset">
                    {/* requester name */}
                    <label
                        htmlFor="requesterName"
                        className="text-sm font-medium text-gray-700">
                        Requester Name *
                    </label>
                    <input
                        {...register("requesterName", {
                            required: "Requester name is required",
                        })}
                        type="text"
                        readOnly
                        value={user?.displayName}
                        className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                    />
                    {errors.requesterName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.requesterName.message}
                        </p>
                    )}

                    {/* requester email */}
                    <label
                        htmlFor="requesterEmail"
                        className="text-sm font-medium text-gray-700">
                        Requester Email *
                    </label>
                    <input
                        {...register("requesterEmail", {
                            required: "Requester email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email",
                            },
                        })}
                        type="email"
                        readOnly
                        value={user?.email}
                        className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                    />
                    {errors.requesterEmail && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.requesterEmail.message}
                        </p>
                    )}

                    {/* recipient name */}
                    <label
                        htmlFor="recipientName"
                        className="text-sm font-medium text-gray-700">
                        Recipient Name *
                    </label>
                    <input
                        {...register("recipientName", {
                            required: "Recipient name is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Recipient name must be at least 3 characters",
                            },
                        })}
                        type="text"
                        placeholder="Enter recipient full name"
                        className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                    />
                    {errors.recipientName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.recipientName.message}
                        </p>
                    )}

                    {/* blood type */}
                    <label className="text-sm font-medium text-gray-700">
                        Blood type *
                    </label>
                    <select
                        {...register("bloodGroup", {
                            required: "Blood group is required",
                        })}
                        defaultValue=""
                        className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                        <option value="">All Blood Types</option>
                        {bloodCategory.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.bloodGroup && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.bloodGroup.message}
                        </p>
                    )}
                </fieldset>

                {/* Recipient location */}
                <fieldset className="fieldset">
                    {/* Division */}
                    <label className="text-sm font-medium text-gray-700">
                        Recipient Division *
                    </label>
                    <select
                        {...register("recipientDivision", {
                            required: "Division is required",
                        })}
                        defaultValue=""
                        className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                        <option value="">Select Division</option>
                        {divisionData.map((division) => (
                            <option
                                key={division.id}
                                value={`${division.id} ${division.name}`}>
                                {division.name}
                            </option>
                        ))}
                    </select>
                    {errors.recipientDivision && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.recipientDivision.message}
                        </p>
                    )}

                    {/* District */}
                    <label className="text-sm font-medium text-gray-700">
                        Recipient District *
                    </label>
                    <select
                        {...register("recipientDistrict", {
                            required: "District is required",
                        })}
                        defaultValue=""
                        className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                        <option value="">Select District</option>
                        {districts.map((district) => (
                            <option
                                key={district.id}
                                value={`${district.id} ${district.name}`}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                    {errors.recipientDistrict && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.recipientDistrict.message}
                        </p>
                    )}

                    {/* Upazila */}
                    <label className="text-sm font-medium text-gray-700">
                        Recipient Upazila *
                    </label>
                    <select
                        {...register("recipientUpazila", {
                            required: "Upazila is required",
                        })}
                        defaultValue=""
                        className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                        <option value="">Select Upazila</option>
                        {upazilas.map((upazila) => (
                            <option
                                key={upazila.id}
                                value={`${upazila.id} ${upazila.name}`}>
                                {upazila.name}
                            </option>
                        ))}
                    </select>
                    {errors.recipientUpazila && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.recipientUpazila.message}
                        </p>
                    )}
                </fieldset>

                {/* Donation details */}
                <fieldset className="fieldset">
                    {/* hospital name */}
                    <label
                        htmlFor="hospitalName"
                        className="text-sm font-medium text-gray-700">
                        Hospital Name *
                    </label>
                    <input
                        {...register("hospitalName", {
                            required: "Hospital name is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Hospital name must be at least 3 characters",
                            },
                        })}
                        type="text"
                        placeholder="Enter hospital name"
                        className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                    />
                    {errors.hospitalName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.hospitalName.message}
                        </p>
                    )}

                    {/* full address */}
                    <label
                        htmlFor="fullAddress"
                        className="text-sm font-medium text-gray-700">
                        Full Address Line *
                    </label>
                    <input
                        {...register("fullAddress", {
                            required: "Full address is required",
                            minLength: {
                                value: 5,
                                message:
                                    "Address must be at least 5 characters",
                            },
                        })}
                        type="text"
                        placeholder="Enter full address"
                        className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                    />
                    {errors.fullAddress && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.fullAddress.message}
                        </p>
                    )}

                    {/* donation date */}
                    <label
                        htmlFor="donationDate"
                        className="text-sm font-medium text-gray-700">
                        Donation Date *
                    </label>
                    <input
                        {...register("donationDate", {
                            required: "Donation date is required",
                        })}
                        type="date"
                        className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                    />
                    {errors.donationDate && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.donationDate.message}
                        </p>
                    )}

                    {/* donation time */}
                    <label
                        htmlFor="donationTime"
                        className="text-sm font-medium text-gray-700">
                        Donation Time *
                    </label>
                    <input
                        {...register("donationTime", {
                            required: "Donation time is required",
                        })}
                        type="time"
                        className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                    />
                    {errors.donationTime && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.donationTime.message}
                        </p>
                    )}

                    {/* request message */}
                    <label
                        htmlFor="requestMessage"
                        className="text-sm font-medium text-gray-700">
                        Request Message *
                    </label>
                    <textarea
                        {...register("requestMessage", {
                            required: "Request message is required",
                            minLength: {
                                value: 20,
                                message:
                                    "Request message must be at least 20 characters",
                            },
                        })}
                        placeholder="Write why you need blood in details"
                        className="textarea w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none min-h-28"
                    />
                    {errors.requestMessage && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.requestMessage.message}
                        </p>
                    )}
                </fieldset>

                <button
                    type="submit"
                    className="text-lg text-white font-semibold rounded-md bg-linear-to-r from-[#B32346] to-[#46052D] h-10 hover:opacity-85 w-full mt-4">
                    Request
                </button>
            </form>
        </div>
    );
};

export default CreateDonationRequest;
