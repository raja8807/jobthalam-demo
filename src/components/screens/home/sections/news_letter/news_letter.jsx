import React from "react";
import styles from "./new_letter.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomButton from "@/components/ui/custom_button/custom_button";

const NewsLetterSection = () => {
  return (
    <section className={styles.NewsLetterSection}>
      <CustomContainer>
        <div className={styles.wrap}>
          <h2>Get Latest News</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate,
            nulla.
          </p>
          <div>
            <input placeholder="Your Email" />
            <CustomButton>Subscribe</CustomButton>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default NewsLetterSection;
