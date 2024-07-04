import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import styles from "./job_preview_row.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { Check2, CurrencyRupee, GeoAlt } from "react-bootstrap-icons";
import JobDetails from "../job_details/job_details";

const JobPreviewRow = ({
  hasDateApplied,
  job,
  dateColName = "Date Applied",
  actionBtnText ,
  onActionClick
}) => {
  const [showDetailsFor, setShowDetailsFor] = useState(null);

  return (
    <div
      className={styles.JobPreviewRow}
      onClick={() => {
        setShowDetailsFor(job);
      }}
    >
      {showDetailsFor && (
        <JobDetails
          job={showDetailsFor}
          setJob={setShowDetailsFor}
          actionBtnText={actionBtnText}
          onActionClick={onActionClick}
        />
      )}
      <Row>
        <Col xs={12} md={hasDateApplied ? 5 : 8}>
          <div className={styles.col}>
            <div className={styles.job_details}>
              <div>
                <Image
                  src={
                    job?.company?.logo_url || "/company_logo_placeholder.png"
                  }
                  alt="company_logo"
                  width={50}
                />
              </div>

              <div className={styles.right}>
                <div className={styles.top}>
                  <p className={styles.job_name}>{job.title}</p>
                  <p className={styles.job_type}>{job.type}</p>
                </div>

                <div className={styles.bottom}>
                  <p className={styles.job_location}>
                    <GeoAlt /> {job.location}
                  </p>
                  {job.min_salary > 0 && (
                    <p className={styles.job_salary}>
                      <CurrencyRupee /> {job.min_salary}{" "}
                      {job.max_salary &&
                        job.max_salary !== job.min_salary &&
                        `- ${job.max_salary}`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>
        {hasDateApplied && (
          <Col xs={12} md={3}>
            <div className={styles.col}>
              <div className={styles.date}>
                <span>{dateColName}:&nbsp;</span>
                {new Date(job.created_at).toLocaleDateString()}
              </div>
            </div>
          </Col>
        )}
        <Col xs={6} md={1}>
          <div className={`${styles.col} ${styles.center}`}>
            <div className={styles.status}>
              <Check2 /> Active
            </div>
          </div>
        </Col>
        <Col xs={6} md={3}>
          <div className={`${styles.col} ${styles.center} ${styles.action}`}>
            <CustomButton variant={3}>View Details</CustomButton>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default JobPreviewRow;
