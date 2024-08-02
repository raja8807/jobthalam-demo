import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useState } from "react";
import styles from "./manage_skills.module.scss";
import AddIndustryPopUp from "./add_industry/add_industry";
import ManageSillsPopup from "./manage_skills/manage_skills";

const ManageSkills = ({ SkillCategories, setSkills }) => {
  const [showAddIndustry, setShowAddIndustry] = useState(false);
  const [showAddSkillsFor, setShowAddSkillsFor] = useState(null);

  return (
    <div className={styles.ManageSkills}>
      {showAddIndustry && (
        <AddIndustryPopUp
          show={showAddIndustry}
          setShow={setShowAddIndustry}
          setSkills={setSkills}
        />
      )}
      {showAddSkillsFor && (
        <ManageSillsPopup
          industry={showAddSkillsFor}
          setShow={setShowAddSkillsFor}
        />
      )}
      {SkillCategories.map((industry) => {
        return (
          <div key={industry.id}>
            <div className={styles.industry}>
              {<strong>{industry.name}</strong>}
              <ol>
                {industry.skills.map((skill) => {
                  return <li key={skill?.id}>{skill?.skill}</li>;
                })}
              </ol>
              <CustomButton
                variant={2}
                onClick={() => {
                  setShowAddSkillsFor(industry);
                }}
              >
                Manage Skills
              </CustomButton>
            </div>
          </div>
        );
      })}
      <br />
      <CustomButton
        onClick={() => {
          setShowAddIndustry(true);
        }}
      >
        Add Industry
      </CustomButton>
    </div>
  );
};

export default ManageSkills;
