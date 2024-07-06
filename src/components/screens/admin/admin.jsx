import CustomContainer from "@/components/ui/custom_container/custom_container";
import Tabs from "@/components/ui/tabs/tabs";
import React, { useEffect, useState } from "react";
import { ClipboardCheck } from "react-bootstrap-icons";
import JobRequests from "./tabs/joo_requests/joo_requests";

const AdminScreen = ({ session }) => {
  const tabs = [
    {
      id: "reqs",
      title: "Job Requests",
      icon: <ClipboardCheck />,
      component: <JobRequests />,
    },
  ];

  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <CustomContainer>
      <Tabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab?.component}
    </CustomContainer>
  );
};

export default AdminScreen;