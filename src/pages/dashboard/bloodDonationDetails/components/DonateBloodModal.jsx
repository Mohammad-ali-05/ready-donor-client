import React, { useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const DonateBloodModal = ({
    modalRef,
    donationDetails,
    updatedDonor,
    setUpdatedDonor,
}) => {
    // React hook form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Custom hooks
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Set users defaultValue
    useEffect(() => {
        if (user) {
            reset({
                name: user.displayName || "",
                email: user.email || "",
            });
        }
    }, [user, reset]);

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

    const handleFormSubmit = (data) => {
        const updateDonorPromise = async () => {
            try {
                const { name, email } = data;

                const donorData = {
                    donorName: name,
                    donorEmail: email,
                };

                const result = await axiosSecure.patch(
                    `/blood-donation/update-donor/${donationDetails._id}`,
                    donorData,
                );

                if (result.data.modifiedCount) {
                    modalRef.current?.close();
                    setUpdatedDonor(!updatedDonor);
                    return result;
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        };

        toast.promise(updateDonorPromise(), {
            pending: "Updating donor...",
            success: "Updated donor successfully",
            error: "Failed to update donor!",
        });
    };

    // Function to close modal
    const closeModal = () => {
        modalRef.current?.close();
    };
    return (
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                {/* Summary */}
                <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    You're about to commit to donating{" "}
                    <strong className="text-red-500 font-semibold">
                        {donationDetails?.bloodGroup}
                    </strong>{" "}
                    blood for{" "}
                    <strong className="text-gray-700 font-semibold">
                        {donationDetails?.recipientName}
                    </strong>{" "}
                    at {donationDetails?.hospitalName} on{" "}
                    {formatDate(donationDetails?.donationDate)} at{" "}
                    {formatTime(donationDetails?.donationTime)}.
                </p>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <fieldset>
                        {/* name */}
                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700">
                            Donor Name *
                        </label>
                        {/* Name */}
                        <input
                            {...register("name")}
                            type="text"
                            readOnly
                            className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}

                        {/* email */}
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700">
                            Donor Email *
                        </label>
                        {/* Email */}
                        <input
                            {...register("email")}
                            type="email"
                            readOnly
                            className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </fieldset>
                    <button className="text-lg text-white font-semibold  rounded-md bg-linear-to-r from-[#B32346] to-[#46052D] h-10 hover:opacity-85 w-full mt-4">
                        Confirm blood donation
                    </button>
                </form>

                <div method="dialog" className="modal-action">
                    <button
                        onClick={closeModal}
                        className="btn hover:text-white hover:bg-linear-to-r hover:from-[#B32346] hover:to-[#46052D]">
                        Close
                    </button>
                </div>
            </div>

            {/* Click outside to close */}
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default DonateBloodModal;
