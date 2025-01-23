import React, { useState } from "react";
import CustomForm from "../../../../../ui/custom_form/custom_form";
import { useFetchAllAdminJobs } from "../../../../../../hooks/admin_job_hooks/admin_job_hooks";
import CustomButton from "../../../../../ui/custom_button/custom_button";
import { PlusCircleFill } from "react-bootstrap-icons";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the Data Grid
import { formatDate } from "../../../../../../utils/helpers/helpers";

const ManageAdminJobsScreen = () => {
  const { data, isLoading: adminJobsIsLoading } = useFetchAllAdminJobs();
  const [res, setRes] = useState(0);

  const isLoading = adminJobsIsLoading;

  const calculateNoOfWhiteBallsToBeTakenOut = () => {
    const noOfBlackBalls = 10;
    let noOfWhiteBalls = 990;
    // -----------OUTPUT---------------------------------------
    const percentageOfWBallsOutput = 98;
    // -----------OUTPUT---------------------------------------

    // ---------------------------------------------
    let out = 0;

    for (
      let indexOfWhiteBall = noOfWhiteBalls;
      indexOfWhiteBall >= 0;
      indexOfWhiteBall--
    ) {
      const total = noOfBlackBalls + indexOfWhiteBall;

      if ((indexOfWhiteBall / total) * 100 == percentageOfWBallsOutput) {
        out = noOfWhiteBalls - indexOfWhiteBall;
      }
    }

    return out;
  };

  // for (let i = 0; i <= 100; i++) {
  //   let total = noOfBlackBalls + noOfWhiteBalls;
  //   if (
  //     Math.ceil((noOfWhiteBalls / total) * 100 == percentageOfWBallsOutput)
  //   ) {
  //     return i;
  //   }
  //   noOfWhiteBalls--;
  // }
  return (
    <CustomForm>
      <div>
        <CustomButton>
          Add <PlusCircleFill />
        </CustomButton>
      </div>
      <div
        className="ag-theme-balham" // applying the Data Grid theme
        style={{ height: "calc(100dvh - 300px)", fontSize: "14px" }} // the Data Grid will fill the size of the parent container
      >
        {calculateNoOfWhiteBallsToBeTakenOut()}
        <AgGridReact
          loading={isLoading}
          rowData={
            data?.data
              ? data?.data.map((aj, idx) => {
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
          rowHeight={40}
          unSortIcon
          columnDefs={[
            {
              field: "index",
              headerName: "#",
              width: 100,
            },
            {
              field: "skill",
              filter: true,
            },
            {
              field: "industry",
            },

            {
              field: "createdAt",
              headerName: "Created on",
              cellDataType: "date",
              filter: true,
              valueFormatter: (d) => formatDate(d),
            },
            {
              field: "is_admin",
              headerName: "Created by admin",
              filter: true,
              showDisabledCheckboxes: true,
            },
            {
              field: "is_active",
              headerName: "Active",
              editable: true,
              onCellValueChanged: (x) => {
                const idx = skillsToUpdate.current.findIndex(
                  (s) => s.id === x.data.id
                );
                if (idx === -1) {
                  skillsToUpdate.current = [...skillsToUpdate.current, x.data];
                } else {
                  skillsToUpdate.current[idx] = x.data;
                }
              },
            },
          ]}
        />
      </div>
    </CustomForm>
  );
};

export default ManageAdminJobsScreen;
