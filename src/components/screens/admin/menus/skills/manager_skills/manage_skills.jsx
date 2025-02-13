import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import CustomButton from "../../../../../ui/custom_button/custom_button";

import useIndustryList, {
  useFetchAllSkills,
  useUpdateBulkSkills,
} from "../../../../../../hooks/api_hooks/skill_hooks/skill_hooks";
import CustomForm from "../../../../../ui/custom_form/custom_form";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the Data Grid

import { formatDate } from "../../../../../../utils/helpers/helpers";
import CustomSelect from "../../../../../ui/select/custom_select/custom_select";

const ManageSkillsScreen = () => {
  const { data, isFetching: indIsFetching } = useIndustryList();
  const { data: allSkills, isFetching: skillsIsFetching } = useFetchAllSkills();

  const { mutateAsync, isLoading: updateIsLoading } = useUpdateBulkSkills();

  const [currentIndustry, setCurrentIndustry] = useState(null);
  const skillsToUpdate = useRef([]);

  const router = useRouter();

  const updateSkills = async () => {
    try {
      const res = await mutateAsync(skillsToUpdate.current);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      if (router?.query?.ind) {
        const ind = data?.find((i) => {
          return i.industry === router.query.ind;
        });
        setCurrentIndustry(ind || data?.[0]);
      } else {
        setCurrentIndustry(data?.[0]);
      }
    }
  }, [data, router?.query?.ind]);

  const isLoading = indIsFetching || skillsIsFetching || updateIsLoading;

  return (
    <div>
      <br />
      <CustomForm
        title="Skills by Industry"
        additionalElement={
          <CustomSelect
            value={currentIndustry?.industry}
            options={
              data
                ? data.map((i) => {
                    return i.industry;
                  })
                : []
            }
            onChange={(e, v) => {
              setCurrentIndustry(data?.find((i) => i.industry === v));
              skillsToUpdate.current = [];
            }}
          />
        }
      >
        <div>
          <div
            className="ag-theme-balham" // applying the Data Grid theme
            style={{ height: "calc(100dvh - 300px)", fontSize: "14px" }} // the Data Grid will fill the size of the parent container
          >
            <AgGridReact
              loading={isLoading}
              rowData={
                data && allSkills && currentIndustry
                  ? allSkills?.data
                      .filter(
                        (i) =>
                          i?.industry === currentIndustry?.industry &&
                          !i?.isIndustry
                      )
                      .map((req, idx) => {
                        return {
                          ...req,
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
                  filter:true
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
                      skillsToUpdate.current = [
                        ...skillsToUpdate.current,
                        x.data,
                      ];
                    } else {
                      skillsToUpdate.current[idx] = x.data;
                    }
                  },
                },
              ]}
            />
          </div>
        </div>
        <br />
        <CustomButton onClick={updateSkills}>Save</CustomButton>
      </CustomForm>
    </div>
  );
};

export default ManageSkillsScreen;
