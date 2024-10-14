import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useState } from "react";
import styles from "./add_industry.module.scss";
import { useCreateBulkSkills } from "@/hooks/skill_hooks/skill_hooks";
import { X } from "react-bootstrap-icons";
import CustomModal from "@/components/custom_modal/custom_modal";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";

const AddIndustryPopUp = ({
  show,
  setShow,
  setSkills: setAllSkills,
  allSkills,
  currentUser,
}) => {
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

  console.log(allSkills);

  const [isNewIndustry, setIsNewIndustry] = useState(false);

  const { mutateAsync, isLoading } = useCreateBulkSkills();

  const createIndustryWithSkills = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isNewIndustry) {
        if (
          allSkills.some(
            (i) =>
              i.name.trim().toLowerCase() ===
              industry.industry.trim().toLowerCase()
          )
        ) {
          throw new Error("Industry already exist");
        }
      } else {
        const currentInd = allSkills.find(
          (i) =>
            i.name.trim().toLowerCase() ===
            industry.industry.trim().toLowerCase()
        );
        if (
          currentInd &&
          currentInd.skills.some(
            (s) =>
              s.trim().toLowerCase() === skills[0]?.skill.trim().toLowerCase()
          )
        ) {
          throw new Error("Skill already exist under selected industry");
        }
      }

      const skillsToCreate = skills.map((s) => ({
        ...s,
        industry: industry?.industry,
        employer_id: currentUser?.id,
        is_admin: false,
      }));

      const newSkills = [...skillsToCreate];

      if (isNewIndustry) {
        const ind = {
          ...industry,
          is_admin: false,
          employer_id: currentUser?.id,
        };
        newSkills.push(ind);
      }

      const res = await mutateAsync(newSkills);

      if (res?.data) {
        setAllSkills((prev) => {
          if (isNewIndustry) {
            const newIndustry = res?.data?.find((s) => s.isIndustry);
            return [
              ...prev,
              {
                id: newIndustry?.id,
                name: newIndustry?.industry,
                skills: [skills[0]?.skill],
              },
            ];
          } else {
            const as = [...prev];

            const industryIndex = allSkills.findIndex(
              (i) => i.name === industry.industry
            );

            as[industryIndex].skills.push(skills[0]?.skill);
            return as;
          }
        });

        setShow(false);
      }
    } catch (err) {
      alert(err.message);
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
        {isNewIndustry ? (
          <CustomInput
            placeHolder="Industry Name"
            onChange={(e, v) => {
              setIndustry((prev) => ({ ...prev, industry: v }));
            }}
            value={industry?.industry}
            required
          />
        ) : (
          <CustomSelect
            placeholder="Select Industry"
            options={allSkills.map((i) => {
              return i.name;
            })}
            onChange={(e, v) => {
              setIndustry((prev) => ({ ...prev, industry: v }));
            }}
            required
          />
        )}
        <p
          onClick={() => {
            setIndustry((prev) => ({ ...prev, industry: "" }));
            setIsNewIndustry((prev) => !prev);
          }}
          className={styles.indToggle}
        >
          {isNewIndustry ? "Choose Existing Industry" : "Create New Industry"}
        </p>
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
            </div>
          );
        })}
        <br />
        <div className={styles.btns}>
          <CustomButton isLoading={isLoading}>Save Industry</CustomButton>
        </div>
      </form>
    </CustomModal>
  );
};

export default AddIndustryPopUp;
