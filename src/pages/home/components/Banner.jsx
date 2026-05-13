import React from "react";
import heroImg1 from "../../../assets/images/blood-donate-1.jpg";
import heroImg2 from "../../../assets/images/blood-donate-2.jpg";
import heroImg3 from "../../../assets/images/blood-donate-3.jpg";
import heroImg4 from "../../../assets/images/blood-donate-4.jpg";
import heroImg5 from "../../../assets/images/blood-donate-5.jpg";
import heroImg6 from "../../../assets/images/blood-donate-6.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { Link } from "react-router";
import { FaHeartbeat } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";

const Banner = () => {
    return (
        <section className="relative bg-linear-to-br from-red-50 to-red-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col justify-center items-start">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Save Lives Through <br />{" "}
                            <span className="bg-linear-to-br from-[#B32346] to-[#46052D] bg-clip-text text-transparent">
                                Blood Donation
                            </span>
                        </h1>
                        <p className="text-lg text-gray-700 font-medium mb-8">
                            Every donation can save up to three lives. Join our
                            community of heroes and make a different tomorrow.
                            Your blood donation could be someone's second chance
                            at life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to={"/find-donor"}>
                                <button className="flex gap-2 items-center text-lg text-white font-semibold bg-linear-to-r rounded-md from-[#B32346] to-[#46052D] h-10 px-4 hover:opacity-85">
                                    <FaHeartbeat />
                                    Find a donor
                                </button>
                            </Link>
                            <Link to={"/auth/register"}>
                                <button className="flex gap-2 items-center text-lg text-black font-semibold rounded-md border border-gray-300 bg-white h-10 px-4 hover:opacity-70">
                                    <BiSolidDonateBlood />
                                    Become a donor
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Swiper
                            effect={"fade"}
                            loop={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            onClick={(swiper) => swiper.slideNext()}
                            modules={[Autoplay, EffectFade]}
                            className="w-full h-full rounded-3xl">
                            <SwiperSlide>
                                <img
                                    src={heroImg1}
                                    alt="Blood donation"
                                    className="w-full h-full object-cover rounded-3xl"
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                <img
                                    src={heroImg2}
                                    alt="Blood donation"
                                    className="w-full h-full object-cover rounded-3xl"
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                <img
                                    src={heroImg3}
                                    alt="Blood donation"
                                    className="w-full h-full object-cover rounded-3xl"
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                <img
                                    src={heroImg4}
                                    alt="Blood donation"
                                    className="w-full h-full object-cover rounded-3xl"
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                <img
                                    src={heroImg5}
                                    alt="Blood donation"
                                    className="w-full h-full object-cover rounded-3xl"
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                <img
                                    src={heroImg6}
                                    alt="Blood donation"
                                    className="w-full h-full object-cover rounded-3xl"
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
