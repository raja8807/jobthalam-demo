import React from "react";
import styles from "./job_table.module.scss";
import { Col, Row } from "react-bootstrap";
import JobPreviewRow from "../job_preview_row/job_preview_row";

const JobTable = ({
  title,
  hasDateApplied,
  jobs = [],
  dateColName = "Date Applied",
  actionBtnText,
  onActionClick,
}) => {
  return (
    <div className={styles.JobTable}>
      <div className={styles.title}>
        <p>
          {title} <span>({jobs.length})</span>
        </p>
      </div>

      <div className={styles.tHead}>
        <Row>
          <Col md={hasDateApplied ? 5 : 8}>
            <p>Job</p>
          </Col>
          {hasDateApplied && (
            <Col md={3}>
              <p>{dateColName}</p>
            </Col>
          )}
          <Col md={1}>
            <p
              style={{
                textAlign: "center",
              }}
            >
              Status
            </p>
          </Col>
          <Col md={3}>
            <p
              style={{
                textAlign: "center",
              }}
            >
              Action
            </p>
          </Col>
        </Row>
      </div>

      {jobs.map((job) => {
        return (
          <JobPreviewRow
            key={job.id}
            hasDateApplied={hasDateApplied}
            job={job}
            dateColName={dateColName}
            actionBtnText={actionBtnText}
            onActionClick={onActionClick}
          />
        );
      })}
    </div>
  );
};

export default JobTable;
