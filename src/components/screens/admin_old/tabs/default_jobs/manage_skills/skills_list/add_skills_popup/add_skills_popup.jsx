import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomModal from "@/components/ui/custom_modal/custom_modal";
import React, { useState } from "react";
import styles from "./add_skills_popup.module.scss";
import { useCreateBulkSkills } from "@/hooks/skill_hooks/skill_hooks";
import { X } from "react-bootstrap-icons";

const AddSkillsPopUp = ({
  show,
  setShow,
  currentIndustryIndex,
  currentIndustry,
  setAllSkills,
}) => {
  const [skills, setSkills] = useState([
    {
      skill: "",
    },
  ]);

  const { mutateAsync, isLoading } = useCreateBulkSkills();

  const createIndustryWithSkills = async (e) => {
    e.preventDefault();
    try {
      const skillsToCreate = skills.map((s) => ({
        ...s,
        industry: currentIndustry?.name,
        isIndustry: false,
      }));

      const res = await mutateAsync(skillsToCreate);

      if (res?.data) {
        setAllSkills((prev) => {
          const as = [...prev];
          as[currentIndustryIndex].skills = [
            ...res?.data,
            ...as[currentIndustryIndex].skills,
          ];
          return as;
        });
        setShow(false);
      }
    } catch (err) {
      alert("error");
      console.log(err);
    }
  };

  return (
    <CustomModal
      show={show}
      setShow={isLoading ? () => {} : setShow}
      title={`Add skills for ${currentIndustry?.name}`}
      hasClose={!isLoading}
    >
      <form onSubmit={createIndustryWithSkills}>
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
              {sIdx !== 0 && (
                <X
                  onClick={() => {
                    setSkills((prev) => prev.filter((ns, i) => i !== sIdx));
                  }}
                />
              )}
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

export default AddSkillsPopUp;
