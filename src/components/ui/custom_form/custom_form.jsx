import React from "react";
import styles from "./custom_form.module.scss";

const CustomForm = ({ title, children, onSubmit, additionalElement }) => {
  return (
    <form
      className={styles.CustomForm}
      onSubmit={async (e) => {
        e.preventDefault();
        if (onSubmit) {
          try {
            await onSubmit(e);
          } catch (error) {
            console.log(error);
          }
        }
      }}
    >
      {title && (
        <>
          <div className={styles.head}>
            <h5>{title}</h5>
            <div>{additionalElement}</div>
          </div>
            <hr />
        </>
      )}
      {children}
    </form>
  );
};

export default CustomForm;
