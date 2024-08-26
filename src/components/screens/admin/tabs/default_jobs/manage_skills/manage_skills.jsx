import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useState } from "react";
import styles from "./manage_skills.module.scss";
import AddIndustryPopUp from "./add_industry/add_industry";
import ManageSillsPopup from "./manage_skills/manage_skills";
import ConfirmPopup from "@/components/ui/confirm_popup/confirm_popup.jsx";
import { useDeleteIndustry } from "@/hooks/skill_hooks/skill_hooks";

const IndustryCard = ({ industry, setSkills }) => {
  const [showAddSkillsFor, setShowAddSkillsFor] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const { mutateAsync, isLoading } = useDeleteIndustry();
  const deleteIndustry = async () => {
    const res = await mutateAsync({
      industry: industry.name,
    });

    if (res?.status === 204) {
      setSkills((ind) => {
        return ind.filter((s) => s?.id !== industry?.id);
      });
    }
  };

  return (
    <div>
      {showAddSkillsFor && (
        <ManageSillsPopup
          industry={showAddSkillsFor}
          setShow={setShowAddSkillsFor}
          setSkills={setSkills}
        />
      )}

      {showConfirmDelete && (
        <ConfirmPopup
          show={showConfirmDelete}
          setShow={setShowConfirmDelete}
          onConfirm={deleteIndustry}
          isLoading={isLoading}
        />
      )}

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
          Update
        </CustomButton>
        &nbsp; &nbsp;
        <CustomButton
          variant={2}
          onClick={() => {
            setShowConfirmDelete(true);
          }}
        >
          Delete
        </CustomButton>
      </div>
    </div>
  );
};

const ManageSkills = ({ SkillCategories, setSkills }) => {
  const [showAddIndustry, setShowAddIndustry] = useState(false);

  return (
    <div className={styles.ManageSkills}>
      {showAddIndustry && (
        <AddIndustryPopUp
          show={showAddIndustry}
          setShow={setShowAddIndustry}
          setSkills={setSkills}
        />
      )}

      {SkillCategories.map((industry) => {
        return (
          <IndustryCard
            key={industry?.id}
            industry={industry}
            setSkills={setSkills}
          />
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
