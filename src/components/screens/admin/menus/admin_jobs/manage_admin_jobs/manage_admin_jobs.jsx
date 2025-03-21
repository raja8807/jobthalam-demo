import React, { useEffect, useState } from "react";
import CustomForm from "../../../../../ui/custom_form/custom_form";
import { useFetchAllAdminJobs } from "../../../../../../hooks/admin_job_hooks/admin_job_hooks";
import CustomButton from "../../../../../ui/custom_button/custom_button";
import { PlusCircleFill } from "react-bootstrap-icons";
import ActiveJobs from "./tabs/paid_jobs/active_jobs";
import CustomTabs from "@/components/ui/tabs/tabs";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const ManageAdminJobsScreen = () => {
  const { data, isLoading: adminJobsIsLoading } = useFetchAllAdminJobs();
  const isLoading = adminJobsIsLoading;

  const [jobsData, setJobsData] = useState([]);

  const tabs = [
    {
      title: "Paid Jobs",
      where: {
        status: "Active",
        is_free: false,
      },
    },
    {
      title: "Free Jobs",
      where: {
        status: "Active",
        is_free: true,
      },
    },
    {
      title: "Deleted Jobs",
      isDeletedTab: true,
      where: {
        status: "Deleted",
        is_free: "Any",
      },
    },
  ];

  const [currentTab, setCurrentTab] = useState(tabs[0]);

  useEffect(() => {
    if (data?.data && !jobsData?.[0]) {         
      setJobsData(data?.data);
    }
  }, [data]);

  
  

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <CustomTabs
        tabs={tabs}
        stayTop
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div>
        
        <ActiveJobs
          jobsData={jobsData?.filter((j) => {

            if (currentTab?.where?.is_free === "Any") {
              return j.status === currentTab?.where?.status;
            }

            return (
              j.status === currentTab?.where?.status &&
              j.is_free === currentTab?.where?.is_free
            );
          })}
          isLoading={isLoading}
          isDeletedTab={currentTab?.isDeletedTab}
          setJobsData={setJobsData}
        />
      </div>
    </div>
  );
};

export default ManageAdminJobsScreen;
