import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the Data Grid
import { formatDate } from "@/utils/helpers/helpers";
import {
  ArrowClockwise,
  Download,
  EyeFill,
  PencilSquare,
  Trash,
} from "react-bootstrap-icons";
import CustomTabs from "@/components/ui/tabs/tabs";
import { useUpdateEmployerJob } from "@/hooks/job_hooks/job_hooks";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import JobForm from "@/components/screens/admin_old/tabs/create_job/job_form/job_form";
import JobCard from "@/components/ui/job/job_card/job_card";
import JobDetails from "@/components/jobs/job_details/job_details";
import CustomModal from "@/components/ui/custom_modal/custom_modal";

const EmployerJobsTable = ({ currentEmployer, setCurrentEmployer }) => {
  const tabs = [
    {
      title: "Paid Jobs",
      where: {
        status: "Active",
        is_free: false,
      },
    },
    {
      title: "Free Jobs",
      where: {
        status: "Active",
        is_free: true,
      },
    },
    {
      title: "Deleted Jobs",
      isDeletedTab: true,
      where: {
        status: "Deleted",
        is_free: "Any",
      },
    },
  ];

  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const { mutateAsync, isLoading } = useUpdateEmployerJob();

  const handleToggleFree = async (job, is_free) => {
    try {
      await mutateAsync({ ...job, is_free });
      setCurrentEmployer((prev) => {
        const emp = { ...prev };
        emp.jobs = emp.jobs.map((j) => ({
          ...j,
          is_free: j?.id === job.id ? is_free : j.is_free,
        }));
        return emp;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (job, status) => {
    try {
      await mutateAsync({ ...job, status: status });

      setCurrentEmployer((prev) => {
        const emp = { ...prev };
        emp.jobs = emp.jobs.map((j) => ({
          ...j,
          status: j?.id === job.id ? status : j.status,
        }));
        return emp;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [showDetailsFor, setShowDetailsFor] = useState(null);

  return (
    <>
      {isLoading && <LoadingScreen />}

      {showDetailsFor && (
        <JobDetails
          job={showDetailsFor}
          employer={currentEmployer}
          setJob={setShowDetailsFor}
        />
      )}

      <CustomTabs
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        stayTop
      />
      <div
        className="ag-theme-balham" // applying the Data Grid theme
        style={{ height: "calc(100dvh - 150px)", fontSize: "13px" }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={
            currentEmployer?.jobs?.[0]
              ? currentEmployer?.jobs?.filter((j) => {
                  if (currentTab?.where?.is_free === "Any") {
                    return j.status === currentTab?.where?.status;
                  }

                  return (
                    j.status === currentTab?.where?.status &&
                    j.is_free === currentTab?.where?.is_free
                  );
                })
              : []
          }
          rowStyle={{
            padding: "5px 0",
          }}
          rowHeight={40}
          unSortIcon
          columnDefs={[
            {
              field: "role",
            },

            {
              field: "title",
            },

            {
              field: "skills",
            },
            {
              field: "experience",
            },
            {
              field: "education",
            },

            {
              field: "createdAt",
              headerName: "Posted on",
              cellDataType: "date",
              filter: true,
              valueFormatter: (d) => formatDate(d),
            },
            {
              field: "is_free",
              headerName: "Free",
              filter: true,
              width: 100,
              editable: true,
              onCellValueChanged: (row) => {
                handleToggleFree(row?.data, row?.data?.is_free);
              },
            },
            {
              headerName: "Actions",
              cellRenderer: (row) => {
                return (
                  <div>
                    <EyeFill
                      style={{
                        fontSize: "20px",
                        color: "blue",
                      }}
                      onClick={() => {
                        setShowDetailsFor(row?.data);
                      }}
                    />
                    &nbsp; &nbsp;
                    {currentTab?.isDeletedTab ? (
                      <ArrowClockwise
                        style={{
                          fontSize: "20px",
                          color: "green",
                        }}
                        onClick={() => {
                          handleUpdate(row?.data, "Active");
                        }}
                      />
                    ) : (
                      <>
                        <Trash
                          style={{
                            fontSize: "20px",
                            color: "red",
                          }}
                          onClick={() => {
                            handleUpdate(row?.data, "Deleted");
                          }}
                        />
                      </>
                    )}
                  </div>
                );
              },
            },
          ]}
        />
      </div>
    </>
  );
};

export default EmployerJobsTable;
