import CustomTabs from "@/components/ui/tabs/tabs";
import React, { useState } from "react";
import AboutPageTab from "./tabs/about_page/about_page";
import HomePageTab from "./tabs/home_page/home_page";
import GeneralTab from "./tabs/general/general_tab";
import ContactPageTab from "./tabs/contact_page/contact_page";

const CandidateLandingScreen = ({ aboutData, candidateHomePageData }) => {
  console.log(candidateHomePageData);

  const tabs = [
    {
      title: "Home",
      component: (
        <HomePageTab homePageData={candidateHomePageData.homePageData} />
      ),
    },
    {
      title: "About",
      component: <AboutPageTab aboutData={aboutData} />,
    },
    {
      title: "Contact",
      component: (
        <ContactPageTab
          candidateContactData={candidateHomePageData.candidateContactData?.[0]}
        />
      ),
    },
    {
      title: "General",
      component: (
        <GeneralTab
          candidateFaqData={candidateHomePageData.candidateFaqData}
          candidateTestimonialsData={
            candidateHomePageData.candidateTestimonialsData
          }
        />
      ),
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
