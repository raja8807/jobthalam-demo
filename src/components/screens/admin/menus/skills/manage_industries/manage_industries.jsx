import React from "react";
import CustomButton from "../../../../../ui/custom_button/custom_button";
import {
  ArrowClockwise,
  PlusCircle,
  Recycle,
  Trash,
} from "react-bootstrap-icons";
import useIndustryList, {
  useActivateIndustry,
  useDeleteIndustry,
} from "../../../../../../hooks/api_hooks/skill_hooks/skill_hooks";
import CustomForm from "../../../../../ui/custom_form/custom_form";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the Data Grid
import { formatDate } from "../../../../../../utils/helpers/helpers";

const ManageIndustriesScreen = () => {
  const { data, isFetching } = useIndustryList();

  const { mutateAsync, isLoading: deleteIsLoading } = useDeleteIndustry();
  const { mutateAsync: activateIndustryAsync, isLoading: activateIsLoading } =
    useActivateIndustry();

  const isLoading = deleteIsLoading || activateIsLoading || isFetching;

  return (
    <div>
      <div>
        <CustomButton href="/admin/skills/add_industry">
          Add <PlusCircle />
        </CustomButton>
      </div>
      <br />
      <CustomForm title="Industries">
        <div>
          <div
            className="ag-theme-balham" // applying the Data Grid theme
            style={{ height: "calc(100dvh - 300px)", fontSize: "14px" }} // the Data Grid will fill the size of the parent container
          >
            <AgGridReact
              loading={isLoading}
              rowData={
                data
                  ? data
                      .filter((i) => i.is_active)
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
                  headerName: "Action",
                  // field: "action",
                  // width: 100,
                  cellRenderer: (row) => (
                    <div>
                      <Trash
                        style={{
                          fontSize: "20px",
                          color: "red",
                        }}
                        onClick={async () => {
                          try {
                            const res = await mutateAsync(row?.data);
                            console.log(res);
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      />
                      &nbsp; &nbsp; &nbsp;
                      <CustomButton
                        variant={4}
                        href={`/admin/skills/manage_skills?ind=${row?.data?.industry}`}
                      >
                        View Skills
                      </CustomButton>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </CustomForm>
      <br />
      <CustomForm title="Deleted Industries">
        <div>
          <div
            className="ag-theme-balham" // applying the Data Grid theme
            style={{ height: "calc(100dvh - 300px)", fontSize: "14px" }} // the Data Grid will fill the size of the parent container
          >
            <AgGridReact
              loading={isLoading}
              rowData={
                data
                  ? data
                      .filter((i) => !i.is_active)
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
                  headerName: "Action",
                  // field: "action",
                  width: 100,
                  cellRenderer: (row) => (
                    <div>
                      <ArrowClockwise
                        style={{
                          fontSize: "20px",
                          color: "blue",
                        }}
                        onClick={async () => {
                          try {
                            const res = await activateIndustryAsync(row?.data);
                            console.log(res);
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </CustomForm>
    </div>
  );
};

export default ManageIndustriesScreen;
