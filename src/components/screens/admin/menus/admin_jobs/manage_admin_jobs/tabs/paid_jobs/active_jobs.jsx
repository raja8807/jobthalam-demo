import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the Data Grid
import {
  useDeleteAdminJob,
  useUpdateAdminJob,
} from "@/hooks/admin_job_hooks/admin_job_hooks";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { ArrowClockwise, PencilSquare, Trash } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";
import AdminJobsForm from "../../../components/admin_job_form/admin_job_form";
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";

const ActiveJobs = ({ isLoading, jobsData, setJobsData, isDeletedTab }) => {
  const { mutateAsync, isLoading: deleteIsLoading } = useUpdateAdminJob();
  const [showUpdateFormFor, setShowUpdateFormFor] = useState(null);

  const handleUpdate = async (job, status) => {
    try {
      await mutateAsync({ ...job, status: status });
      setJobsData((prev) => {
        const allJobs = [...prev];
        return allJobs.map((j) => ({
          ...j,
          status: j?.id === job.id ? status : j.status,
        }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleFree = async (job, is_free) => {
    try {
      await mutateAsync({ ...job, is_free });
      setJobsData((prev) => {
        const allJobs = [...prev];
        return allJobs.map((j) => ({
          ...j,
          is_free: j?.id === job.id ? is_free : j.is_free,
        }));
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleFeatured = async (job, is_featured) => {
    try {
      await mutateAsync({ ...job, is_featured });
      setJobsData((prev) => {
        const allJobs = [...prev];
        return allJobs.map((j) => ({
          ...j,
          is_featured: j?.id === job.id ? is_featured : j.is_featured,
        }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateJob = async (job) => {
    try {
      await mutateAsync({ ...job });
      setJobsData((prev) => {
        const allJobs = [...prev];
        return allJobs.map((j) => (job?.id === j.id ? job : j));
      });
      setShowUpdateFormFor(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [includeInternships, setIncludeInternships] = useState(true);

  return (
    <div
      className="ag-theme-balham" // applying the Data Grid theme
      style={{ height: "calc(100dvh - 200px)", fontSize: "14px" }} // the Data Grid will fill the size of the parent container
    >
      <Modal
        show={!!showUpdateFormFor}
        onHide={() => {
          setShowUpdateFormFor(null);
        }}
        centered
        size="xl"
      >
        <Modal.Header closeButton>Edit Job</Modal.Header>
        <Modal.Body>
          <AdminJobsForm
            jobToUpdate={showUpdateFormFor}
            handleUpdateJob={handleUpdateJob}
          />
        </Modal.Body>
      </Modal>
      {deleteIsLoading && <LoadingScreen />}
      <input
        type="checkbox"
        checked={includeInternships}
        onChange={(e) => {
          setIncludeInternships(e.target.checked);
        }}
      />{" "}
      &nbsp;Include Internships
      <br />
      <AgGridReact
        animateRows={false}
        suppressAnimationFrame={false}
        loading={isLoading}
        rowData={
          jobsData?.[0]
            ? jobsData
                .filter((job) => {
                  if (!includeInternships) {
                    return job.type !== "Internship";
                  }

                  return job;
                })
                .map((aj, idx) => {
                  return {
                    ...aj,
                    index: idx + 1,
                  };
                })
            : []
        }
        rowStyle={{
          cursor: "pointer",
          padding: "5px 0",
        }}
        headerHeight={50}
        rowHeight={40}
        unSortIcon
        columnDefs={[
          {
            field: "index",
            headerName: "#",
            width: 100,
          },
          {
            field: "title",
            width: 200,
          },
          {
            field: "role",
            width: 200,
          },
          {
            field: "company_name",
            width: 200,
          },
          {
            field: "skills",
            filter: true,
          },
          {
            field: "experience",
            filter: true,
            width: 120,
            editable: true,
          },
          {
            field: "education",
            filter: true,
          },
          {
            field: "type",
            filter: true,
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
            field: "is_featured",
            headerName: "Featured",
            filter: true,
            width: 150,
            editable: true,
            onCellValueChanged: (row) => {
              handleToggleFeatured(row?.data, row?.data?.is_featured);
            },
          },
          {
            headerName: "Actions",
            cellRenderer: (row) => {
              return (
                <div>
                  <PencilSquare
                    style={{
                      fontSize: "20px",
                      color: "green",
                    }}
                    onClick={() => {
                      console.log(row);

                      setShowUpdateFormFor(row?.data);
                    }}
                  />
                  &nbsp; &nbsp;
                  {isDeletedTab ? (
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
  );
};

export default ActiveJobs;
