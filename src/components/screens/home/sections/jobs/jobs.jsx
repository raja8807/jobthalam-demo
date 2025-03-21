import React, { useEffect, useState } from "react";
import styles from "./jobs.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Image } from "react-bootstrap";
import {
  ArrowLeftSquare,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Calendar2,
  CurrencyDollar,
  GeoAlt,
  PersonBadge,
} from "react-bootstrap-icons";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { useFetchHomePageJobs } from "@/hooks/home_page/home_page";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Card = ({ data, isInternship, isLoading }) => {
  const loading = isLoading || !data;

  return (
    <div className={`${styles.card} ${!loading ? styles.notLoading : ""}`}>
      {loading ? (
        <>
          <Skeleton height={50} />
          <Skeleton height={75} />
          <Skeleton height={75} />
        </>
      ) : (
        <>
          <div className={styles.label}>
            <ArrowUpRight /> Actively hiring
          </div>
          <div className={styles.top}>
            <div>
              <h3>{data.title}</h3>
              <p>{data.company_name}</p>
            </div>
            <div>
              <Image src={data.logo_url || "/company_logo_placeholder.png"} alt="logo" width={50} />
            </div>
          </div>
          <div className={styles.details}>
            <hr />
            <div>
              <GeoAlt /> {data.location}
            </div>
            <div>
              <CurrencyDollar /> {data.salary}
            </div>
            {isInternship ? (
              <div>
                <Calendar2 /> {data.duration} Months
              </div>
            ) : (
              <div>
                <PersonBadge /> {data.experience}
              </div>
            )}
          </div>
          <div className={styles.controls}>
            <div className={styles.tag}>{data.type}</div>
            <div>
              <p>
                View Details <ArrowRight />
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const JobsSection = () => {
  const { data, isLoading } = useFetchHomePageJobs();
  const [jobs, setJobs] = useState([null, null, null, null, null, null]);
  const [internships, setInternships] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  useEffect(() => {
    if (data?.data) {
      setJobs(data.data.filter((j) => j.type !== "Internship"));
      setInternships(data.data.filter((j) => j.type === "Internship"));
    }
  }, [data]);

  console.log(internships);

  return (
    <div className={styles.JobsSection}>
      <CustomContainer>
        <h2>
          Popular Jobs on <span>Jobthalam</span>
        </h2>
        <br />
        <div className={styles.wrap}>
          <Swiper
            spaceBetween={20}
            pagination={
              {
                //   clickable: true,
              }
            }
            loop
            navigation={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
            speed={1500}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            {jobs.map((cardData, idx) => {
              return (
                <SwiperSlide key={`job_card_${idx}`}>
                  <Card data={cardData} isLoading={isLoading} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </CustomContainer>
      <br />
      <br />
      <CustomContainer>
        <h2>
          Popular Internships on <span>Jobthalam</span>
        </h2>
        <br />
        <div className={styles.wrap}>
          <Swiper
            spaceBetween={20}
            pagination={
              {
                //   clickable: true,
              }
            }
            loop
            navigation={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
            speed={1500}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            {internships.map((cardData, idx) => {
              return (
                <SwiperSlide key={`job_card_${idx}`}>
                  <Card data={cardData} isInternship isLoading={isLoading} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </CustomContainer>
    </div>
  );
};

export default JobsSection;
