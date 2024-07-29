import CustomButton from "@/components/ui/custom_button/custom_button";
import JobCard from "@/components/ui/job/job_card/job_card";
import { useCreateApplication } from "@/hooks/application_hooks/application_hooks";
import { useUpdateFeaturedJobs } from "@/hooks/featured_job_hooks/featured_job_hooks";
import { addData, updateData } from "@/libs/firebase/firebase";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { v4 } from "uuid";

const FeaturedJobs = ({ allJobs, currentUser, setAllJobs }) => {
  const [loadingJobId, setLoadingJobId] = useState(null);
  const { mutateAsync } = useCreateApplication();
  const { mutateAsync: updateFeaturedJob } = useUpdateFeaturedJobs();

  const applyJob = async (job, index) => {
    setLoadingJobId(job?.id);
    try {
      const res = await mutateAsync({
        candidate_id: currentUser?.id,
        job_id: job?.job?.id || null,
        admin_job_id: job?.adminjob?.id || null,
        request_id: job?.request_id,
        employer_id: job?.employer?.id || null,
        featured_job_id: job?.id,
      });

      console.log(res);

      if (res) {
        const updatedFeaturedJob = await updateFeaturedJob({
          id: job?.id,
          status: "Applied",
        });

        if (updatedFeaturedJob) {
          setAllJobs((prev) => {
            const fJobs = [...prev];
            fJobs[index] = { ...job, status: "Applied" };
            return fJobs;
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoadingJobId(null);
  };

  return (
    <Row>
      {allJobs.map((job, idx) => {
        return (
          <JobCard
            key={job.id}
            job={job}
            actionButton={
              job.status == "New" && (
                <CustomButton
                  onClick={async (e) => {
                    e.stopPropagation();
                    await applyJob(job, idx);
                  }}
                  isLoading={job.id === loadingJobId}
                  disabled={loadingJobId}
                >
                  Apply
                </CustomButton>
              )
            }
          />
        );
      })}
    </Row>
  );
};

export default FeaturedJobs;
