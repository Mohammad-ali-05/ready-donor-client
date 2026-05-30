import React from "react";
import { NavLink, Outlet } from "react-router";
import useDbUser from "../hooks/useDbUser";

const DashboardLayout = () => {
    const donorAndAdminRole = ["donor", "admin"];
    const { userInfo } = useDbUser();

    const dashboardLinks = (
        <>
            {/* If user role is donor or admin show these links */}
            {donorAndAdminRole.includes(userInfo?.role) || (
                <>
                    {/* My dashboard */}
                    <li>
                        <NavLink
                            to={"/dashboard/my-dashboard"}
                            className={({ isActive }) =>
                                `text-[16px] font-semibold hover:text-[#8d1f3a] ${isActive ? "text-[#8d1f3a] border-b-2" : "text-black"}`
                            }>
                            <button
                                className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="My Dashboard">
                                {/* Home icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    fill="none"
                                    stroke="currentColor"
                                    className="my-1.5 inline-block size-6">
                                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                </svg>
                                <span className="is-drawer-close:hidden">
                                    My Dashboard
                                </span>
                            </button>
                        </NavLink>
                    </li>

                    {/* My donation request */}
                    <li>
                        <NavLink
                            to={"/dashboard/my-donation-requests"}
                            className={({ isActive }) =>
                                `text-[16px] font-semibold hover:text-[#8d1f3a] ${
                                    isActive
                                        ? "text-[#8d1f3a] border-b-2"
                                        : "text-black"
                                }`
                            }>
                            <button
                                className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="My Donation Requests">
                                {/* Blood request icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="my-1.5 inline-block size-6">
                                    <path d="M12 2C12 2 5 10 5 14a7 7 0 0 0 14 0c0-4-7-12-7-12z" />
                                    <path d="M12 9v6" />
                                    <path d="M9 12h6" />
                                </svg>

                                <span className="is-drawer-close:hidden">
                                    My Requests
                                </span>
                            </button>
                        </NavLink>
                    </li>
                    {/* Create Donation request */}
                    <li>
                        <NavLink
                            to={"/dashboard/create-donation-request"}
                            className={({ isActive }) =>
                                `text-[16px] font-semibold hover:text-[#8d1f3a] ${
                                    isActive
                                        ? "text-[#8d1f3a] border-b-2"
                                        : "text-black"
                                }`
                            }>
                            <button
                                className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Create Donation Request">
                                {/* Create request icon */}
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="my-1.5 inline-block size-6">
                                    <path d="M4 21h9.62a3.995 3.995 0 0 0 3.037-1.397l5.102-5.952a1 1 0 0 0-.442-1.6l-1.968-.656a3.043 3.043 0 0 0-2.823.503l-3.185 2.547-.617-1.235A3.98 3.98 0 0 0 9.146 11H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h5.146c.763 0 1.448.423 1.789 1.105l.447.895H7v2h6.014a.996.996 0 0 0 .442-.11l.003-.001.004-.002h.003l.002-.001h.004l.001-.001c.011.003.003-.001.003-.001.012 0 .002-.001.002-.001h.001l.002-.001.003-.001.002-.001.002-.001.003-.001.002-.001.002-.001.003-.002.002-.001.002-.001.003-.001.002-.001h.001l.002-.001h.001l.002-.001.002-.001c.011-.001.003-.001.003-.001l.002-.001a.915.915 0 0 0 .11-.078l4.146-3.317c.261-.208.623-.273.94-.167l.557.186-4.133 4.823a2.029 2.029 0 0 1-1.52.688H4v-6zm9.761-10.674C13.3 2.832 11 5.457 11 7.5c0 1.93 1.57 3.5 3.5 3.5S18 9.43 18 7.5c0-2.043-2.3-4.668-2.761-5.174-.379-.416-1.099-.416-1.478 0zM16 7.5c0 .827-.673 1.5-1.5 1.5S13 8.327 13 7.5c0-.708.738-1.934 1.5-2.934.762 1 1.5 2.226 1.5 2.934z"></path>
                                </svg>

                                <span className="is-drawer-close:hidden">
                                    Create Request
                                </span>
                            </button>
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );
    return (
        <section>
            <div className="drawer lg:drawer-open">
                <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full lg:hidden bg-base-300">
                        <label
                            htmlFor="my-drawer-4"
                            aria-label="open sidebar"
                            className="btn btn-ghost flex hover:text-[#8d1f3a]">
                            {/* Sidebar toggle icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2"
                                fill="none"
                                stroke="currentColor"
                                className="my-1.5 inline-block size-6">
                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                <path d="M9 4v16"></path>
                                <path d="M14 10l2 2l-2 2"></path>
                            </svg>
                            <span className="text-[16px] font-semibold is-drawer-close:hidden">
                                Open
                            </span>
                        </label>
                    </nav>
                    {/* Page content here */}
                    <div className="py-20 bg-gray-50">
                        <div className="max-w-7xl min-h-[calc(100vh-64px)] mx-auto px-4 sm:px-6 lg:px-8">
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-300 is-drawer-close:w-16 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            <li className="hover:text-[#8d1f3a]">
                                <label
                                    htmlFor="my-drawer-4"
                                    aria-label="open sidebar"
                                    className="flex items-center text-[16px] font-semibold gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                    data-tip="Open">
                                    {/* Sidebar toggle icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        fill="none"
                                        stroke="currentColor"
                                        className="my-1.5 inline-block size-6">
                                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                        <path d="M9 4v16"></path>
                                        <path d="M14 10l2 2l-2 2"></path>
                                    </svg>
                                    <span className="is-drawer-close:hidden">
                                        Close
                                    </span>
                                </label>
                            </li>
                            {dashboardLinks}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardLayout;
