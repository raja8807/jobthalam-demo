import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomModal from "@/components/ui/custom_modal/custom_modal";
import React, { useState } from "react";
import styles from "./add_industry.module.scss";
import { useCreateBulkSkills } from "@/hooks/skill_hooks/skill_hooks";
import { X } from "react-bootstrap-icons";

const AddIndustryPopUp = ({ show, setShow, setSkills: setAllSkills }) => {
  const [industry, setIndustry] = useState({
    skill: null,
    isIndustry: true,
    industry: "",
  });

  const [skills, setSkills] = useState([
    {
      skill: "",
      isIndustry: false,
    },
  ]);

  const { mutateAsync, isLoading } = useCreateBulkSkills();

  const createIndustryWithSkills = async (e) => {
    e.preventDefault();
    try {
      const skillsToCreate = skills.map((s) => ({
        ...s,
        industry: industry?.industry,
      }));
      const newSkills = [industry, ...skillsToCreate];
      const res = await mutateAsync(newSkills);

      if (res?.data) {
        setAllSkills((prev) => {
          const newIndustry = res?.data?.find((s) => s.isIndustry);
          newIndustry.name = industry.industry;
          newIndustry.skills = res?.data?.filter((x) => !x.isIndustry);
          return [...prev, newIndustry];
        });

        setShow(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomModal
      show={show}
      setShow={isLoading ? () => {} : setShow}
      title="Add Industry"
      hasClose={!isLoading}
    >
      <form onSubmit={createIndustryWithSkills}>
        <CustomInput
          placeHolder="Industry Name"
          onChange={(e, v) => {
            setIndustry((prev) => ({ ...prev, industry: v }));
          }}
          value={industry?.industry}
          required
        />
        <hr />
        {skills.map((skill, sIdx) => {
          return (
            <div key={`skill_${sIdx}`} className={styles.newSkill}>
              <CustomInput
                placeHolder={`Skill Name ${sIdx + 1}`}
                onChange={(e, v) => {
                  setSkills((prev) => {
                    const sk = [...prev];
                    sk[sIdx].skill = v;
                    return sk;
                  });
                }}
                value={skill.skill}
                required
              />
              <X
                onClick={() => {
                  setSkills((prev) => prev.filter((ns, i) => i !== sIdx));
                }}
              />
            </div>
          );
        })}
        <br />
        <div className={styles.btns}>
          <CustomButton
            variant={3}
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
          >
            Add Skill
          </CustomButton>

          <CustomButton isLoading={isLoading}>Save Industry</CustomButton>
        </div>
      </form>
    </CustomModal>
  );
};

export default AddIndustryPopUp;
