import CustomButton from "@/components/ui/custom_button/custom_button";
import JobCard from "@/components/ui/job/job_card/job_card";
import CustomToolTip from "@/components/ui/tool_tip/tool_tip";
import { useCreateApplication } from "@/hooks/application_hooks/application_hooks";
import { useUpdateFeaturedJobs } from "@/hooks/featured_job_hooks/featured_job_hooks";
import { addData, updateData } from "@/libs/firebase/firebase";
import React, { useState } from "react";
import { Row, Tooltip } from "react-bootstrap";
import {
  Check2Circle,
  QuestionCircle,
  QuestionCircleFill,
} from "react-bootstrap-icons";
import { v4 } from "uuid";

import * as XLSX from "xlsx";

const FeaturedJobs = ({ allJobs, currentUser, setAllJobs }) => {
  const [loadingJobId, setLoadingJobId] = useState(null);
  const { mutateAsync } = useCreateApplication();
  const { mutateAsync: updateFeaturedJob } = useUpdateFeaturedJobs();

  const employerJobs = allJobs ? allJobs.filter((j) => !j.is_admin_job) : [];

  const adminJobs = allJobs ? allJobs.filter((j) => j.is_admin_job) : [];

  const applyJob = async (job, index) => {
    setLoadingJobId(job?.id);
    try {
      const res = await mutateAsync({
        candidate_id: currentUser?.id,
        job_id: job?.job?.id || null,
        admin_job_id: job?.adminjob?.id || null,
        request_id: job?.request_id,
        employer_id: job?.employer?.id || null,
        featured_job_id: job?.id,
        status: "Applied",
      });

      if (res) {
        const updatedFeaturedJob = await updateFeaturedJob({
          id: job?.id,
          status: "Applied",
        });

        if (updatedFeaturedJob) {
          setAllJobs((prev) => {
            const fJobs = [...prev];
            fJobs[index] = { ...job, status: "Applied" };
            return fJobs;
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoadingJobId(null);
  };

  const downloadExcel = () => {
    // Data to be written to the Excel file
    const worksheetData = [
      [
        "Company Name",
        "Industry",
        "Title",
        "Role",
        "Type",
        "HR Name",
        "Phone Number",
        "Email",
        "Website",
        "Experience",
        "Education",
      ],
    ];

    allJobs.forEach((job) => {
      if (job.is_admin_job) {
        worksheetData.push([
          job?.adminjob?.company_name,
          "",
          job?.adminjob?.title,
          job?.adminjob?.role,
          job?.adminjob?.type,
          job?.adminjob?.company_spoc_name,
          job?.adminjob?.company_phone_number,
          job?.adminjob?.company_email,
          job?.adminjob?.company_website,
          job?.adminjob?.experience,
          job?.adminjob?.education,
        ]);
      } else {
        worksheetData.push([
          job?.employer?.company_name,
          job?.employer?.company_type,
          job?.job?.title,
          job?.job?.role,
          job?.job?.type,
          `${job?.employer?.first_name} ${job?.employer?.first_name}`,
          job?.employer?.phone_number,
          job?.employer?.email,
          job?.employer?.website_url,
          job?.job?.experience,
          job?.job?.education,
        ]);
      }
    });

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook and generate the binary string
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob from the generated Excel data
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a link element for download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "output.xlsx"); // Name of the downloaded file

    // Append the link to the body, click it, and remove it
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <>
      <CustomButton onClick={downloadExcel}>Export as Xls</CustomButton>
      <br />
      <br />
      {employerJobs?.[0] && (
        <Row>
          <p>
            Apply Directly{" "}
            <CustomToolTip message="These jobs are posted by different Employers. You can apply directly from this dashboard">
              <QuestionCircleFill />
            </CustomToolTip>
          </p>
          <br />
          <br />
          {employerJobs.map((job, idx) => {
            return (
              <JobCard
                key={job.id}
                job={job}
                allJobs={allJobs}
                actionButton={
                  <CustomButton
                    onClick={async (e) => {
                      e.stopPropagation();
                      await applyJob(job, idx);
                    }}
                    isLoading={job.id === loadingJobId}
                    disabled={
                      loadingJobId ||
                      job?.status !== "New" ||
                      job?.job?.status !== "Active"
                    }
                  >
                    {job?.status === "New" ? (
                      "Apply"
                    ) : (
                      <>
                        Applied <Check2Circle />
                      </>
                    )}
                  </CustomButton>
                }
              />
            );
          })}
        </Row>
      )}
      {adminJobs?.[0] && (
        <Row>
          <p>
            Posted by Admin{" "}
            <CustomToolTip message="These jobs are posted by Admin. You can contact the employers.">
              <QuestionCircleFill />
            </CustomToolTip>
          </p>
          <br />
          <br />
          {adminJobs.map((job, idx) => {
            return <JobCard key={job.id} job={job} allJobs={allJobs} />;
          })}
        </Row>
      )}
    </>
  );
};

export default FeaturedJobs;
