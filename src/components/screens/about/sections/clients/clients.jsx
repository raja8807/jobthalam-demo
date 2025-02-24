import React from "react";
import { Image } from "react-bootstrap";
import styles from "./clients.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";

const Scroller = ({ images, isBack }) => {
  const speed = 20000;

  return (
    <div className={`${styles.Banner} ${isBack ? styles.back : ""}`}>
      <div className={styles.inner}>
        <div className={styles.wrapper}>
          <section style={{ "--speed": `${speed}ms` }}>
            {images.map(({ id, image }) => (
              <div className={styles.image} key={id}>
                <Image height={100} src={image} alt={id} />
              </div>
            ))}
          </section>
          <section style={{ "--speed": `${speed}ms` }}>
            {images.map(({ id, image }) => (
              <div className={styles.image} key={id}>
                <Image height={100} src={image} alt={id} />
              </div>
            ))}
          </section>
          <section style={{ "--speed": `${speed}ms` }}>
            {images.map(({ id, image }) => (
              <div className={styles.image} key={id}>
                <Image height={100} src={image} alt={id} />
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

const ClientsSection = ({ data = [] }) => {
  const images = data.map((image) => ({
    id: Math.random(),
    image,
  }));

  return (
    <div className={styles.ClientsSection}>
      <Scroller images={images} isBack />
      <CustomContainer>
        <div className={styles.x}></div>
      </CustomContainer>
    </div>
  );
};

export default ClientsSection;
