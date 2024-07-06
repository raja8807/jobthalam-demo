import CustomContainer from "@/components/ui/custom_container/custom_container";
import Tabs from "@/components/ui/tabs/tabs";
import React, { useEffect, useState } from "react";
import { Briefcase, ClipboardCheck } from "react-bootstrap-icons";
import JobRequests from "./tabs/joo_requests/joo_requests";
import { getAllData } from "@/libs/firebase/firebase";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import ManageJobs from "./tabs/create_job/manage_jobs";

const AdminScreen = ({ session }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [allAdminJobs, setAllAdminJobs] = useState([]);

  const fetchAllJobs = async () => {
    setIsLoading(true);
    try {
      const res = await getAllData("Request");
      const jobs = await getAllData("Job");
      const adminJobs = await getAllData("Admin_job");
      setRequests(res);
      setAllJobs(jobs);
      setAllAdminJobs(adminJobs);
    } catch (err) {
      console.log("job request error", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  //   console.log(allAdminJobs);

  const tabs = [
    {
      id: "reqs",
      title: "Job Requests",
      icon: <ClipboardCheck />,
      component: (
        <JobRequests
          allJobs={allJobs}
          setAllJobs={setAllJobs}
          setIsLoading={setIsLoading}
          requests={requests}
          allAdminJobs={allAdminJobs}
     
        />
      ),
    },
    {
      id: "nrw",
      title: "Admin Jobs",
      icon: <Briefcase />,
      component: (
        <ManageJobs
          allJobs={allAdminJobs}
          setAllJobs={setAllAdminJobs}
        
        />
      ),
    },
  ];

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const currentTab = tabs[currentTabIndex];

  return (
    <CustomContainer>
      {isLoading && <LoadingScreen />}
      <Tabs
        tabs={tabs}
        currentTab={currentTab}
        onTabChange={(tab, index) => {
          setCurrentTabIndex(index);
        }}
      />
      {currentTab?.component}
    </CustomContainer>
  );
};

export default AdminScreen;
