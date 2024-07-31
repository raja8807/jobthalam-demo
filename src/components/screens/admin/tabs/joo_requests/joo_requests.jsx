import MainFrame from "@/components/ui/main_frame/main_frame";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import RequestDetails from "./request_details/request_details";
import { formatDate } from "@/utils/helpers/helpers";
import styles from "./job_requests.module.scss";

const JobRequests = ({ allJobs, requests, allAdminJobs }) => {
  const [showDetailsFor, setShowDetailsFor] = useState(null);

  const titles = [
    {
      title: "Count",
    },
    {
      title: "Jobs Sent",
    },
    {
      title: "Requested On",
    },
    {
      title: "Payment Id",
    },
  ];

  return (
    <MainFrame>
      <div>
        {showDetailsFor ? (
          <RequestDetails
            request={showDetailsFor}
            setShow={setShowDetailsFor}
            allJobs={allJobs}
            allAdminJobs={allAdminJobs}
          />
        ) : (
          <Table striped responsive hover className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                {titles.map((t) => (
                  <th key={t.title}>{t.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((req, i) => {
                return (
                  <tr
                    key={req.id}
                    onClick={() => {
                      setShowDetailsFor(req);
                    }}
                  >
                    <td>{i + 1}</td>
                    <td>{req.count}</td>
                    <td>{req.jobs_sent}</td>
                    <td>{formatDate(req.createdAt)}</td>
                    <td>{req.payment_id || "Free"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
    </MainFrame>
  );
};

export default JobRequests;
