import React from "react";
import styles from "./about.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import WhoWeAreSection from "./sections/who_we_are/who_we_are";
import Footer from "@/components/layout/footer/footer";
import NewsLetterSection from "../home/sections/news_letter/news_letter";
import DiscoverSection from "../home/sections/discover/discover";
import RegisterSection from "../home/sections/register/register";

const AboutScreen = () => {
  return (
    <>
      <WhoWeAreSection />
      <DiscoverSection/>
      <RegisterSection/>
      <NewsLetterSection />
      <Footer />
    </>
  );
};

export default AboutScreen;
