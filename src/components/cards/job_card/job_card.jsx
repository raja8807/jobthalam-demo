import React, { useState } from "react";
import { Col, Image } from "react-bootstrap";
import styles from "./job_card.module.scss";
import { GeoAlt } from "react-bootstrap-icons";
import JobDetails from "@/components/jobs/job_details/job_details";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { useCreateApplication } from "@/api_hooks/candidate_hooks/application_hooks/application.hooks";

const JobCard = ({ jobData, isAdminJob, actionButton, featuredJob }) => {
  const employerData = {
    companyName: isAdminJob
      ? jobData.company_name
      : jobData.employer.company_name,

    companyPhone: isAdminJob
      ? jobData.company_phone_number
      : jobData.employer.phone_number,

    companyEmail: isAdminJob ? jobData.company_email : jobData.employer.email,

    companyHrName: isAdminJob
      ? jobData.company_hr_name
      : `${jobData.employer.first_name} ${jobData.employer.last_name}`,

    companyWebsite: isAdminJob
      ? jobData.company_website
      : jobData.employer.website_url,
  };

  const [showDetails, setShowDetails] = useState(false);

  const getStatus = () => {
    if (isAdminJob) {
      return "";
    }

    if (!featuredJob.application) {
      return "New";
    }

    return featuredJob.application.status;
  };

  return (
    <>
      <JobDetails
        job={showDetails}
        setJob={setShowDetails}
        employerData={employerData}
        actionButton={actionButton}
      />
      <Col xs={12} md={6} lg={4}>
        <div
          className={styles.JobCard}
          onClick={() => {
            setShowDetails(jobData);
          }}
        >
          <div className={styles.top}>
            <div className={styles.title}>
              <b>{jobData.title}</b>
              <p>{getStatus()}</p>
            </div>
            <div>
              <div>{jobData.type}</div>
              <p>Salary: ₹{jobData.salary}</p>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.logo}>
              <Image
                src="/company_logo_placeholder.png"
                alt="logo"
                width={55}
              />
            </div>

            <div>
              <p>{employerData.companyName}</p>
              <small>
                <GeoAlt />
                {jobData.location}
              </small>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default JobCard;
