import React from "react";
import styles from "./new_skill_popup.module.scss";

const NewSkillPopupButton = () => {
    
  return (
    <>
      <p className={styles.NewSkillPopupButton}>
        Cannot find relative skill? <span>Click here</span>
      </p>
    </>
  );
};

export default NewSkillPopupButton;
