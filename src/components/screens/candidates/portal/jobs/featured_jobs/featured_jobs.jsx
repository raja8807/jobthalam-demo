import CustomButton from "@/components/ui/custom_button/custom_button";
import JobCard from "@/components/ui/job/job_card/job_card";
import { addData, updateData } from "@/libs/firebase/firebase";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { v4 } from "uuid";

const FeaturedJobs = ({ allJobs, currentUser, setAllJobs }) => {
  const [loadingJobId, setLoadingJobId] = useState(null);

  const applyJob = async (job, index) => {
    setLoadingJobId(job?.id);
    try {
      const application_id = v4();
      const created_at = new Date().toDateString();
      const isApplied = await addData(
        "Application",
        {
          id: application_id,
          job_id: job?.id,
          created_at,

          title: job?.title,
          type: job?.type,
          salary: job?.salary,
          company_name: job?.company_name,
          location: job?.location,
          employer_logo: job?.employer_logo,

          status: "Applied",
          candidate: {
            candidate_id: currentUser?.id,
            candidate_image: currentUser?.candidate_image || "",
            candidate_education: currentUser?.education,
            candidate_experience: currentUser?.experience,
            resume_url: currentUser?.resume_url || "",
          },
        },
        application_id
      );

      if (isApplied) {
        const updatedFeaturedJob = await updateData(
          "Featured",
          {
            ...job,
            application_id,
            status: "Applied",
          },
          job?.id
        );

        if (updatedFeaturedJob) {
          setAllJobs((prev) => {
            const fJobs = [...prev];
            fJobs[index] = updatedFeaturedJob;
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
