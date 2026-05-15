import React from "react";
import useBloodCategory from "../../../hooks/useBloodCategory";
import { useForm } from "react-hook-form";

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const bloodCategory = useBloodCategory();

    const handleFormSubmit = (data) => {
        console.log(data);
    };
    return (
        <section className="relative bg-linear-to-br from-red-50 to-red-100 py-20">
            <div className="max-w-7xl flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8">
                <div className="card bg-base-100 w-full max-w-lg shrink-0 p-6">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl mb-2">Join Save Lives</h2>
                        <p className="text-[#717182] text-sm">
                            Create your account and start making a difference in
                            people's lives
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit(handleFormSubmit)}
                        className="card-body p-0">
                        {/* User info */}
                        <fieldset className="fieldset">
                            {/* name */}
                            <label
                                htmlFor="name"
                                className="text-sm font-medium text-gray-700">
                                Full Name *
                            </label>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                            />

                            {/* email */}
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700">
                                Email *
                            </label>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                placeholder="Enter your full email"
                                className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                            />
                            {/* image */}
                            <label className="text-sm font-medium text-gray-700">
                                Image *
                            </label>
                            <input
                                {...register("image", { required: true })}
                                type="file"
                                className="file-input file-input-bordered h-9 w-full bg-gray-100 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                            {/* blood type */}
                            <label className="text-sm font-medium text-gray-700">
                                Blood type *
                            </label>
                            <select
                                {...register("bloodGroup", { required: true })}
                                defaultValue=""
                                className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                                <option value="">All Blood Types</option>
                                {bloodCategory.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </fieldset>
                        {/* User location */}
                        <fieldset className="fieldset">
                            {/* Division */}
                            <label className="text-sm font-medium text-gray-700">
                                Division *
                            </label>
                            <select
                                {...register("division", { required: true })}
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
                            <label className="text-sm font-medium text-gray-700">
                                District *
                            </label>
                            <select
                                {...register("district", { required: true })}
                                defaultValue=""
                                className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                                <option value="">Select District</option>
                                <option>Dhaka</option>
                                <option>Comilla</option>
                                <option>Barishal</option>
                                <option>Rangpur</option>
                            </select>

                            {/* Upazila */}
                            <label className="text-sm font-medium text-gray-700">
                                Upazila *
                            </label>
                            <select
                                {...register("upazila", { required: true })}
                                defaultValue=""
                                className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                                <option value="">Select Upazila</option>
                                <option>Savar</option>
                                <option>Dhanmondi</option>
                                <option>Mirpur</option>
                            </select>
                        </fieldset>
                        {/* User password */}
                        <fieldset className="fieldset">
                            {/*Create Password */}
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700">
                                Password *
                            </label>
                            <input
                                {...register("password", { required: true })}
                                type="password"
                                placeholder="Create your password"
                                className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                            />
                            {/*Confirm Password */}
                            <label
                                htmlFor="confirmPassword"
                                className="text-sm font-medium text-gray-700">
                                Confirm Password *
                            </label>
                            <input
                                {...register("confirmPassword", {
                                    required: true,
                                })}
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                            />
                        </fieldset>
                        <button className="btn btn-neutral w-full mt-4">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;
