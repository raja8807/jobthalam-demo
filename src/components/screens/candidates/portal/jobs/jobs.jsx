import MainFrame from "@/components/ui/main_frame/main_frame";
import React from "react";
import NoJobs from "./no_jobs/no_jobs";
import FeaturedJobs from "./featured_jobs/featured_jobs";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const Jobs = ({ currentUser, allJobs = [], isLoading, setCurrentTabIndex }) => {
  if (isLoading || !currentUser) {
    return <LoadingScreen />;
  }

  if (allJobs?.adminJobs?.[0] || allJobs?.employerJobs?.[0]) {
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
      <NoJobs
        setCurrentTabIndex={setCurrentTabIndex}
        currentUser={currentUser}
      />
    </>
  );
};

export default Jobs;
