import CustomTabs from "@/components/ui/tabs/tabs";
import React, { useState } from "react";
import AboutPageTab from "./tabs/about_page/about_page";
import HomePageTab from "./tabs/home_page/home_page";
import GeneralTab from "./tabs/general/general_tab";
import ContactPageTab from "./tabs/contact_page/contact_page";

const EmployerLandingScreen = ({ aboutData, employerHomePageData }) => {
  const tabs = [
    {
      title: "Home",
      component: (
        <HomePageTab homePageData={employerHomePageData.homePageData} />
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
          employerContactData={employerHomePageData.employerContactData?.[0]}
        />
      ),
    },
    {
      title: "General",
      component: (
        <GeneralTab
          employerFaqData={employerHomePageData.employerFaqData}
          employerTestimonialsData={
            employerHomePageData.employerTestimonialsData
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

export default EmployerLandingScreen;
