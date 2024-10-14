import React, { useState } from "react";
import styles from "./new_skill_popup.module.scss";
import AddIndustryPopUp from "../add_industry/add_industry";

const NewSkillPopupButton = () => {
  const [showNew, setShowNew] = useState(false);

  return (
    <>
      <AddIndustryPopUp show={showNew} setShow={setShowNew} />
      <p className={styles.NewSkillPopupButton}>
        Cannot find relative skill?{" "}
        <span
          onClick={() => {
            setShowNew(true);
          }}
        >
          Click here
        </span>
      </p>
    </>
  );
};

export default NewSkillPopupButton;
