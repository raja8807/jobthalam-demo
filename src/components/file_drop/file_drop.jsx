import React from "react";
import { CloudUpload } from "react-bootstrap-icons";
import styles from "./file_drop.module.scss";
import ControlLabel from "../ui/contol_label/control_label";

const FileDrop = ({ label }) => {
  return (
    <div>
      {label && <ControlLabel label={label} />}
      <div className={styles.CloudUpload}>
        <CloudUpload />
      </div>
    </div>
  );
};

export default FileDrop;
