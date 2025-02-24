import CustomTabs from "@/components/ui/tabs/tabs";
import React, { useState } from "react";
import AboutPageTab from "./tabs/about_page/about_page";
import HomePageTab from "./tabs/home_page/home_page";

const CandidateLandingScreen = ({ aboutData }) => {
  const tabs = [
    {
      title: "Home",
      component: <HomePageTab />,
    },
    {
      title: "About",
      component: <AboutPageTab aboutData={aboutData} />,
    },
  ];

  const [currenTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div>
      <CustomTabs
        tabs={tabs}
        currentTab={currenTab}
        setCurrentTab={setCurrentTab}
        stayTop
      />
      {currenTab.component}
    </div>
  );
};

export default CandidateLandingScreen;
