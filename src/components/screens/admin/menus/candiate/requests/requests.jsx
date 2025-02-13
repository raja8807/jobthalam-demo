import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import useAllRequests from "@/hooks/api_hooks/request_hooks/request_hooks";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the Data Grid

import { formatDate } from "@/utils/helpers/helpers";
import CustomButton from "@/components/ui/custom_button/custom_button";
import SendJobsScreen from "./send_jobs/send_jobs";
import { SendPlusFill } from "react-bootstrap-icons";

const RequestScreen = () => {
  const { data,isFetching} = useAllRequests();
  const [showSendJobsFor, setShowSendJobsFor] = useState(null);

  const isLoading = isFetching

  return (
    <div>
      {isLoading && <LoadingScreen />}
      {showSendJobsFor ? (
        <SendJobsScreen
          request={showSendJobsFor}
          setShowSendJobsFor={setShowSendJobsFor}
        />
      ) : (
        <div
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: "calc(100dvh - 200px)", fontSize: "14px" }} // the Data Grid will fill the size of the parent container
        >
          {data && (
            <AgGridReact
              rowData={data}
              isLoading={isLoading}
              rowStyle={{
                cursor: "pointer",
                // padding: "5px 0",
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
                    return `${row?.data?.candidate?.first_name} ${row?.data?.candidate?.last_name}`;
                  },
                },
                {
                  field: "count",
                  type: "number",
                },
                {
                  field: "jobs_sent",
                  type: "number",
                },
                {
                  field: "is_free",
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
                },
                {
                  headerName: "Actions",
                  cellRenderer: (row) => {
                    return (
                      <SendPlusFill
                        style={{
                          fontSize: "20px",
                          color: "darkgreen",
                        }}
                        onClick={() => {
                          setShowSendJobsFor(row?.data);
                        }}
                      />
                      //   <CustomButton
                      //     onClick={() => {
                      //       setShowSendJobsFor(row?.data);
                      //     }}
                      //   >
                      //     Send Jobs
                      //   </CustomButton>
                    );
                  },
                },
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RequestScreen;
