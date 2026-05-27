import React from "react";
import { MdOutlineBloodtype } from "react-icons/md";
import { Await, Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    /* Custom hooks */
    const { user, logout } = useAuth();

    /* Links for navbar */
    const links = (
        <>
            <li>
                <NavLink
                    to={"/home"}
                    className={({ isActive }) =>
                        `text-[17px] font-semibold hover:text-[#8d1f3a] ${isActive ? "text-[#8d1f3a] border-b-2" : "text-black"}`
                    }>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={"/find-donor"}
                    className={({ isActive }) =>
                        `text-[17px] font-semibold hover:text-[#8d1f3a] ${isActive ? "text-[#8d1f3a] border-b-2" : "text-black"}`
                    }>
                    Find Donor
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={"/blood-donations"}
                    className={({ isActive }) =>
                        `text-[17px] font-semibold hover:text-[#8d1f3a] ${isActive ? "text-[#8d1f3a] border-b-2" : "text-black"}`
                    }>
                    Blood Donations{" "}
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink
                        to={"/funding"}
                        className={({ isActive }) =>
                            `text-[17px] font-semibold hover:text-[#8d1f3a] ${isActive ? "text-[#8d1f3a] border-b-2" : "text-black"}`
                        }>
                        Funding
                    </NavLink>
                </li>
            )}
        </>
    );

    const handleLogout = async () => {
        logout();
    };

    return (
        <nav className="navbar bg-base-100 shadow-md p-0">
            <div className="flex justify-between items-center max-w-7xl w-full mx-auto px-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabindex="0"
                            role="button"
                            className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                {" "}
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />{" "}
                            </svg>
                        </div>
                        <ul
                            tabindex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to={"/home"}>
                        <div className="flex justify-center items-center">
                            <div>
                                <svg width="0" height="0">
                                    <defs>
                                        <linearGradient
                                            id="gradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%">
                                            <stop
                                                offset="0%"
                                                stopColor="#B32346"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#46052D"
                                            />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <MdOutlineBloodtype
                                    size={45}
                                    style={{ fill: "url(#gradient)" }}
                                />
                            </div>
                            <div className="text-[17px] flex flex-col font-black bg-linear-to-br from-[#B32346] to-[#46052D] bg-clip-text text-transparent -ml-1">
                                <p className="-mb-0.5">Ready</p>
                                <p className="-mt-0.5">Donor</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex flex-row gap-18">{links}</ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        /* If user logged in then show profile */
                        <div className="dropdown dropdown-end z-10">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User profile image."
                                        src={user?.photoURL}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content flex flex-col gap-2 bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link
                                        to={"/dashboard"}
                                        className="text-[17px] font-semibold hover:text-[#8d1f3a] text-black">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={"/dashboard/profile"}
                                        className="text-[17px] font-semibold hover:text-[#8d1f3a] text-black">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-lg flex justify-center items-center text-white font-semibold rounded-md bg-linear-to-r from-[#B32346] to-[#46052D] w-full hover:opacity-85">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        /* If user not logged in then show login button */
                        <Link to={"/auth/login"}>
                            <button className="text-lg text-white font-semibold  rounded-md bg-linear-to-r from-[#B32346] to-[#46052D] w-30 h-10 hover:opacity-85">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
