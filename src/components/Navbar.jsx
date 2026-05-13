import React from "react";
import { MdOutlineBloodtype } from "react-icons/md";
import { Link, NavLink } from "react-router";

const Navbar = () => {
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
            <li>
                <NavLink
                    to={"/funding"}
                    className={({ isActive }) =>
                        `text-[17px] font-semibold hover:text-[#8d1f3a] ${isActive ? "text-[#8d1f3a] border-b-2" : "text-black"}`
                    }>
                    Funding
                </NavLink>
            </li>
        </>
    );
    return (
        <nav className="bg-base-100 shadow-sm">
            <div className="navbar max-w-7xl mx-auto px-8">
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
                    <Link to={"/auth/login"}>
                        <button className="text-lg text-white font-semibold bg-linear-to-r rounded-md from-[#B32346] to-[#46052D] w-30 h-10 hover:opacity-85">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
