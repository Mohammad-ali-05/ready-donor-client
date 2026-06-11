import React, { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useBloodCategory from "../../../hooks/useBloodCategory";
import useDivision from "../../../hooks/useDivision";
import { useNavigate, useParams } from "react-router";
import Loading from "../../../components/Loading";

const EditDonationRequest = () => {
    // React hooks
    const prevDivision = useRef();
    const prevDistrict = useRef();
    const navigate = useNavigate();
    const { id } = useParams();

    // loadingData state
    const [loadingData, setLoadingData] = useState(true);

    // react form hook
    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    // Custom hooks
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

    useEffect(() => {
        const fetchDonationREquest = async () => {
            try {
                setLoadingData(true);
                const result = await axiosSecure.get(`/blood-donation/${id}`);
                const finalResult = result.data;

                // console.log(finalResult);

                if (!finalResult) {
                    throw new Error("Donation request not found.");
                }

                const divisionId = finalResult.divisionId;
                const districtId = finalResult.districtId;

                const districtRes = await axios.get(
                    `/district?divisionId=${divisionId}`,
                );
                setDistricts(districtRes.data);

                const upazilaRes = await axios.get(
                    `/upazila?districtId=${districtId}`,
                );
                setUpazilas(upazilaRes.data);

                reset({
                    requesterName: finalResult.requesterName,
                    requesterEmail: finalResult.requesterEmail,
                    recipientName: finalResult.recipientName,
                    bloodGroup: finalResult.bloodGroup,

                    // Set the full string including ID and Name for selection
                    recipientDivision: `${finalResult.divisionId} ${finalResult.divisionName}`,
                    recipientDistrict: `${finalResult.districtId} ${finalResult.districtName}`,
                    recipientUpazila: `${finalResult.upazilaId} ${finalResult.upazilaName}`,

                    hospitalName: finalResult.hospitalName,
                    fullAddress: finalResult.fullAddress,
                    donationDate: finalResult.donationDate,
                    donationTime: finalResult.donationTime,
                    requestMessage: finalResult.requestMessage,
                });
            } catch (error) {
                // console.log(error);

                toast.error(
                    error?.response?.data?.message ||
                        error?.message ||
                        "Something went wrong",
                );
            } finally {
                setLoadingData(false);
            }
        };
        fetchDonationREquest();
    }, [axios, axiosSecure, id, reset]);

    // Load districts when division changes
    useEffect(() => {
        if (!selectedDivision) return;

        const divisionChanged =
            prevDivision.current && prevDivision.current !== selectedDivision;

        axios
            .get(`/district?divisionId=${selectedDivision.split(" ")[0]}`)
            .then((res) => {
                setDistricts(res.data);

                if (divisionChanged) {
                    setUpazilas([]);
                    setValue("recipientDistrict", "");
                    setValue("recipientUpazila", "");
                }
            });

        prevDivision.current = selectedDivision;
    }, [axios, selectedDivision, setValue]);

    // Load upazilas when district changes
    useEffect(() => {
        if (!selectedDistrict) return;

        const districtChanged =
            prevDistrict.current && prevDistrict.current !== selectedDistrict;

        axios
            .get(`/upazila?districtId=${selectedDistrict.split(" ")[0]}`)
            .then((res) => {
                setUpazilas(res.data);

                if (districtChanged) {
                    setValue("recipientUpazila", "");
                }
            });

        prevDistrict.current = selectedDistrict;
    }, [axios, selectedDistrict, setValue]);

    /* handle update donation form submit */
    const handleUpdateDonation = (data) => {
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
            } = data;

            // console.log(recipientUpazila);

            /* Donation recipient location id and name */
            const [divisionId, ...divisionRest] = recipientDivision.split(" ");
            const divisionName = divisionRest.join(" ");

            const [districtId, ...districtRest] = recipientDistrict.split(" ");
            const districtName = districtRest.join(" ");

            const [upazilaId, ...upazilaRest] = recipientUpazila.split(" ");
            const upazilaName = upazilaRest.join(" ");

            /* Donation update object */
            const donationUpdate = {
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

            // console.log(donationUpdate);

            const result = await axiosSecure.patch(
                `/blood-donation/${id}`,
                donationUpdate,
            );

            if (!result.data.modifiedCount) {
                throw new Error("Donation request was not updated");
            }

            return result;
        };

        toast.promise(donationPromise(), {
            pending: "Updating donation request...",
            success: "Donation request updated successfully",
            error: "Failed to update donation request!",
        });
    };

    return (
        <div>
            {loadingData && (
                <div className="flex justify-center items-center my-40">
                    <Loading></Loading>
                </div>
            )}
            <form
                onSubmit={handleSubmit(handleUpdateDonation)}
                className={`card-body p-6 rounded-lg shadow-md bg-base-100 ${loadingData && "hidden"}`}>
                <div className="flex justify-between items-center">
                    <legend className="text-xl font-semibold mb-4">
                        Edit Donation Requests
                    </legend>
                    <button
                        onClick={() => navigate(-1)}
                        type="button"
                        className="text-lg text-white font-semibold rounded-lg bg-linear-to-r from-[#B32346] to-[#46052D] px-4 py-1 hover:opacity-85">
                        Go Back
                    </button>
                </div>
                {/* Requester info */}
                <fieldset className="fieldset">
                    {/* requester name */}
                    <label
                        htmlFor="requesterName"
                        className="text-sm font-medium text-base-content/60">
                        Requester Name *
                    </label>
                    <input
                        {...register("requesterName", {
                            required: "Requester name is required",
                        })}
                        type="text"
                        readOnly
                        class="input w-full bg-base-200 text-base-content text-sm disabled:opacity-50"
                    />
                    {errors.requesterName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.requesterName.message}
                        </p>
                    )}

                    {/* requester email */}
                    <label
                        htmlFor="requesterEmail"
                        className="text-sm font-medium text-base-content/60">
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
                        class="input w-full bg-base-200 text-base-content text-sm disabled:opacity-50"
                    />
                    {errors.requesterEmail && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.requesterEmail.message}
                        </p>
                    )}

                    {/* recipient name */}
                    <label
                        htmlFor="recipientName"
                        className="text-sm font-medium text-base-content/60">
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
                        class="input w-full bg-base-200 text-base-content text-sm disabled:opacity-50"
                    />
                    {errors.recipientName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.recipientName.message}
                        </p>
                    )}

                    {/* blood type */}
                    <label className="text-sm font-medium text-base-content/60">
                        Blood type *
                    </label>
                    <select
                        {...register("bloodGroup", {
                            required: "Blood group is required",
                        })}
                        className="select w-full bg-base-200 text-base-content text-sm disabled:opacity-50 focus:ring-2 focus:ring-base-300">
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
                    <label className="text-sm font-medium text-base-content/60">
                        Recipient Division *
                    </label>
                    <select
                        {...register("recipientDivision", {
                            required: "Division is required",
                        })}
                        className="select w-full bg-base-200 text-base-content text-sm disabled:opacity-50 focus:ring-2 focus:ring-base-300">
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
                    <label className="text-sm font-medium text-base-content/60">
                        Recipient District *
                    </label>
                    <select
                        {...register("recipientDistrict", {
                            required: "District is required",
                        })}
                        className="select w-full bg-base-200 text-base-content text-sm disabled:opacity-50 focus:ring-2 focus:ring-base-300">
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
                    <label className="text-sm font-medium text-base-content/60">
                        Recipient Upazila *
                    </label>
                    <select
                        {...register("recipientUpazila", {
                            required: "Upazila is required",
                        })}
                        className="select w-full bg-base-200 text-base-content text-sm disabled:opacity-50 focus:ring-2 focus:ring-base-300">
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
                        className="text-sm font-medium text-base-content/60">
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
                        class="input w-full bg-base-200 text-base-content text-sm disabled:opacity-50"
                    />
                    {errors.hospitalName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.hospitalName.message}
                        </p>
                    )}

                    {/* full address */}
                    <label
                        htmlFor="fullAddress"
                        className="text-sm font-medium text-base-content/60">
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
                        class="input w-full bg-base-200 text-base-content text-sm disabled:opacity-50"
                    />
                    {errors.fullAddress && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.fullAddress.message}
                        </p>
                    )}

                    {/* donation date */}
                    <label
                        htmlFor="donationDate"
                        className="text-sm font-medium text-base-content/60">
                        Donation Date *
                    </label>
                    <input
                        {...register("donationDate", {
                            required: "Donation date is required",
                        })}
                        type="date"
                        class="input w-full bg-base-200 text-base-content text-sm disabled:opacity-50"
                    />
                    {errors.donationDate && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.donationDate.message}
                        </p>
                    )}

                    {/* donation time */}
                    <label
                        htmlFor="donationTime"
                        className="text-sm font-medium text-base-content/60">
                        Donation Time *
                    </label>
                    <input
                        {...register("donationTime", {
                            required: "Donation time is required",
                        })}
                        type="time"
                        class="input w-full bg-base-200 text-base-content text-sm disabled:opacity-50"
                    />
                    {errors.donationTime && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.donationTime.message}
                        </p>
                    )}

                    {/* request message */}
                    <label
                        htmlFor="requestMessage"
                        className="text-sm font-medium text-base-content/60">
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
                        className="textarea w-full bg-base-200 text-base-content text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-base-300 min-h-28 disabled:opacity-50"
                    />
                    {errors.requestMessage && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.requestMessage.message}
                        </p>
                    )}
                </fieldset>

                <button
                    type="submit"
                    className="text-lg text-white font-semibold rounded-lg bg-linear-to-r from-[#B32346] to-[#46052D] h-10 hover:opacity-85 w-full mt-4">
                    Update Donation
                </button>
            </form>
        </div>
    );
};

export default EditDonationRequest;
