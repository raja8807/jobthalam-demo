import {
  useDeleteBulkInternshipSubmissions,
  useFetchAllSubmissions,
} from "@/hooks/form_hooks/internship_hooks";
import React, { useEffect, useRef, useState } from "react";
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
  const { data, isLoading: fetchIsLoading } = useFetchAllSubmissions();

  
  

  const [internshipSubmissions, setInternshipSubmissions] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setInternshipSubmissions(data?.data);
    }
  }, [data?.data]);

  const { mutateAsync, isLoading: deleteIsLoading } =
    useDeleteBulkInternshipSubmissions();

  const isLoading = fetchIsLoading || deleteIsLoading;

  const [showJobDetailFor, setSHowJobDetailsFor] = useState(null);

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(
      internshipSubmissions.map((d) => ({
        ...d,
        ...d.AdminJob,
      }))
    );

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Automatically triggers download
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const selectedRows = useRef([]);

  const handleDelete = async () => {
    try {
      await mutateAsync(selectedRows.current);
      setInternshipSubmissions((prev) => {
        return prev.filter((is) => {
          return !selectedRows.current.includes(is.id);
        });
      });

      selectedRows.current = [];
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CustomButton onClick={exportToExcel}>Download As Xlsx</CustomButton>
        <CustomButton onClick={handleDelete}>Delete Selected</CustomButton>
      </div>
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
          rowSelection={"multiple"}
          onSelectionChanged={(e) => {
            selectedRows.current = e.api.getSelectedRows().map((x) => x.id);
            // setSelectedRows();
          }}
          rowData={
            internshipSubmissions
              ? internshipSubmissions.map((row, idx) => {
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
