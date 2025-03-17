import React from "react";
import styles from "./discover.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Image, Row } from "react-bootstrap";
import { Search, Star, StarFill } from "react-bootstrap-icons";
import CustomButton from "@/components/ui/custom_button/custom_button";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const TestimonialCard = ({ data }) => {


  const stars = Array.from({ length: 5 }, (_,i) => {
    return `star_${i}`;
  });



  return (
    <div className={styles.jobCard}>
      <div className={styles.Ctop}>
        <div>
          <Image src="/assets/avatar.png" width={100} alt="avatar" />
        </div>
        <div className={styles.stars}>
          {
            stars.map((star)=>{
              return <StarFill  key={star}/>
            })
          }
        </div>
        <div>
          <p>{data.name}</p>
          <small>{data.title}</small>
        </div>
      </div>
      <p className={styles.text}>{data.text}</p>
    </div>
  );
};

const DiscoverSection = ({ testimonials = [] }) => {


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
              For the first time in South India, We will send you the job alerts
              you are looking for in a minute via Whatsapp for free
            </p>
          </div>
        </div>

        <div className={styles.jobs}>
          <Swiper
            spaceBetween={20}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            speed={1500}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            {testimonials.map((card, idx) => {
              return (
                <SwiperSlide key={`card_${idx}`}>
                  <TestimonialCard data={card} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <br />

        {/* <div className={styles.stn}>
          <CustomButton>
            <Search /> Browse More Jobs
          </CustomButton>
        </div> */}
      </CustomContainer>
    </section>
  );
};

export default DiscoverSection;
