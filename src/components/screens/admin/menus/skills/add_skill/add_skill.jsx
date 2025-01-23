import React, { useState } from "react";
import CustomForm from "../../../../../ui/custom_form/custom_form";
import CustomSelect from "../../../../../ui/select/custom_select/custom_select";
import useIndustryList, {
  useCreateBulkSkills,
} from "../../../../../../hooks/api_hooks/skill_hooks/skill_hooks";
import CustomInput from "../../../../../ui/cuatom_input/cuatom_input";
import CustomButton from "../../../../../ui/custom_button/custom_button";
import { Trash } from "react-bootstrap-icons";

const AddSkillsScreen = () => {
  const { data, isFetching: indIsFetching } = useIndustryList();
  const [currentIndustry, setCurrentIndustry] = useState(null);

  console.log(currentIndustry);

  const [skills, setSkills] = useState([
    {
      skill: "",
      isIndustry: false,
    },
  ]);

  const { mutateAsync, isLoading } = useCreateBulkSkills();

  const createSkills = async () => {
    const res = await mutateAsync(
      skills.map((s) => {
        return { ...s, industry: currentIndustry.industry };
      })
    );
    if (res) {
      setSkills([
        {
          skill: "",
          isIndustry: false,
        },
      ]);
    }
  };

  return (
    <div>
      <CustomForm
        title="Add Skill"
        additionalElement={
          <CustomSelect
            value={currentIndustry?.industry}
            placeholder="Industry"
            options={
              data
                ? data.map((i) => {
                    return i.industry;
                  })
                : []
            }
            onChange={(e, v) => {
              setCurrentIndustry(data?.find((i) => i.industry === v));
            }}
          />
        }
        onSubmit={createSkills}
      >
        {skills.map((ind, idx) => {
          return (
            <div key={`new_ind-${idx}`}>
              <CustomInput
                placeHolder="Skill Name"
                label="Skill Name"
                disabled={isLoading || !currentIndustry}
                value={ind.skill}
                required
                onChange={(e, v) => {
                  setSkills((prev) => {
                    const old = [...prev];
                    old[idx].skill = v;
                    return old;
                  });
                }}
                rightElement={
                  idx !== 0 && (
                    <Trash
                      onClick={() => {
                        setSkills((prev) => prev.filter((_, i) => i !== idx));
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
            setSkills((prev) => [
              ...prev,
              {
                skill: "",
                isIndustry: false,
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

export default AddSkillsScreen;
