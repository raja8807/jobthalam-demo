import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useState } from "react";
import styles from "./manage_skills.module.scss";
import AddIndustryPopUp from "./add_industry/add_industry";
import ManageSillsPopup from "./manage_skills/manage_skills";
import ConfirmPopup from "@/components/ui/confirm_popup/confirm_popup.jsx";
import { useDeleteIndustry } from "@/hooks/skill_hooks/skill_hooks";
import { Row } from "react-bootstrap";
import IndustryList from "./industry_list/industry_list";
import SkillsList from "./skills_list/skills_list";
import { Plus } from "react-bootstrap-icons";

const ManageSkills = ({ SkillCategories, setSkills, adminJobs }) => {
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
        <SkillsList
          currentIndustry={currentIndustry}
          allAdminJobs={adminJobs}
          key={currentIndustry?.id}
        />
      </Row>
    </div>
  );
};

export default ManageSkills;
