import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const statuses = ["all", "active", "blocked"];

const AllUsers = () => {
    // React hooks
    const [allUsers, setAllUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);

    // States for pagination
    const [usersCount, setUsersCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;

    // State for filter
    const [statusFilter, setStatusFilter] = useState("all");

    // Custom hooks
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                setUsersLoading(true);
                const result = await axiosSecure.get("/admin/all-users", {
                    params: {
                        limit,
                        skip: currentPage * limit,
                        statusFilter,
                    },
                });

                const count = result?.data.usersCount;

                setAllUsers(result?.data.users);
                setUsersCount(count);
                setTotalPage(Math.ceil(count / limit));
            } catch (error) {
                // console.log(error);

                toast.error(
                    error?.response?.data?.message ||
                        error?.message ||
                        "Something went wrong",
                );
            } finally {
                setUsersLoading(false);
            }
        };
        fetchAllUsers();
    }, [axiosSecure, currentPage, statusFilter, refetch]);

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        setCurrentPage(0);
    };

    const handleStatusChange = (status, id) => {
        Swal.fire({
            title: `Are you sure you want to ${
                status === "blocked" ? "block this user?" : "unblock this user?"
            }`,
            text: "You can change it again later.",
            icon: status === "blocked" ? "warning" : "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText:
                status === "blocked"
                    ? "Yes, block user!"
                    : "Yes, unblock user!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/admin/user/update-status/${id}`, { status })
                    .then((result) => {
                        if (result.data.modifiedCount) {
                            setRefetch(!refetch);

                            Swal.fire({
                                title: "Status Updated!",
                                text:
                                    status === "blocked"
                                        ? "User has been blocked successfully."
                                        : "User has been unblocked successfully.",
                                icon: "success",
                            });
                        }
                    })
                    .catch((error) => {
                        // console.log(error);

                        toast.error(
                            error?.response?.data?.message ||
                                error?.message ||
                                "Something went wrong",
                        );

                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong.",
                            icon: "error",
                        });
                    });
            }
        });
    };

    const handleRoleChange = (role, id) => {
        Swal.fire({
            title: `Are you sure you want to make this user ${role}?`,
            text: "This user's permissions will be updated.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, make ${role}!`,
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/admin/user/update-role/${id}`, { role })
                    .then((result) => {
                        if (result.data.modifiedCount) {
                            setRefetch((prev) => !prev);

                            Swal.fire({
                                title: "Role Updated!",
                                text: `User has been promoted to ${role} successfully.`,
                                icon: "success",
                            });
                        }
                    })
                    .catch((error) => {
                        // console.log(error);

                        toast.error(
                            error?.response?.data?.message ||
                                error?.message ||
                                "Something went wrong",
                        );

                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong.",
                            icon: "error",
                        });
                    });
            }
        });
    };

    return (
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
            {/* Header */}
            <h2 className="text-xl font-semibold mb-4">
                All Users{" "}
                <span className="bg-linear-to-br from-[#B32346] to-[#46052D] bg-clip-text text-transparent">
                    {usersCount}
                </span>{" "}
                👤
            </h2>

            {/* Filters */}
            <div className="flex gap-2 mb-4 flex-wrap">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => handleStatusFilter(status)}
                        className={`px-4 py-2 rounded-lg border text-sm capitalize ${
                            statusFilter === status
                                ? "text-white bg-linear-to-r from-[#B32346] to-[#46052D] hover:opacity-85"
                                : "hover:text-white hover:bg-linear-to-r hover:from-[#B32346] hover:to-[#46052D]"
                        }`}>
                        {status}
                    </button>
                ))}
            </div>

            {usersLoading ? (
                <div className="flex justify-center items-center my-30">
                    <Loading />
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-base-200 text-left">
                                <tr>
                                    <th className="p-3">Avatar</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Role</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {allUsers.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-t hover:bg-base-200 transition">
                                        {/* Avatar */}
                                        <td className="p-3">
                                            <img
                                                src={user.image}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </td>

                                        {/* Name */}
                                        <td className="p-3 font-medium">
                                            {user.name}
                                        </td>

                                        {/* Email */}
                                        <td className="p-3">{user.email}</td>

                                        {/* Role */}
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-lg font-medium ${
                                                    user.role === "admin"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : user.role ===
                                                            "volunteer"
                                                          ? "bg-blue-100 text-blue-700"
                                                          : "bg-green-100 text-green-700"
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-lg font-medium ${
                                                    user.status === "active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="p-3">
                                            <div className="dropdown dropdown-left dropdown-center">
                                                <div
                                                    tabIndex={0}
                                                    role="button"
                                                    className="btn btn-sm btn-ghost">
                                                    ⋮
                                                </div>

                                                <ul
                                                    tabIndex={0}
                                                    className="dropdown-content menu bg-base-100  rounded-lg z-50 w-52 p-2 shadow border">
                                                    {/* Make Volunteer */}
                                                    {user.role === "donor" && (
                                                        <li>
                                                            <button
                                                                onClick={() =>
                                                                    handleRoleChange(
                                                                        "volunteer",
                                                                        user._id,
                                                                    )
                                                                }
                                                                className="btn my-0.5 text-blue-700">
                                                                Make Volunteer
                                                            </button>
                                                        </li>
                                                    )}

                                                    {/* Make Admin */}
                                                    {user.role !== "admin" && (
                                                        <li>
                                                            <button
                                                                onClick={() =>
                                                                    handleRoleChange(
                                                                        "admin",
                                                                        user._id,
                                                                    )
                                                                }
                                                                className="btn my-0.5 text-purple-700">
                                                                Make Admin
                                                            </button>
                                                        </li>
                                                    )}

                                                    {/* Block / Unblock */}
                                                    {user.status ===
                                                    "active" ? (
                                                        <li>
                                                            <button
                                                                onClick={() =>
                                                                    handleStatusChange(
                                                                        "blocked",
                                                                        user._id,
                                                                    )
                                                                }
                                                                className="btn my-0.5 text-red-700">
                                                                Block User
                                                            </button>
                                                        </li>
                                                    ) : (
                                                        <li>
                                                            <button
                                                                onClick={() =>
                                                                    handleStatusChange(
                                                                        "active",
                                                                        user._id,
                                                                    )
                                                                }
                                                                className="btn my-0.5 text-green-700">
                                                                Unblock User
                                                            </button>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {usersCount === 0 && (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-20 text-base-content/50">
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {usersCount <= limit || (
                        <div className="flex justify-center flex-wrap gap-3 py-10">
                            {currentPage > 0 && (
                                <button
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                    className="btn hover:text-white hover:bg-linear-to-r hover:from-[#B32346] hover:to-[#46052D]">
                                    Prev
                                </button>
                            )}

                            {[...Array(totalPage).keys()].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className={`btn rounded-lg ${
                                        currentPage === i
                                            ? "text-white bg-linear-to-r from-[#B32346] to-[#46052D] hover:opacity-85"
                                            : ""
                                    }`}>
                                    {i + 1}
                                </button>
                            ))}

                            {currentPage + 1 < totalPage && (
                                <button
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                    className="btn hover:text-white hover:bg-linear-to-r hover:from-[#B32346] hover:to-[#46052D]">
                                    Next
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllUsers;
