import CustomButton from "@/components/ui/custom_button/custom_button";
import MainFrame from "@/components/ui/main_frame/main_frame";
import React, { useState } from "react";
import NewJob from "./new_job/new_job";
import JobCard from "@/components/ui/job/job_card/job_card";
import { Row } from "react-bootstrap";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { formatDate } from "@/utils/helpers/helpers";
import { useFetchEmployerJobs } from "@/api-hooks/employer_job_hooks/employer_job.hooks";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const ManageJobs = ({ currentUser }) => {
  const [showNewJob, setShowNewJob] = useState(false);

  const { data, isLoading } = useFetchEmployerJobs(currentUser.id);

  return (
    <MainFrame
      head={
        !showNewJob &&
        `Hello ${currentUser?.first_name} ${currentUser?.last_name} from ${currentUser.company_name}`
      }
      caption={!showNewJob && "Here are the jobs posted by you"}
      rightElement={
        <CustomButton
          onClick={() => {
            // if (currentUser?.jobs_pending) {
            setShowNewJob("new");
            // } else {
            // setCurrentTabIndex(2);
            // }
          }}
        >
          Post New Job
        </CustomButton>
      }
    >
      {isLoading && <LoadingScreen />}
      {showNewJob ? (
        <NewJob
          setShowNewJob={setShowNewJob}
          currentUser={currentUser}
          showNewJob={showNewJob}
          isUpdate={showNewJob != "new"}
        />
      ) : (
        <>
          <div
            className="ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 450 }} // the Data Grid will fill the size of the parent container
          >
            <AgGridReact
              rowData={data || []}
              onRowClicked={(jobRow) => {
                // console.log(jobRow.rowIndex);

                setShowNewJob({ job: jobRow?.data, index: jobRow?.rowIndex });
              }}
              rowStyle={{
                cursor: "pointer",
              }}
              unSortIcon
              columnDefs={[
                {
                  field: "title",
                },
                {
                  field: "role",
                },
                {
                  field: "createdAt",
                  headerName: "Posted on",
                  cellDataType: "date",
                  filter: true,
                  valueFormatter: (d) => {
                    return formatDate(d.value);
                  },
                },

                {
                  field: "experience",
                  width: 100,
                },
                {
                  field: "education",
                },
                {
                  field: "type",
                  width: 100,
                },
                {
                  field: "status",
                  width: 100,
                },
                {
                  field: "salary",
                  width: 120,
                  cellDataType: "number",
                  filter: true,
                  sortable: true,
                  valueFormatter: (s) => {
                    return parseFloat(s.value);
                  },
                },
                {
                  field: "location",
                  width: 120,
                },
                {
                  field: "skills",
                  width: 120,
                  valueFormatter: (r) => {
                    const skills = r.value;
                    return skills?.[0]
                      ? skills.map((s) => s.name).join(", ")
                      : "";
                  },
                },
              ]}
            />
          </div>

          {/* <Row>
            {allJobs.map((job, index) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  actionButton={
                    <CustomButton
                      onClick={() => {
                        setShowNewJob({ job, index });
                      }}
                    >
                      Edit
                    </CustomButton>
                  }
                />
              );
            })}
          </Row> */}
        </>
      )}
    </MainFrame>
  );
};

export default ManageJobs;
