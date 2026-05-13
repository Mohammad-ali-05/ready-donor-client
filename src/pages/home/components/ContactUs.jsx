import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

const ContactUs = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-40">
                    <div className="flex flex-col justify-center items-start">
                        <h2 className="text-4xl md:text-5xl text-center lg:text-left font-bold mb-6">
                            Contact Us
                        </h2>
                        <p className="text-xl text-gray-700 font-medium mb-8">
                            A single donor can become someone’s hero. Reach out
                            to us anytime for support, donation guidance, or
                            emergency assistance. Together, we can make a
                            difference.
                        </p>
                        <div className="flex flex-col gap-7.5">
                            <div className="text-xl flex items-center gap-11">
                                <FiPhoneCall className="text-[#46052D]" />{" "}
                                <p>01891836487</p>
                            </div>
                            <div className="text-xl flex items-center gap-11">
                                <MdOutlineMail className="text-[#46052D]" />
                                <p>readydonor@donor.com</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card bg-base-100 w-full shadow-2xl">
                            <div className="card-body">
                                <form>
                                    <fieldset className="fieldset space-y-4">
                                        <div>
                                            <label className="label font-semibold">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="label font-semibold">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="input input-bordered w-full"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div>
                                            <label className="label font-semibold">
                                                Message
                                            </label>
                                            <textarea
                                                className="textarea textarea-bordered w-full h-30"
                                                name="message"
                                                placeholder="Write your message..."></textarea>
                                        </div>
                                        <button className="text-lg text-white font-semibold bg-linear-to-r rounded-md from-[#B32346] to-[#46052D] h-10 px-4 hover:opacity-85">
                                            Contact Us
                                        </button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
