import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import useFetchAllCandidates from "@/hooks/api_hooks/candidates_hooks/candidates_hooks";
import { AgGridReact } from "ag-grid-react";
import React from "react";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the Data Grid
import { formatDate } from "@/utils/helpers/helpers";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { BriefcaseFill, Download, XCircleFill } from "react-bootstrap-icons";

const ManageCandidatesScreen = () => {
  const { data, isLoading } = useFetchAllCandidates();

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <div
        className="ag-theme-balham" // applying the Data Grid theme
        style={{ height: "calc(100dvh - 150px)", fontSize: "13px" }} // the Data Grid will fill the size of the parent container
      >
        {data && (
          <AgGridReact
            rowData={data}
            isLoading={isLoading}
            rowStyle={{
              
              padding: "5px 0",
            }}
            rowHeight={40}
            unSortIcon
            columnDefs={[
              //   {
              //     field: "index",
              //     headerName: "#",
              //     width: 100,
              //   },
              {
                headerName: "Candidate",
                width: 220,
                valueGetter: (row) => {
                  return `${row?.data?.first_name} ${row?.data?.last_name}`;
                },
              },

              {
                field: "createdAt",
                headerName: "signed up on",
                cellDataType: "date",
                filter: true,
                valueFormatter: (d) => formatDate(d),
              },

              {
                field: "dob",
              },
              {
                field: "education",
              },

              {
                field: "experience",
              },

              {
                field: "email",
              },
              {
                field: "phone_number",
              },
              {
                field: "whatsapp_number",
              },

              {
                field: "free_requested",
              },
              {
                field: "gender",
              },

              {
                field: "skills",
              },

              {
                field: "updatedAt",
                headerName: "Last updated",
                cellDataType: "date",
                filter: true,
                valueFormatter: (d) => formatDate(d),
              },

              {
                headerName: "Actions",
                cellRenderer: (row) => {
                  return (
                    <>
                      <Download
                        style={{
                          color: "blue",
                        }}
                      />
                      &nbsp; &nbsp;
                      <BriefcaseFill
                        style={{
                          color: "orange",
                        }}
                      />
                      &nbsp; &nbsp;
                      <XCircleFill
                        style={{
                          color: "red",
                        }}
                      />
                    </>
                  );
                },
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default ManageCandidatesScreen;
