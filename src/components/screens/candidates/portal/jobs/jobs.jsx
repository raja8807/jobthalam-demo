import MainFrame from "@/components/ui/main_frame/main_frame";
import React from "react";
import NoJobs from "./no_jobs/no_jobs";
import JobTable from "@/components/jobs/job_table/job_table";
import { Row } from "react-bootstrap";
import JobCard from "@/components/ui/job/job_card/job_card";
import CustomButton from "@/components/ui/custom_button/custom_button";
import FeaturedJobs from "./featured_jobs/featured_jobs";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const Jobs = ({ currentUser, allJobs = [], isLoading, setCurrentTabIndex }) => {
  if (isLoading || !currentUser) {
    return <LoadingScreen />;
  }

  if (allJobs?.[0]) {
    return (
      <MainFrame
        head={`Hello, ${currentUser.first_name} ${currentUser.last_name}`}
        caption={
          allJobs?.[0] &&
          "Welcome to Jobthalam, Here are the jobs that suits for you!"
        }
      >
        <FeaturedJobs allJobs={allJobs} currentUser={currentUser} />
      </MainFrame>
    );
  }

  return (
    <>
      <NoJobs setCurrentTabIndex={setCurrentTabIndex} />
    </>
  );
};

export default Jobs;
