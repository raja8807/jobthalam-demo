import React, { useEffect, useState } from "react";
import styles from "./skills_list.module.scss";
import { Accordion, Col } from "react-bootstrap";
import JobsList from "./jobs_list/jobs_list";
import CustomButton from "@/components/ui/custom_button/custom_button";
import Link from "next/link";
import AddSkillsPopUp from "./add_skills_popup/add_skills_popup";
import { Download, Plus, Trash } from "react-bootstrap-icons";
import ConfirmPopup from "@/components/ui/confirm_popup/confirm_popup.jsx";
import { useDeleteSkill } from "@/hooks/skill_hooks/skill_hooks";

const SkillsList = ({
  currentIndustry,
  allAdminJobs,
  currentIndustryIndex,
  setSkills,
  allEmployerJobs,
  setAllAdminJobs,
  
}) => {
  const [showAddSkills, setShowAddSkills] = useState(false);
  const [showDeleteIndustry, setShowDeleteIndustry] = useState(false);

  const { mutateAsync: deleteIndustryAsync, isLoading: deleteSkillIsLoading } =
    useDeleteSkill();

  const deleteIndustry = async () => {
    try {
      const delRes = await deleteIndustryAsync(currentIndustry?.id);

      if (delRes.status === 204) {
        setSkills((prev) => prev.filter((i) => i.id !== currentIndustry.id));
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  return (
    <>
      <AddSkillsPopUp
        show={showAddSkills}
        setShow={setShowAddSkills}
        currentIndustryIndex={currentIndustryIndex}
        currentIndustry={currentIndustry}
        setAllSkills={setSkills}
      />

      <ConfirmPopup
        show={showDeleteIndustry}
        setShow={setShowDeleteIndustry}
        onConfirm={deleteIndustry}
        isLoading={deleteSkillIsLoading}
      />

      <Col xs={12} md={9}>
        <div className={styles.SkillsList}>
          <div className={styles.top}>
            <div>
              <CustomButton
                onClick={() => {
                  setShowAddSkills(true);
                }}
              >
                Add New Skills <Plus />
              </CustomButton>
              <Link
                href="/templates/upload_jobs_template.xlsx"
                download="upload_jobs_template"
                target="_blank"
              >
                <CustomButton variant={3}>
                  Download Excel Template <Download />
                </CustomButton>
              </Link>
            </div>
            <div>
              <CustomButton
                onClick={() => {
                  setShowDeleteIndustry(true);
                }}
                disabled={currentIndustry?.skills?.length !== 0}
              >
                Delete Industry <Trash />
              </CustomButton>
            </div>
          </div>
          <br />
          <Accordion>
            {currentIndustry.skills.map((skill, idx) => {
              return (
                <Accordion.Item key={skill.id} eventKey={`${idx}`}>
                  <Accordion.Header>{skill.skill}</Accordion.Header>
                  <Accordion.Body>
                    <JobsList
                      skill={skill}
                      allAdminJobs={allAdminJobs}
                      allEmployerJobs={allEmployerJobs}
                      setAllAdminJobs={setAllAdminJobs}
                      setSkills={setSkills}
                      currentIndustryIndex={currentIndustryIndex}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </Col>
    </>
  );
};

export default SkillsList;
