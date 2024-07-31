import CustomButton from "@/components/ui/custom_button/custom_button";
import MainFrame from "@/components/ui/main_frame/main_frame";
import React, { useState } from "react";
import NewJob from "./new_job/new_job";
import JobCard from "@/components/ui/job/job_card/job_card";
import { Row } from "react-bootstrap";
import UploadJobs from "./upload_jobs/upload_jobs";

const ManageJobs = ({ allJobs, setAllJobs }) => {
  const [showNewJob, setShowNewJob] = useState(false);

  const [screen, setScreen] = useState("list");

  return (
    <MainFrame>
      {screen === "form" && (
        <NewJob
          setShowNewJob={setShowNewJob}
          showNewJob={showNewJob}
          setScreen={setScreen}
          setAllJobs={setAllJobs}
          isUpdate={showNewJob != "new"}
        />
      )}

      {screen == "list" && (
        <>
          <CustomButton
            onClick={() => {
              setShowNewJob("new");
            }}
          >
            Post New Job
          </CustomButton>
          &nbsp; &nbsp;
          <CustomButton
            onClick={() => {
              setScreen("upload");
            }}
            variant={2}
          >
            Upload xls
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
                        setScreen("form");
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

      {screen == "upload" && (
        <UploadJobs setAllJobs={setAllJobs} setScreen={setScreen} />
      )}
    </MainFrame>
  );
};

export default ManageJobs;
