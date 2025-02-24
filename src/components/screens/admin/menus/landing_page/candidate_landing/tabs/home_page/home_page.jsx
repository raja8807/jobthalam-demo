import React from "react";
import styles from "./home_page.module.scss";
import CustomForm from "@/components/ui/custom_form/custom_form";

const HomePageTab = () => {
  return (
    <div className={styles.HomePageTab}>
      <CustomForm />
    </div>
  );
};

export default HomePageTab;
