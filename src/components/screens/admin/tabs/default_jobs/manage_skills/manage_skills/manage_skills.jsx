import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomModal from "@/components/ui/custom_modal/custom_modal";
import React, { useState } from "react";
import styles from "./manage_skills.module.scss";

const ManageSillsPopup = ({ industry, setShow }) => {
  const [newSkills, setNewSkills] = useState([]);

  return (
    <CustomModal show={industry} setShow={setShow} title="Manage Industry">
      <strong>{industry?.name}</strong>
      <hr />
      <ul>
        {industry?.skills &&
          industry?.skills.map((skill, sIdx) => {
            return (
              <li key={`skill_${sIdx}`}>
                <p>{skill.skill}</p>
              </li>
            );
          })}
      </ul>
      <hr />
      {newSkills.map((skill, sIdx) => {
        return (
          <CustomInput
            key={`skill_${sIdx}`}
            placeHolder={`Skill Name ${sIdx + 1}`}
            value={skill.skill}
            disabled
          />
        );
      })}
      <br />
      <div className={styles.btns}>
        <CustomButton
          variant={3}
          onClick={() => {
            setNewSkills((prev) => [
              {
                skill: "",
                industry: industry?.industry,
                isIndustry: false,
              },
              ...prev,
            ]);
          }}
        >
          Add New Skill
        </CustomButton>

        <CustomButton>Save Industry</CustomButton>
      </div>
    </CustomModal>
  );
};

export default ManageSillsPopup;
