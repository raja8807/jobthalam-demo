import CustomContainer from "@/components/ui/custom_container/custom_container";
import Tabs from "@/components/ui/tabs/tabs";
import React, { useEffect, useState } from "react";
import { Briefcase, ClipboardCheck } from "react-bootstrap-icons";
import JobRequests from "./tabs/joo_requests/joo_requests";
import { getAllData } from "@/libs/firebase/firebase";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import ManageJobs from "./tabs/create_job/manage_jobs";
import { useFetchAllRequests } from "@/hooks/request_hooks/request_hooks";
import { useFetchAllJobs } from "@/hooks/job_hooks/job_hooks";

const AdminScreen = ({ session }) => {
  const [allJobs, setAllJobs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [allAdminJobs, setAllAdminJobs] = useState([]);

  const { mutateAsync: fetchAllRequests, isLoading: requestIsLoading } =
    useFetchAllRequests();

  const { mutateAsync: fetchAllJobsAsync, isLoading: allJobsIsLoading } =
    useFetchAllJobs();

  const isLoading = requestIsLoading || allJobsIsLoading;

  const fetchAllJobs = async () => {
    try {
      const res = await fetchAllRequests();
      const jobs = await fetchAllJobsAsync();
      const adminJobs = await getAllData("Admin_job");
      setRequests(res.data);
      setAllJobs(jobs?.data);
      setAllAdminJobs(adminJobs);
    } catch (err) {
      console.log("job request error", err);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);


  const tabs = [
    {
      id: "reqs",
      title: "Job Requests",
      icon: <ClipboardCheck />,
      component: (
        <JobRequests
          allJobs={allJobs}
          setAllJobs={setAllJobs}
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
        <ManageJobs allJobs={allAdminJobs} setAllJobs={setAllAdminJobs} />
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
