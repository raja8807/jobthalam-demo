import React, { useState } from "react";
import styles from "./manage_skills.module.scss";
import AddIndustryPopUp from "./add_industry/add_industry";
import { Row } from "react-bootstrap";
import IndustryList from "./industry_list/industry_list";
import SkillsList from "./skills_list/skills_list";

const ManageSkills = ({ SkillCategories, setSkills, adminJobs,allEmployerJobs,setAllAdminJobs }) => {
  const [showAddIndustry, setShowAddIndustry] = useState(false);

  const [currentIndustryIndex, setCurrentIndustryIndex] = useState(0);

  const currentIndustry = SkillCategories[currentIndustryIndex || 0];

  return (
    <div className={styles.ManageSkills}>
      {showAddIndustry && (
        <AddIndustryPopUp
          show={showAddIndustry}
          setShow={setShowAddIndustry}
          setSkills={setSkills}
        />
      )}

      <Row className={styles.wrap}>
        <IndustryList
          SkillCategories={SkillCategories}
          currentIndustryIndex={currentIndustryIndex}
          setCurrentIndustryIndex={setCurrentIndustryIndex}
          setShowAddIndustry={setShowAddIndustry}
        />
        {currentIndustry && (
          <SkillsList
            currentIndustry={currentIndustry}
            allAdminJobs={adminJobs}
            key={currentIndustry?.id}
            currentIndustryIndex={currentIndustryIndex}
            setSkills={setSkills}
            allEmployerJobs={allEmployerJobs}
            setAllAdminJobs={setAllAdminJobs}
          />
        )}
      </Row>
    </div>
  );
};

export default ManageSkills;
