import React, { useEffect, useState } from "react";
import useBloodCategory from "../../../hooks/useBloodCategory";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useDivision from "../../../hooks/useDivision";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    // Data from hooks
    const { user, createUser, updateUserProfile, setUser } = useAuth();
    const axios = useAxios();
    const divisionData = useDivision();
    const bloodCategory = useBloodCategory();

    // States
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    // Observer
    const password = useWatch({
        control,
        name: "password",
    });
    const selectedDivision = useWatch({
        control,
        name: "division",
    });
    const selectedDistrict = useWatch({
        control,
        name: "district",
    });

    // Load districts when division changes
    useEffect(() => {
        if (!selectedDivision) return;

        axios.get(`/district?divisionId=${selectedDivision}`).then((data) => {
            setDistricts(data.data);

            // reset lower fields
            setUpazilas([]);
            setValue("district", "");
            setValue("upazila", "");
        });
    }, [axios, selectedDivision, setValue]);

    // Load upazilas when district changes
    useEffect(() => {
        if (!selectedDistrict) return;

        axios.get(`/upazila?districtId=${selectedDistrict}`).then((data) => {
            setUpazilas(data.data);

            // reset upazila
            setValue("upazila", "");
        });
    }, [axios, selectedDistrict, setValue]);

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
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Name must be at least 3 characters",
                                    },
                                })}
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
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
                                Email *
                            </label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email",
                                    },
                                })}
                                type="email"
                                placeholder="Enter your full email"
                                className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}

                            {/* image */}
                            <label className="text-sm font-medium text-gray-700">
                                Image *
                            </label>
                            <input
                                {...register("image", {
                                    required: "Image is required",
                                })}
                                type="file"
                                className="file-input file-input-bordered h-9 w-full bg-gray-100 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                            {errors.image && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.image.message}
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
                        {/* User location */}
                        <fieldset className="fieldset">
                            {/* Division */}

                            <label className="text-sm font-medium text-gray-700">
                                Division *
                            </label>
                            <select
                                {...register("division", {
                                    required: "Division is required",
                                })}
                                defaultValue=""
                                className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                                <option value="">Select Division</option>
                                {divisionData.map((division) => (
                                    <option
                                        key={division.id}
                                        value={division.id}>
                                        {division.name}
                                    </option>
                                ))}
                            </select>
                            {errors.division && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.division.message}
                                </p>
                            )}

                            {/* District */}
                            <label className="text-sm font-medium text-gray-700">
                                District *
                            </label>
                            <select
                                {...register("district", {
                                    required: "District is required",
                                })}
                                defaultValue=""
                                className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                                <option value="">Select District</option>
                                {districts.map((district) => (
                                    <option
                                        key={district.id}
                                        value={district.id}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                            {errors.district && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.district.message}
                                </p>
                            )}

                            {/* Upazila */}
                            <label className="text-sm font-medium text-gray-700">
                                Upazila *
                            </label>
                            <select
                                {...register("upazila", {
                                    required: "Upazila is required",
                                })}
                                defaultValue=""
                                className="select w-full bg-gray-100 rounded-lg border-none focus:border-none focus:shadow-none focus:outline-none">
                                <option value="">Select Upazila</option>
                                {upazilas.map((upazila) => (
                                    <option key={upazila.id} value={upazila.id}>
                                        {upazila.name}
                                    </option>
                                ))}
                            </select>
                            {errors.upazila && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.upazila.message}
                                </p>
                            )}
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
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                                        message:
                                            "Password must contain uppercase, lowercase, number and special character",
                                    },
                                })}
                                type="password"
                                placeholder="Create your password"
                                className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}

                            {/*Confirm Password */}
                            <label
                                htmlFor="confirmPassword"
                                className="text-sm font-medium text-gray-700">
                                Confirm Password *
                            </label>
                            <input
                                {...register("confirmPassword", {
                                    required: "Please confirm password",
                                    validate: (value) =>
                                        value === password ||
                                        "Passwords do not match",
                                })}
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full h-9 px-3 rounded-md border border-gray-300 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 disabled:opacity-50"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
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
