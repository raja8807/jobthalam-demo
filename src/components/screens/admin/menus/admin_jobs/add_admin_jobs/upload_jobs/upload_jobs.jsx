import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import readXlsxFile from "read-excel-file";
import styles from "./upload_jobs.module.scss";
import { useCreateBulkAdminJob } from "@/hooks/admin_job_hooks/admin_job_hooks";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { CheckCircleFill } from "react-bootstrap-icons";
import Link from "next/link";
import CustomSkillSelector from "@/components/ui/select/custom_skills_selector/custom_skills_selector";
import SkillSelect from "./skill_select/skill_select";

const UploadJobs = () => {
  const [rows, setRows] = useState([]);
  const [success, setSuccess] = useState(null);
  const [skill, setSkill] = useState(null);
  const [isFree, setIsFree] = useState(false);

  const getHasError = () => {
    const dataRows = rows.filter((_, i) => i != 0);

    const hasError = dataRows.some((r) => {
      return r.some((c) => !c);
    });

    return hasError;
  };

  const { mutateAsync, isLoading } = useCreateBulkAdminJob();

  const uploadBulkJobs = async () => {
    setSuccess(false);
    try {
      const dataRows = rows.filter((_, i) => i != 0);

      const jobsToUpload = dataRows.map((jobRow) => {
        const jobObject = {};

        jobRow.forEach((col, colIndex) => {
          jobObject[rows[0][colIndex]] = col;
          jobObject.is_admin_job = true;
          jobObject.status = "Active";
          jobObject.skills = skill;
          jobObject.is_free = isFree;
        });

        return jobObject;
      });

      const res = await mutateAsync(jobsToUpload);

      setRows([]);
      setSuccess(`${res?.data?.length}`);
      document.getElementById("file").value = null;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.UploadJobs}>
      {isLoading && <LoadingScreen />}

      <div>
        <SkillSelect setSkill={setSkill} />
        <label>
          <input
            type="checkBox"
            value={isFree}
            onChange={(e) => {
              setIsFree(e.target.checked);
            }}
          />
          &nbsp; is Free Jobs? &nbsp;
        </label>
      </div>
      {skill && (
        <div>
          {!rows?.[0] && (
            <div>
              <br />
              <Link
                href="/templates/upload_jobs_template.xlsx"
                download="upload_jobs_template"
                target="_blank"
              >
                <CustomButton variant={3}>Download Template</CustomButton>
              </Link>
              <br />
              <br />
              <CustomInput
                type="file"
                id="file"
                onChange={async (e) => {
                  try {
                    const selectedFile = e.target.files[0];
                    const ext = selectedFile.name.split(".")[1];
                    if (ext === "xlsx" || ext === "xls") {
                      const data = await readXlsxFile(selectedFile);
                      setSuccess(null);
                      setRows(data);
                    } else {
                      throw new Error("invalid file");
                    }
                  } catch (err) {
                    document.getElementById("file").value = null;
                    console.log(err);
                    alert("invalid file");
                  }
                }}
                accept=".xlsx, .xls"
                max={1}
                maxLength={1}
              />
              <br />
            </div>
          )}

          <div>
            {rows?.[0] && (
              <>
                <br />
                <div className={styles.upload}>
                  <h4>Jobs To Upload</h4>
                  <CustomButton
                    disabled={getHasError()}
                    onClick={uploadBulkJobs}
                  >
                    Upload {rows?.length - 1} Jobs
                  </CustomButton>
                  <CustomButton
                    onClick={() => {
                      setRows([]);
                    }}
                  >
                    Clear
                  </CustomButton>
                </div>

                <Table
                  responsive
                  striped
                  bordered
                  size="sm"
                  className={styles.Table}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      {rows?.[0] &&
                        rows[0].map((r, hri) => {
                          return <th key={hri}>{r}</th>;
                        })}
                    </tr>
                  </thead>
                  <tbody>
                    {rows &&
                      rows.map((r, ri) => {
                        if (ri !== 0) {
                          return (
                            <tr key={`data_row-${ri}`}>
                              <td>
                                <p>{ri}</p>
                              </td>
                              {r.map((c, ci) => {
                                return (
                                  <td
                                    key={`cell_${ci}`}
                                    className={!c ? styles.err : ""}
                                  >
                                    <p>{c}</p>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </Table>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadJobs;
