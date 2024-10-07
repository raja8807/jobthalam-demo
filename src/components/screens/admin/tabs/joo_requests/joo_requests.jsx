import MainFrame from "@/components/ui/main_frame/main_frame";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import RequestDetails from "./request_details/request_details";
import { formatDate } from "@/utils/helpers/helpers";
import styles from "./job_requests.module.scss";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the Data Grid

const JobRequests = ({ allJobs, requests = [], allAdminJobs }) => {
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
          <>
            <div
              className="ag-theme-balham" // applying the Data Grid theme
              style={{ height: 500 }} // the Data Grid will fill the size of the parent container
            >
              <AgGridReact
                rowData={requests.map((req, idx) => {
                  return {
                    ...req,
                    index: idx + 1,
                  };
                })}
                onRowClicked={(reqRow) => {
                  // setShowNewJob({ job: jobRow?.data, index: jobRow?.rowIndex });
                  setShowDetailsFor(reqRow?.data);

                  // setScreen("form");
                }}
                // selection={selection}
                // onRowSelected={onSelectionChanged}
                rowStyle={{
                  cursor: "pointer",
                }}
                rowHeight={40}
                unSortIcon
                columnDefs={[
                  {
                    field: "index",
                    headerName: "#",
                  },
                  {
                    field: "count",
                  },
                  {
                    field: "jobs_sent",
                    filter: true,
                  },

                  {
                    field: "createdAt",
                    headerName: "Requested on",
                    cellDataType: "date",
                    filter: true,
                    valueFormatter: (d) => formatDate(d),
                  },
                  {
                    field: "payment_id",
                    valueFormatter: (pid) => pid.id || "Free",
                  },
                ]}
              />
            </div>
          </>
        )}
      </div>
    </MainFrame>
  );
};

export default JobRequests;
