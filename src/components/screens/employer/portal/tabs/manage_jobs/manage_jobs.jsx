import CustomButton from "@/components/ui/custom_button/custom_button";
import MainFrame from "@/components/ui/main_frame/main_frame";
import React, { useState } from "react";
import NewJob from "./new_job/new_job";
import JobCard from "@/components/ui/job/job_card/job_card";
import { Row } from "react-bootstrap";
import { PencilFill } from "react-bootstrap-icons";
import JobDetails from "@/components/jobs/job_details/job_details";

const ManageJobs = ({ allJobs, setAllJobs, currentUser }) => {
  const [showNewJob, setShowNewJob] = useState(false);

  return (
    <MainFrame
      head={`Hello ${currentUser?.first_name} ${currentUser?.last_name}`}
      caption="Here are jobs posted by you"
    >
      {showNewJob ? (
        <NewJob
          setShowNewJob={setShowNewJob}
          currentUser={currentUser}
          showNewJob={showNewJob}
          setAllJobs={setAllJobs}
          isUpdate={showNewJob != "new"}
        />
      ) : (
        <>
          <CustomButton
            onClick={() => {
              setShowNewJob("new");
            }}
          >
            Post New Job
          </CustomButton>
          <br />
          <br />

          <Row>
            {allJobs.map((job, index) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  actionButton={
                    <CustomButton
                      onClick={() => {
                        setShowNewJob({ job, index });
                      }}
                    >
                      Edit
                    </CustomButton>
                  }
                />
              );
            })}
          </Row>
        </>
      )}
    </MainFrame>
  );
};

export default ManageJobs;
