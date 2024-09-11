import React from "react";
import { Col } from "react-bootstrap";
import styles from "./industry_list.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { Plus } from "react-bootstrap-icons";

const IndustryList = ({
  SkillCategories,
  currentIndustryIndex,
  setCurrentIndustryIndex,
}) => {
  return (
    <Col xs={3}>
      <div className={styles.IndustryList}>
        <CustomButton
          onClick={() => {
            setShowAddIndustry(true);
          }}
          variant={2}
        >
          Create New <Plus />
        </CustomButton>
        <br />
        <br />
        {SkillCategories.map((ind, idx) => {
          return (
            <div
              key={ind.id}
              className={`${styles.Industry} ${
                currentIndustryIndex === idx ? styles.active : ""
              }`}
              onClick={() => {
                setCurrentIndustryIndex(idx);
              }}
            >
              {ind.name}
            </div>
          );
        })}
      </div>
    </Col>
  );
};

export default IndustryList;
