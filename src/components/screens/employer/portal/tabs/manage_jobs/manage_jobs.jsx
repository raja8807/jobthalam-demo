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

const ManageJobs = ({
  allJobs: data,
  setAllJobs,
  currentUser,
  setCurrentTabIndex,
  setAllSkills,
  allSkills,
  setCurrentUser,
}) => {
  const [showNewJob, setShowNewJob] = useState(false);

  const allJobs = data
    ? data.map((jobData) => {
        return {
          ...jobData,
          // createdAt: formatDate(jobData?.createdAt),
          createdAt: new Date(jobData?.createdAt),
          salary: parseInt(jobData?.salary, 10),
        };
      })
    : [];

  return (
    <MainFrame
      head={!showNewJob && `Hello ${currentUser?.first_name} ${currentUser?.last_name} from ${currentUser.company_name}`}
      caption={!showNewJob && "Here are the jobs posted by you"}
    >
      {showNewJob ? (
        <NewJob
          setShowNewJob={setShowNewJob}
          currentUser={currentUser}
          showNewJob={showNewJob}
          setAllJobs={setAllJobs}
          setAllSkills={setAllSkills}
          allSkills={allSkills}
          isUpdate={showNewJob != "new"}
          setCurrentUser={setCurrentUser}
        />
      ) : (
        <>
          <CustomButton
            onClick={() => {
              if (currentUser?.jobs_pending) {
                setShowNewJob("new");
              } else {
                setCurrentTabIndex(2);
              }
            }}
          >
            Post New Job
          </CustomButton>
          <br />
          <br />

          <div
            className="ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 500 }} // the Data Grid will fill the size of the parent container
          >
            <AgGridReact
              rowData={allJobs}
              onRowClicked={(jobRow) => {
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
                  valueFormatter: (d) => formatDate(d),
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
                },
                {
                  field: "location",
                  width: 120,
                },
                {
                  field: "skills",
                  width: 120,
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
