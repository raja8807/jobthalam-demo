import React from "react";
import styles from "./vacancies.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";

const VCard = ({ data }) => {
  const { title, positions } = data;

  return (
    <div className={styles.VCard}>
      <p>{title}</p>
      <small>{positions} Open Positions</small>
    </div>
  );
};

const Scroller = ({ data, isBack }) => {
  const speed = 20000;

  return (
    <div className={`${styles.scroller} ${styles.back}`}>
      <div className={styles.inner}>
        <div className={styles.wrapper}>
          <section style={{ "--speed": `${speed}ms` }}>
            {data.map((v) => (
              <VCard key={v.title} data={v} />
            ))}
          </section>
          <section style={{ "--speed": `${speed}ms` }}>
            {data.map((v) => (
              <VCard key={v.title} data={v} />
            ))}
          </section>
          <section style={{ "--speed": `${speed}ms` }}>
            {data.map((v) => (
              <VCard key={v.title} data={v} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

const VacanciesSection = ({vacanciesData=[]}) => {
  return (
    <div className={styles.CategorySection}>
      <CustomContainer>
        <div>
          <h2>
            Most Popular <span>Vacancies</span>
          </h2>
        </div>
        <br />
      </CustomContainer>
        <Scroller data={vacanciesData} />
    </div>
  );
};

export default VacanciesSection;
