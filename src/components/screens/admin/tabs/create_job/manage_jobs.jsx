import CustomButton from "@/components/ui/custom_button/custom_button";
import MainFrame from "@/components/ui/main_frame/main_frame";
import React, { useCallback, useMemo, useRef, useState } from "react";
import NewJob from "./new_job/new_job";
import UploadJobs from "./upload_jobs/upload_jobs";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the Data Grid
import { formatDate } from "@/utils/helpers/helpers";
import Tabs from "@/components/ui/tabs/tabs";

const ManageJobs = ({ allJobs: data, setAllJobs, skills, employerJobs }) => {
  // console.log(employerJobs);

  const [showNewJob, setShowNewJob] = useState(false);

  const [screen, setScreen] = useState("list");

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const allJobs = data
    ? data.map((jobData) => {
        return {
          ...jobData,
          createdAt: new Date(jobData?.createdAt),
          salary: parseInt(jobData?.salary, 10),
        };
      })
    : [];

  const selectedRows = useRef([]);

  const selection = useMemo(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  const onSelectionChanged = useCallback((event) => {
    const rows = event.api.getSelectedRows();
    selectedRows.current = rows;
  }, []);

  const tabs = [
    {
      id: "reqs",
      title: "Admin Jobs",
      component: (
        <div
          className="ag-theme-balham" // applying the Data Grid theme
          style={{ height: 500 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
            rowData={allJobs}
            onRowClicked={(jobRow) => {
              setShowNewJob({ job: jobRow?.data, index: jobRow?.rowIndex });
              setScreen("form");
            }}
            selection={selection}
            onRowSelected={onSelectionChanged}
            rowStyle={{
              cursor: "pointer",
            }}
            rowHeight={40}
            unSortIcon
            columnDefs={[
              {
                field: "company_name",
                width: 120,
              },
              {
                field: "role",
                width: 100,
              },
              {
                field: "title",
                width: 130,
              },

              {
                field: "createdAt",
                headerName: "Posted on",
                cellDataType: "date",
                filter: true,
                width: 120,
                valueFormatter: (d) => formatDate(d),
              },

              {
                field: "experience",
                width: 100,
              },
              {
                field: "education",
                width: 120,
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
                field: "skills",
                width: 120,
                filter: true,
              },
              {
                field: "location",
                width: 120,
              },
            ]}
          />
        </div>
      ),
    },
    {
      id: "emplo",
      title: "Employer Jobs",
      component: (
        <div
          className="ag-theme-balham" // applying the Data Grid theme
          style={{ height: 500 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
            rowData={employerJobs}
            // onRowClicked={(jobRow) => {
            //   setShowNewJob({ job: jobRow?.data, index: jobRow?.rowIndex });
            //   setScreen("form");
            // }}
            selection={selection}
            onRowSelected={onSelectionChanged}
            rowStyle={{
              cursor: "pointer",
            }}
            rowHeight={40}
            unSortIcon
            columnDefs={[
              {
                field: "employer.company_name",
                width: 120,
                filter: true,
              },
              {
                field: "role",
                width: 100,
                filter: true,
              },
              {
                field: "title",
                width: 130,
              },

              {
                field: "createdAt",
                headerName: "Posted on",
                cellDataType: "date",
                filter: true,
                width: 120,
                valueFormatter: (d) => formatDate(d),
                filter: true,
              },

              {
                field: "experience",
                width: 100,
                filter: true,
              },
              {
                field: "education",
                width: 120,
                filter: true,
              },
              {
                field: "type",
                width: 100,
                filter: true,
              },
              {
                field: "status",
                width: 100,
                filter: true,
              },
              {
                field: "salary",
                width: 120,
                cellDataType: "number",
                filter: true,
              },
              {
                field: "skills",
                width: 120,
                filter: true,
              },
              {
                field: "location",
                width: 120,
              },
            ]}
          />
        </div>
      ),
    },
  ];

  const currentTab = tabs[currentTabIndex];

  return (
    <MainFrame>
      {screen === "form" && (
        <NewJob
          setShowNewJob={setShowNewJob}
          showNewJob={showNewJob}
          setScreen={setScreen}
          setAllJobs={setAllJobs}
          isUpdate={showNewJob != "new"}
          skills={skills}
        />
      )}

      {screen == "list" && (
        <>
          <CustomButton
            onClick={() => {
              setShowNewJob("new");
              setScreen("form");
            }}
          >
            Post New Job
          </CustomButton>
          &nbsp; &nbsp; &nbsp;
          <CustomButton
            variant={2}
            onClick={() => {
              if (!selectedRows.current?.[0]) {
                alert("No rows Selected");
              }
            }}
          >
            Delete Selected Jobs
          </CustomButton>
          <br />
          <br />
          <Tabs
            tabs={tabs}
            currentTab={currentTab}
            onTabChange={(tab, index) => {
              setCurrentTabIndex(index);
            }}
            stayTop
          />
          {currentTab?.component}
        </>
      )}

      {screen == "upload" && (
        <UploadJobs setAllJobs={setAllJobs} setScreen={setScreen} />
      )}
    </MainFrame>
  );
};

export default ManageJobs;
