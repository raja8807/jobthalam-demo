import CustomButton from "@/components/ui/custom_button/custom_button";
import JobCard from "@/components/ui/job/job_card/job_card";
import React from "react";
import { Row } from "react-bootstrap";

const AdmimJobsTab = ({
  availableJobs,
  request,
  featuredJobs,
  newJobs,
  setNewJobs,
  setAvailableJobs,
}) => {


  // console.log(availableJobs);
  

  return (
    <Row>
      {availableJobs
        .filter((j) => {
          return !(
            // newJobs.some((nj) => nj?.admin_job_id == j.admin_job_id) ||
            featuredJobs.some((nj) => {
              // console.log(nj.is_admin_job);
              
              return nj?.admin_job_id == j?.id
            })
          );
        })
        .map((job) => {
          return (
            <JobCard
              key={job.id}
              job={job}
              employer={job?.employer}
              actionButton={
                !(request.count - request.jobs_sent <= newJobs.length) && (
                  <CustomButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setAvailableJobs((prev) =>
                       {
                        return  prev.filter((j) => j?.id !== job?.id)
                       }
                      );

                      setNewJobs((prev) => [job, ...prev]);
                    }}
                  >
                    Add
                  </CustomButton>
                )
              }
            />
          );
        })}
    </Row>
  );
};

export default AdmimJobsTab;
