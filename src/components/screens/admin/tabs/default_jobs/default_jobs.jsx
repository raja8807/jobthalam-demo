import React, { useState } from "react";
import styles from "./default_jobs.module.scss";
import MainFrame from "@/components/ui/main_frame/main_frame";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";
import SKILL_CATEGORIES from "@/constants/skills";
import { Col, Row } from "react-bootstrap";

const DefaultJobs = () => {
  const [currentIndustry, setCurrentIndustry] = useState(null);
  const [currentSkill, setCurrentSkill] = useState(null);

  const getSkills = (industryId) => {
    if (industryId) {
      const x = SKILL_CATEGORIES.find((sc) => sc.id === industryId);
      return x.skills || [];
    }
  };

  return (
    <MainFrame>
      <Row>
        <Col xs={12} md={4}>
          <CustomSelect
            options={SKILL_CATEGORIES.map((s) => s.id)}
            label="Select Industry"
            value={currentIndustry}
            onChange={(e, v) => {
              setCurrentIndustry(v);
              setCurrentSkill(null);
            }}
          />
        </Col>
        <Col xs={12} md={4}>
          {currentIndustry && (
            <CustomSelect
              options={getSkills(currentIndustry)}
              label="Select Industry"
              value={currentSkill}
            />
          )}
        </Col>
      </Row>
    </MainFrame>
  );
};

export default DefaultJobs;
