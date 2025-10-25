import { useCreateApplication } from "@/api_hooks/candidate_hooks/application_hooks/application.hooks";
import JobCard from "@/components/cards/job_card/job_card";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomToolTip from "@/components/ui/tool_tip/tool_tip";

import { useUpdateFeaturedJobs } from "@/hooks/featured_job_hooks/featured_job_hooks";
import { addData, updateData } from "@/libs/firebase/firebase";
import React, { useState } from "react";
import { Row, Tooltip } from "react-bootstrap";
import {
  Check2Circle,
  QuestionCircle,
  QuestionCircleFill,
} from "react-bootstrap-icons";

import * as XLSX from "xlsx";

const FeaturedJobs = ({ allJobs, currentUser }) => {
  const adminJobs = allJobs.adminJobs;
  const employerJobs = allJobs.employerJobs;

  const downloadExcel = () => {
    // Data to be written to the Excel file
    const worksheetData = [
      [
        "Company Name",
        "Title",
        "Role",
        "Salary",
        "Type",
        "HR Name",
        "Phone Number",
        "Email",
        "Website",
        "Experience",
        "Education",
        "Location",
        "Description",
      ],
    ];

    const jobsToCreate = [...adminJobs, ...employerJobs];

    jobsToCreate.forEach((job) => {
      worksheetData.push([
        job.companyName,
        job.title,
        job.role,
        job.salary,
        job.type,
        job.companyHrName,
        job.companyPhone,
        job.companyEmail,
        job.companyWebsite,
        job.experience,
        job.education,
        job.location,
        job.description,
      ]);
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
    link.setAttribute("download", "jobs.xlsx"); // Name of the downloaded file

    // Append the link to the body, click it, and remove it
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const { mutateAsync: apllyAsync, isPending } = useCreateApplication(
    currentUser.id
  );

  const applyJob = async (featuredJob) => {
    try {
      const res = await apllyAsync({
        candidate_id: currentUser.id,
        featured_job_id: featuredJob.id,
        employer_job_id: featuredJob.employer_job_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CustomButton onClick={downloadExcel}>Download as Xls</CustomButton>
      <br />
      <br />
      {employerJobs?.[0] && (
        <>
          <p>
            Apply Directly{" "}
            <CustomToolTip message="These jobs are posted by different Employers. You can apply directly from this dashboard">
              <QuestionCircleFill />
            </CustomToolTip>
          </p>
          <br />
          <Row>
            {employerJobs.map((job, idx) => {
              return (
                <JobCard
                  key={job.id}
                  jobData={job}
                  featuredJob={job}
                  actionButton={
                    job.application ? (
                      <p>{job.application.status}</p>
                    ) : (
                      <CustomButton
                        onClick={async () => {
                          await applyJob(job);
                        }}
                        isLoading={isPending}
                      >
                        Apply Now
                      </CustomButton>
                    )
                  }
                />
              );
            })}
          </Row>
        </>
      )}
      <hr />
      {adminJobs?.[0] && (
        <>
          <p>
            Posted by Admin{" "}
            <CustomToolTip message="These jobs are posted by Admin. You can contact the employers.">
              <QuestionCircleFill />
            </CustomToolTip>
          </p>
          <br />
          <Row>
            {adminJobs.map((job, idx) => {
              return (
                <JobCard
                  key={job.id}
                  jobData={job}
                  isAdminJob
                  featuredJob={job}
                />
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default FeaturedJobs;
