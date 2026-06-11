import React, { useEffect, useState } from "react";
import { MdOutlineBloodtype } from "react-icons/md";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
// import ThemeChangeButton from "./ThemeChangeButton";

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
                        `text-[17px] font-semibold hover:text-[#8d1f3a] ${isActive ? "text-[#8d1f3a] border-b-2" : "text-base-content"}`
                    }>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={"/find-donor"}
                    className={({ isActive }) =>
                        `text-[17px] font-semibold hover:text-[#8d1f3a] ${isActive ? "text-[#8d1f3a] border-b-2" : "text-base-content"}`
                    }>
                    Find Donor
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={"/blood-donations"}
                    className={({ isActive }) =>
                        `text-[17px] font-semibold hover:text-[#8d1f3a] ${isActive ? "text-[#8d1f3a] border-b-2" : "text-base-content"}`
                    }>
                    Blood Donations{" "}
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink
                        to={"/funding"}
                        className={({ isActive }) =>
                            `text-[17px] font-semibold hover:text-[#8d1f3a] ${isActive ? "text-[#8d1f3a] border-b-2" : "text-base-content"}`
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

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const handleFetchTheme = () => {
            const savedTheme = localStorage.getItem("theme") || "light";

            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        };
        handleFetchTheme();
    }, []);

    const handleThemeChange = (e) => {
        const newTheme = e.target.checked ? "dark" : "light";

        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <nav className="navbar bg-base-100  shadow-md p-0">
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
                            className="menu menu-sm dropdown-content bg-base-100  rounded-lg z-10 mt-3 w-52 p-2 shadow">
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
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link
                                        to={"/dashboard"}
                                        className="text-[17px] font-semibold hover:text-[#8d1f3a] text-base-content">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="my-2">
                                    <Link
                                        to={"/dashboard/profile"}
                                        className="text-[17px] font-semibold hover:text-[#8d1f3a] text-base-content">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-lg flex justify-center items-center text-white font-semibold rounded-lg bg-linear-to-r from-[#B32346] to-[#46052D] w-full hover:opacity-85">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        /* If user not logged in then show login button */
                        <Link to={"/auth/login"}>
                            <button className="text-lg text-white font-semibold  rounded-lg bg-linear-to-r from-[#B32346] to-[#46052D] w-30 h-10 hover:opacity-85">
                                Login
                            </button>
                        </Link>
                    )}
                    <label className="swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input
                            type="checkbox"
                            checked={theme === "dark"}
                            className="theme-controller"
                            onChange={handleThemeChange}
                        />

                        {/* sun icon */}
                        <svg
                            className="swap-off h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-on h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
