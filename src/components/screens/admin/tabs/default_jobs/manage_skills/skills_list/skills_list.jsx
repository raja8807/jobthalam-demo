import React, { useEffect, useState } from "react";
import styles from "./skills_list.module.scss";
import { Accordion, Col } from "react-bootstrap";
import JobsList from "./jobs_list/jobs_list";
import CustomButton from "@/components/ui/custom_button/custom_button";
import Link from "next/link";

const SkillsList = ({ currentIndustry, allAdminJobs }) => {
  return (
    <Col>
      <div className={styles.SkillsList} xs={9}>
        <Link
          href="/templates/upload_jobs_template.xlsx"
          download="upload_jobs_template"
          target="_blank"
        >
          <CustomButton variant={3}>Download Excel Template</CustomButton>
        </Link>
        <br />
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
  );
};

export default SkillsList;
