import CustomTabs from "@/components/ui/tabs/tabs";
import React, { useState } from "react";
import AboutPageTab from "./tabs/about_page/about_page";
import HomePageTab from "./tabs/home_page/home_page";
import GeneralTab from "./tabs/general/general_tab";
import ContactPageTab from "./tabs/contact_page/contact_page";

const CandidateLandingScreen = ({ aboutData, candidateHomePageData }) => {

  console.log(candidateHomePageData);
  

  const candidateFaqData = [
    {
      question: " How frequently are jobs updated on Jobthalam?",
      answer:
        "We add new jobs all day, every day we want you to have access to the newest job listings available.",
    },
    {
      question: " How can I contact support if I have questions or issues?",
      answer:
        "For any questions or concerns you can reach out to us on our contact page. We will respond to your inquiry as soon as possible.",
    },
    {
      question: " Is it free to use Jobthalam for job searching?",
      answer:
        "Two free jobs offered with limited details, if you want to get the full details for 10 job alerts, you must sign up for Jobthalam Premium. Visit our pricing page to join jobthalam Premium.",
    },
    {
      question: " How do I enter my preferred Industry?",
      answer:
        "In update profile section you can select the (Industry) skills from the drop down menu.",
    },
    {
      question: " I don't see many jobs posted for my location.",
      answer:
        "Most executive and senor executive jobs no longer require relocation",
    },
    {
      question: " How do I post a job?",
      answer:
        "After registering your details and activating your account, you will be able to purchase plan via the portal. Each purchase will give you 10 job alerts with brief details.",
    },
    {
      question: " How can I edit my personal information?",
      answer:
        "You may edit your information via the website at any time by logging into your account.",
    },
    {
      question: " What information do Job seekers need to provide?",
      answer:
        "Job seekers need to provide a Name, valid email address, whatsApp number and DOB, to create an account. Once your account is created and verified, you can create your profile by providing your work experience, qualifications, upload your CV.",
    },
    {
      question: " What makes Jobthalam special?",
      answer:
        "As a job seeker, you can create an account via the Jobthalam website for free. Will be asked to create your profile, upload a CV that you can upload. After completing your profile, you will be able to receive 2 free jobs via whatsapp instantly, browse jobs, apply and manage job applications and receive notifications, all within the portal.",
    },
    {
      question: ".When will I start receiving candidates response?",
      answer: "You will receive a response within 48 Hours",
    },
    {
      question: " What type of payment you will accept? ",
      answer: "We accept all types of payment methods",
    },
  ];

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
      component: <ContactPageTab candidateContactData={candidateHomePageData.candidateContactData?.[0]} />,
    },
    {
      title: "General",
      component: (
        <GeneralTab  candidateFaqData={candidateHomePageData.candidateFaqData} />
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
