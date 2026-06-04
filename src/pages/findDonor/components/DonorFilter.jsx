import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import useDivision from "../../../hooks/useDivision";
import useBloodCategory from "../../../hooks/useBloodCategory";

const DonorFilter = ({ setAllDonors, setDonorCount, setIsLoading }) => {
    // react form hook
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    // Custom hooks
    const axios = useAxios();
    const divisionData = useDivision();
    const bloodCategory = useBloodCategory();

    // States
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    // Observer
    const selectedDivision = useWatch({
        control,
        name: "donorDivision",
    });
    const selectedDistrict = useWatch({
        control,
        name: "donorDistrict",
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
                setValue("donorDistrict", "");
                setValue("donorUpazila", "");
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
                setValue("donorUpazila", "");
            });
    }, [axios, selectedDistrict, setValue]);

    const handleFilterDonor = async (data) => {
        setIsLoading(true)
        /* Filter data */
        const { bloodGroup, donorDistrict, donorDivision, donorUpazila } = data;

        // console.log(bloodGroup, donorDistrict, donorDivision, donorUpazila);

        /* Donation donor location id and name */
        const [divisionId] = donorDivision.split(" ");
        const [districtId] = donorDistrict.split(" ");
        const [upazilaId] = donorUpazila.split(" ");

        const result = await axios.get("/users/all-donors", {
            params: {
                divisionId,
                districtId,
                upazilaId,
                bloodGroup,
            },
        });

        setAllDonors(result.data.donors);
        setDonorCount(result.data.donorsCount);
        // console.log(result.data);
        setIsLoading(false)
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <form
                onSubmit={handleSubmit(handleFilterDonor)}
                className="grid grid-cols-1 md:grid-cols-5 items-start gap-4">
                {/* Division */}
                <fieldset className="fieldset">
                    <select
                        {...register("donorDivision", {
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
                    {errors.donorDivision && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.donorDivision.message}
                        </p>
                    )}
                </fieldset>

                {/* District */}
                <fieldset className="fieldset">
                    <select
                        {...register("donorDistrict", {
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
                    {errors.donorDistrict && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.donorDistrict.message}
                        </p>
                    )}

                    {/* Upazila */}
                </fieldset>
                <fieldset className="fieldset">
                    <select
                        {...register("donorUpazila", {
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
                    {errors.donorUpazila && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.donorUpazila.message}
                        </p>
                    )}
                </fieldset>

                {/* blood type */}
                <fieldset className="fieldset">
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

                {/* Search Button */}
                <button className="w-full bg-linear-to-r from-[#B32346] to-[#46052D] text-white font-medium rounded-lg px-3 h-10 my-1 hover:opacity-85">
                    Search Donor
                </button>
            </form>
        </div>
    );
};

export default DonorFilter;
