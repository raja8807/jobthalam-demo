import CustomModal from "@/components/ui/custom_modal/custom_modal";
import React, { useState } from "react";
import { Form, Table } from "react-bootstrap";
import readXlsxFile from "read-excel-file";
import styles from "./upload_job_template.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { Upload, X } from "react-bootstrap-icons";
import { useCreateBulkAdminJob } from "@/hooks/admin_job_hooks/admin_job_hooks";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const UploadJobsPopup = ({ show, setShow, skill, setAdminJobForSkill }) => {
  const [rows, setRows] = useState(null);
  const [hasError, setHasError] = useState(false);

  console.log(rows);

  const { mutateAsync, isLoading } = useCreateBulkAdminJob();

  const uploadBulkJobs = async () => {
    try {
      const dataRows = rows.filter((_, i) => i != 0);

      const jobsToUpload = dataRows.map((jobRow) => {
        const jobObject = {};

        jobRow.forEach((col, colIndex) => {
          jobObject[rows[0][colIndex]] = col;
          jobObject.is_admin_job = true;
          jobObject.status = "Active";
          jobObject.is_free = false;
          jobObject.skills = skill;
        });

        return jobObject;
      });

      const res = await mutateAsync(jobsToUpload);

      setAdminJobForSkill((prev) => [...res?.data, ...prev]);
      setShow(false);
      //   setRows([]);
      //   setSuccess(`${res?.data?.length}`);
      //   document.getElementById("file").value = null;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}

      <CustomModal
        show={show}
        setShow={setShow}
        title={`Upload Jobs ${skill}`}
        size="xl"
      >
        {!rows?.[0] ? (
          <div>
            <Form.Label htmlFor="file">Select Excel File</Form.Label>
            <Form.Control
              type="file"
              id="file"
              onChange={async (e) => {
                try {
                  const selectedFile = e.target.files[0];
                  const ext = selectedFile.name.split(".")[1];
                  if (ext === "xlsx" || ext === "xls") {
                    const data = await readXlsxFile(selectedFile);

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
          </div>
        ) : (
          <div className={styles.UploadJobs}>
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
                          <td>{ri}</td>
                          {r.map((c, ci) => {
                            if (!c && !hasError) {
                              setHasError(true);
                            }
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
            <div>
              <CustomButton
                variant={3}
                onClick={() => {
                  setHasError(false);
                  setRows(null);
                }}
              >
                Clear <X />
              </CustomButton>
              &nbsp; &nbsp; &nbsp;
              <CustomButton disabled={hasError} onClick={uploadBulkJobs}>
                Upload All <Upload />
              </CustomButton>
            </div>
          </div>
        )}
      </CustomModal>
    </>
  );
};

export default UploadJobsPopup;
