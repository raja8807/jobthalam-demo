import React from "react";
import styles from "./control_label.module.scss";

const ControlLabel = ({ label }) => {
  return <span className={styles.ControlLabel}>{label}*</span>;
};

export default ControlLabel;
