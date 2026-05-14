import React from "react";
import { MdOutlineBloodtype } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
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
                        <p className="text-gray-300 text-sm mb-4">
                            Connecting donors with those in need through
                            technology and compassion. Every donation saves
                            lives.
                        </p>
                        <div className="flex gap-3">
                            <Link to={"/auth/register"}>
                                <button
                                    data-slot="button"
                                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground h-8 rounded-md gap-1.5 px-3 has-[&gt;svg]:px-2.5 bg-red-600 hover:bg-red-700">
                                    Donate Now
                                </button>
                            </Link>
                            <button
                                data-slot="button"
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[&gt;svg]:px-2.5">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="#events"
                                    className="text-gray-300 hover:text-white transition-colors">
                                    Blood Drives
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#centers"
                                    className="text-gray-300 hover:text-white transition-colors">
                                    Donation Centers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#chatbot"
                                    className="text-gray-300 hover:text-white transition-colors">
                                    AI Assistant
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors">
                                    Eligibility Check
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors">
                                    Blood Types Guide
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors">
                                    Emergency Contacts
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors">
                                    Medical Guidelines
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contact Us</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="lucide lucide-phone h-4 w-4 text-red-500"
                                    aria-hidden="true">
                                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                                </svg>
                                <span className="text-gray-300">
                                    Emergency: 911
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="lucide lucide-phone h-4 w-4 text-red-500"
                                    aria-hidden="true">
                                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                                </svg>
                                <span className="text-gray-300">
                                    +8801891836487
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="lucide lucide-mail h-4 w-4 text-red-500"
                                    aria-hidden="true">
                                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                                    <rect
                                        x="2"
                                        y="4"
                                        width="20"
                                        height="16"
                                        rx="2"></rect>
                                </svg>
                                <span className="text-gray-300">
                                    readydonor@donor.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © 2025 Ready Donor. All rights reserved. Saving
                            lives through technology.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
