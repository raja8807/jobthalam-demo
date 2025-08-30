import React from "react";
import styles from "./control_label.module.scss";

const ControlLabel = ({ label, required, children }) => {
  return (
    <span className={styles.ControlLabel}>
      {children || label}
      {required ? "*" : ""}
    </span>
  );
};

export default ControlLabel;
