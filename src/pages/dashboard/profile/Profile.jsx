import React from "react";
import useDbUser from "../../../hooks/useDbUser";

const Profile = () => {
    // Custom hooks
    const { dbUser } = useDbUser();

    // const dbUser = {
    //     name: "Mohammad Ali",
    //     email: "muhammadali.admin@gmail.com",
    //     image: "https://i.ibb.co/dJswRbbJ/adhitya-anzaroktavian-2TnRgGnVLFU-unsplash.jpg",
    //     bloodGroup: "AB-",
    //     divisionName: "Dhaka",
    //     districtName: "Dhaka",
    //     upazilaName: "Savar",
    //     status: "active",
    //     role: "admin",
    //     createdAt: "2026-05-20T23:26:52.357Z",
    //     updatedAt: "2026-05-20T23:26:52.357Z",
    // };

    return (
        <section className="space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img
                        src={dbUser.image}
                        alt={dbUser.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-red-100"
                    />

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold">{dbUser.name}</h1>

                        <p className="text-gray-500 mt-1">
                            Blood Donor Profile
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                            <span className="badge badge-error text-white">
                                {dbUser.bloodGroup}
                            </span>

                            <span className="badge badge-primary text-white capitalize">
                                {dbUser.role}
                            </span>

                            <span className="badge badge-success text-white capitalize">
                                {dbUser.status}
                            </span>
                        </div>
                    </div>
                    {/* button will go here */}
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">
                    Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm text-gray-500">Email</p>

                        <p className="font-medium">{dbUser.email}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Blood Group</p>

                        <p className="font-medium">{dbUser.bloodGroup}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Division</p>

                        <p className="font-medium">{dbUser.divisionName}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">District</p>

                        <p className="font-medium">{dbUser.districtName}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Upazila</p>

                        <p className="font-medium">{dbUser.upazilaName}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Role</p>

                        <p className="font-medium capitalize">{dbUser.role}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Status</p>

                        <p className="font-medium capitalize">
                            {dbUser.status}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Joined</p>

                        <p className="font-medium">
                            {new Date(dbUser.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;

// Add these in future if needed

/* 
// 

                    <button className="btn btn-error text-white">
                        Edit Profile
                    </button>

                    //  Donation Statistics 
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-red-50 rounded-2xl p-5">
                    <h3 className="text-gray-500 text-sm">Total Requests</h3>

                    <p className="text-3xl font-bold mt-2">15</p>
                </div>

                <div className="bg-yellow-50 rounded-2xl p-5">
                    <h3 className="text-gray-500 text-sm">Pending</h3>

                    <p className="text-3xl font-bold mt-2">5</p>
                </div>

                <div className="bg-blue-50 rounded-2xl p-5">
                    <h3 className="text-gray-500 text-sm">In Progress</h3>

                    <p className="text-3xl font-bold mt-2">2</p>
                </div>

                <div className="bg-green-50 rounded-2xl p-5">
                    <h3 className="text-gray-500 text-sm">Completed</h3>

                    <p className="text-3xl font-bold mt-2">8</p>
                </div>
            </div>
                    
                    */
