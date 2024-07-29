import CustomButton from "@/components/ui/custom_button/custom_button";
import JobCard from "@/components/ui/job/job_card/job_card";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { useCreateDefaultJob } from "@/hooks/default_job_hooks/default_job_hooks";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

const AddDefaultJobs = ({
  jobs,
  adminJobs,
  showAddFor,
  defaultJobs,
  setDefaultJobs,
  noAdd = false,
}) => {
  const { industry, skill, isFree } = showAddFor;
  const { mutateAsync, isLoading } = useCreateDefaultJob();

  const addDefaultJob = async (job) => {
    try {
      const newDefaultJob = {
        job_id: job.is_admin_job ? null : job.id,
        admin_job_id: job.is_admin_job ? job.id : null,
        employer_id: job?.employer_id || null,
        is_admin_job: job.is_admin_job || false,
        skill,
        industry,
        is_free: isFree,
      };

      const res = await mutateAsync([newDefaultJob]);

      setDefaultJobs((prev) => {
        if (job.is_admin_job) {
          const x = { ...res?.data, adminjob: job };
          return [x, ...prev];
        } else {
          const x = { ...res?.data, job, employer: job?.employer };
          return [x, ...prev];
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [availableAdminJobs, setAvailableAdminJobs] = useState([]);
  const [availableEmployerJobs, setAvailableEmployerJobs] = useState([]);

  useEffect(() => {
    if (skill) {
      setAvailableAdminJobs(
        adminJobs.filter((aj) => {
          return (
            aj.skills.includes(skill) &&
            !defaultJobs.some(
              (dj) => dj.skill === skill && dj.admin_job_id === aj.id
            )
          );
        })
      );

      setAvailableEmployerJobs(
        jobs.filter((aj) => {
          return (
            aj.skills.includes(skill) &&
            !defaultJobs.some((dj) => dj.skill === skill && dj.job_id === aj.id)
          );
        })
      );
    }
  }, [skill, adminJobs, jobs, defaultJobs]);

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <br />
      <h5>Admin Jobs</h5>
      <Row>
        {availableAdminJobs.map((fj) => {
          return (
            <JobCard
              key={fj.id}
              job={fj}
              employer={fj?.employer}
              actionButton={
                <CustomButton
                  onClick={(e) => {
                    e.stopPropagation();
                    addDefaultJob(fj);
                  }}
                  disabled={noAdd}
                >
                  Add
                </CustomButton>
              }
            />
          );
        })}
      </Row>
      <hr />
      <h5>Employer Jobs</h5>
      <Row>
        {availableEmployerJobs.map((fj) => {
          return (
            <JobCard
              key={fj.id}
              job={fj}
              employer={fj?.employer}
              actionButton={
                <CustomButton
                  onClick={(e) => {
                    e.stopPropagation();
                    addDefaultJob(fj);
                  }}
                  disabled={noAdd}
                >
                  Add
                </CustomButton>
              }
            />
          );
        })}
      </Row>
      <br />
    </div>
  );
};

export default AddDefaultJobs;
