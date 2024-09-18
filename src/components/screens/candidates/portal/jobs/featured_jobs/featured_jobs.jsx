import CustomButton from "@/components/ui/custom_button/custom_button";
import JobCard from "@/components/ui/job/job_card/job_card";
import { useCreateApplication } from "@/hooks/application_hooks/application_hooks";
import { useUpdateFeaturedJobs } from "@/hooks/featured_job_hooks/featured_job_hooks";
import { addData, updateData } from "@/libs/firebase/firebase";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { v4 } from "uuid";

import * as XLSX from "xlsx";

const FeaturedJobs = ({ allJobs, currentUser, setAllJobs }) => {
  const [loadingJobId, setLoadingJobId] = useState(null);
  const { mutateAsync } = useCreateApplication();
  const { mutateAsync: updateFeaturedJob } = useUpdateFeaturedJobs();

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

  // console.log(allJobs);

  return (
    <>
      <CustomButton onClick={downloadExcel}>Download as Xls</CustomButton>
      <br />
      <br />
      <Row>
        {allJobs.map((job, idx) => {
          return (
            <JobCard
              key={job.id}
              job={job}
              allJobs={allJobs}
              actionButton={
                job.status == "New" &&
                !job?.is_admin_job && (
                  <CustomButton
                    onClick={async (e) => {
                      e.stopPropagation();
                      await applyJob(job, idx);
                    }}
                    isLoading={job.id === loadingJobId}
                    disabled={loadingJobId}
                  >
                    Apply
                  </CustomButton>
                )
              }
            />
          );
        })}
      </Row>
    </>
  );
};

export default FeaturedJobs;
