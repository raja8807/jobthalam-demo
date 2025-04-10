import React from "react";
import styles from "./section_head.module.scss";

const SectionHead = ({children}) => {
  return (
    <div className={styles.SectionHead}>
      <h1>{children}</h1>
    </div>
  );
};

export default SectionHead;
