import React from "react";
import WhoWeAreSection from "./sections/who_we_are/who_we_are";
import NewsLetterSection from "../home/sections/news_letter/news_letter";
import DiscoverSection from "../home/sections/discover/discover";
import RegisterSection from "../home/sections/register/register";

const AboutScreen = ({ aboutData }) => {
  return (
    <>
      <WhoWeAreSection aboutData={aboutData} />
      <DiscoverSection />
      <RegisterSection />
      <NewsLetterSection />
    </>
  );
};

export default AboutScreen;
