import React from "react";
import styles from "./discover.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Image, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import CustomButton from "@/components/ui/custom_button/custom_button";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const JobCard = () => {
  return (
    <Col xs={12} md={4} lg={3}>
      <div className={styles.jobCard}>
        <div className={styles.type}>Full Time</div>
        <Image src="/apple_logo.jpg" alt="logo" width={80} height={80} />
        <div className={styles.text}>
          <p>Lorem, ipsum.</p>
          <small>Lorem, ipsum.</small>
        </div>
        <div className={styles.btn}>
          <Search /> Browse Job
        </div>
      </div>
    </Col>
  );
};

const DiscoverSection = () => {
  const jobs = [
    {
      id: "sc",
    },
    {
      id: "sc",
    },
    {
      id: "sc",
    },
    {
      id: "sc",
    },
    {
      id: "sc",
    },
    {
      id: "sc",
    },
    {
      id: "sc",
    },
    {
      id: "sc",
    },
  ];

  return (
    <section className={styles.DiscoverSection}>
      <CustomContainer>
        <div className={styles.top}>
          <div className={styles.left}>
            <h2>
              Discover The Power
              <br />
              of Our <span>Job Platform</span>
            </h2>
          </div>
          <div className={styles.right}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              obcaecati assumenda voluptate, voluptatibus est delectus
              aspernatur molestiae cum magnam velit nisi fuga dignissimos
              officiis repudiandae corrupti quibusdam officiis repudiandae
              corrupti quibusdam officiis repudiandae corrupti quibusdam
            </p>
          </div>
        </div>

        <div className={styles.jobs}>
          <Swiper
            centeredSlides={true}
            spaceBetween={20}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            
            loop
            navigation={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            {jobs.map((job, idx) => {
              return (
                <SwiperSlide key={job.id}>
                  <JobCard key={job.id} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <br />

        <div className={styles.stn}>
          <CustomButton>
            <Search /> Browse More Jobs
          </CustomButton>
        </div>
      </CustomContainer>
    </section>
  );
};

export default DiscoverSection;
