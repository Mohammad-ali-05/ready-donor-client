import React from "react";
import Banner from "./components/Banner";
import ContactUs from "./components/ContactUs";
import LatestDonationRequest from "./components/LatestDonationRequest";

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <LatestDonationRequest></LatestDonationRequest>
            <ContactUs></ContactUs>
        </>
    );
};

export default Home;
