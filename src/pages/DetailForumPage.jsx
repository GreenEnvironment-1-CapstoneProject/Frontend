import React from "react";
import Navbar from "../components/Navbar";
import Detail from "../components/DetailForumPage/Detail";
import Footer from "../components/Footer";
import StickyCtaButton from "../components/StickyCtaButton";
const DetailForumPage = () => {
    return <div className="bg-secondary">
        <Navbar active="forum" />
        <div className="min-h-screen">
        <Detail />
        </div>
        <Footer />
        <StickyCtaButton />
    </div>;
};

export default DetailForumPage;