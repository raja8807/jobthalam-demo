import { useFetchAllSubmissions } from "@/hooks/form_hooks/internship_hooks";
import React, { useState } from "react";
import * as XLSX from "xlsx";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the Data Grid
import { formatDate } from "@/utils/helpers/helpers";
import { Eye } from "react-bootstrap-icons";
import JobDetails from "@/components/jobs/job_details/job_details";
import CustomButton from "@/components/ui/custom_button/custom_button";

const InternshipSubmissions = () => {
  const { data, isLoading } = useFetchAllSubmissions();
  const [showJobDetailFor, setSHowJobDetailsFor] = useState(null);

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(
      data?.data.map((d) => ({
        ...d,
        ...d.AdminJob,
      }))
    );

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Automatically triggers download
    XLSX.writeFile(workbook, "internship_submission_data.xlsx");
  };

  return (
    <div>
      <CustomButton onClick={exportToExcel}>Download As Xlsx</CustomButton>
      <br />
      <br />
      <div
        className="ag-theme-balham" // applying the Data Grid theme
        style={{ height: "calc(100dvh - 300px)", fontSize: "14px" }} // the Data Grid will fill the size of the parent container
      >
        {showJobDetailFor && (
          <JobDetails job={showJobDetailFor} setJob={setSHowJobDetailsFor} />
        )}
        <AgGridReact
          loading={isLoading}
          rowData={
            data?.data
              ? data?.data.map((row, idx) => {
                  return {
                    ...row,
                    index: idx + 1,
                  };
                })
              : []
          }
          rowStyle={{
            cursor: "pointer",
            padding: "5px 0",
          }}
          rowHeight={40}
          unSortIcon
          columnDefs={[
            {
              field: "index",
              headerName: "#",
              width: 100,
            },
            {
              field: "name",
              filter: true,
            },
            {
              field: "phone",
            },
            {
              field: "email",
            },
            {
              field: "department",
            },
            {
              field: "year",
            },

            {
              field: "duration",
            },
            {
              field: "AdminJob.company_name",
            },

            {
              field: "createdAt",
              headerName: "Created on",
              cellDataType: "date",
              filter: true,
              valueFormatter: (d) => formatDate(d),
            },
            {
              field: "View",
              cellRenderer: (row) => {
                return (
                  <Eye
                    onClick={() => {
                      setSHowJobDetailsFor(row.data);
                    }}
                  />
                );
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default InternshipSubmissions;
