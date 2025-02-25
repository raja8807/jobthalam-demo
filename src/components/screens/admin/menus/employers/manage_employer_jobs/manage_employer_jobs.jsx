import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";
import useFetchAllEmployers from "@/hooks/employer_hooks/employer_hooks";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EmployerJobsTable from "./employer_jobs_table/employer_jobs_table";

const ManageEmployerJobsScreen = () => {
  const { data, isLoading } = useFetchAllEmployers();
  const [allEmployers, setAllEmployers] = useState(null);

  const router = useRouter();

  const [currentEmployer, setCurrentEmployer] = useState(null);

  useEffect(() => {
    if (!allEmployers) {
      if (data?.data) {
        setAllEmployers(data?.data || []);
        if (router?.query?.id) {
          const emp = data?.data?.find((e) => e?.id === router?.query?.id);
          setCurrentEmployer(emp);
        }
      }
    }
  }, [data, router]);

  return (
    <div>
      {isLoading && <LoadingScreen />}
      {allEmployers && (
        <>
          <CustomSelect
            placeholder={"Company Name"}
            options={allEmployers.map((emp) => {
              return emp.company_name;
            })}
            onChange={(e, v) => {
              setCurrentEmployer(() => {
                return allEmployers.find((a) => {
                  return a.company_name === v;
                });
              });
            }}
            value={currentEmployer?.company_name}
          ></CustomSelect>
          {currentEmployer && (
            <EmployerJobsTable
              currentEmployer={currentEmployer}
              setCurrentEmployer={setCurrentEmployer}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ManageEmployerJobsScreen;
