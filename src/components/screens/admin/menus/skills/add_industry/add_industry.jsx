import React, { useState } from "react";
import CustomForm from "../../../../../ui/custom_form/custom_form";
import CustomInput from "../../../../../ui/cuatom_input/cuatom_input";
import CustomButton from "../../../../../ui/custom_button/custom_button";
import { Trash } from "react-bootstrap-icons";
import { useCreateBulkSkills } from "../../../../../../hooks/api_hooks/skill_hooks/skill_hooks";

const AddIndustryScreen = () => {
  const [industries, setIndustries] = useState([
    {
      industry: "",
      isIndustry: true,
    },
  ]);

  const { mutateAsync, isLoading } = useCreateBulkSkills();

  const createIndustries = async () => {
    const res = await mutateAsync(industries);
    if (res) {
      setIndustries([
        {
          industry: "",
          isIndustry: true,
        },
      ]);
    }
  };

  return (
    <div>
      <CustomForm title="Add Industry" onSubmit={createIndustries}>
        {industries.map((ind, idx) => {
          return (
            <div key={`new_ind-${idx}`}>
              <CustomInput
                placeHolder="Industry Name"
                label="Industry Name"
                disabled={isLoading}
                value={ind.industry}
                required
                onChange={(e, v) => {
                  setIndustries((prev) => {
                    const old = [...prev];
                    old[idx].industry = v;
                    return old;
                  });
                }}
                rightElement={
                  idx !== 0 && (
                    <Trash
                      onClick={() => {
                        setIndustries((prev) =>
                          prev.filter((_, i) => i !== idx)
                        );
                      }}
                    />
                  )
                }
              />
              <br />
            </div>
          );
        })}
        <CustomButton
          onClick={(e) => {
            e.preventDefault();
            setIndustries((prev) => [
              ...prev,
              {
                industry: "",
                isIndustry: true,
              },
            ]);
          }}
          disabled={isLoading}
        >
          Add Field
        </CustomButton>
        <hr />
        <CustomButton isLoading={isLoading}>Submit</CustomButton>
      </CustomForm>
    </div>
  );
};

export default AddIndustryScreen;
