import React, { useEffect, useState } from "react";
import styles from "./skills_list.module.scss";
import { Accordion, Col } from "react-bootstrap";
import JobsList from "./jobs_list/jobs_list";
import CustomButton from "@/components/ui/custom_button/custom_button";
import Link from "next/link";
import AddSkillsPopUp from "./add_skills_popup/add_skills_popup";
import { Download, Plus } from "react-bootstrap-icons";

const SkillsList = ({
  currentIndustry,
  allAdminJobs,
  currentIndustryIndex,
  setSkills
}) => {
  const [showAddSkills, setShowAddSkills] = useState(false);

  return (
    <>
      <AddSkillsPopUp
        show={showAddSkills}
        setShow={setShowAddSkills}
        currentIndustryIndex={currentIndustryIndex}
        currentIndustry={currentIndustry}
        setAllSkills={setSkills}
      />

      <Col xs={12} md={9}>
        <div className={styles.SkillsList} >
          <div className={styles.top}>
          <CustomButton
              onClick={() => {
                setShowAddSkills(true);
              }}
            >
              Add New Skills <Plus/>
            </CustomButton>
            <Link
              href="/templates/upload_jobs_template.xlsx"
              download="upload_jobs_template"
              target="_blank"
            >
              <CustomButton variant={3}>Download Excel Template <Download/></CustomButton>
            </Link>
            
          </div>
          <br />
          <Accordion>
            {currentIndustry.skills.map((skill, idx) => {
              return (
                <Accordion.Item key={skill.id} eventKey={`${idx}`}>
                  <Accordion.Header>{skill.skill}</Accordion.Header>
                  <Accordion.Body>
                    <JobsList skill={skill} allAdminJobs={allAdminJobs} />
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
