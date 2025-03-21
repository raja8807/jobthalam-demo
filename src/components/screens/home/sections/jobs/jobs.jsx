import React, { useEffect, useState } from "react";
import styles from "./jobs.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Image, Modal } from "react-bootstrap";
import {
  ArrowLeftSquare,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Calendar2,
  CurrencyDollar,
  GeoAlt,
  PersonBadge,
  X,
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
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";
import CustomButton from "@/components/ui/custom_button/custom_button";

const Card = ({ data, isInternship, isLoading, setShowLogin }) => {
  const loading = isLoading || !data;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        centered
        className={styles.enqModal}
      >
        <Modal.Header>
          <div className={styles.head}>
            <b>Get Started</b>
            <X
              onClick={(e) => {
                setShowModal(false);
              }}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.form}>
            <div className={styles.controls}>
              <CustomInput placeHolder="Name" />
              <CustomInput placeHolder="Year" />
              <CustomSelect
                placeholder="Department"
                options={["Engineering", "Arts & Science"]}
              />
              <CustomInput placeHolder="Duration" type="number" />
              <div className={styles.agree}>
                <input type="checkbox" />
                <p>
                  Agree to our <span>Terms and Conditions.</span>
                </p>
              </div>
              <br />
              <CustomButton>Submit</CustomButton>
            </div>

            <div className={styles.signup}>
              <div className={styles.divider}>
                <hr />
                <small>OR</small>
                <hr />
              </div>
              <CustomButton
                variant={2}
                onClick={() => {
                  setShowModal(false);
                  setShowLogin(true);
                }}
              >
                Register As Candidate
              </CustomButton>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div
        className={`${styles.card} ${!loading ? styles.notLoading : ""}`}
        onClick={() => {
          if (!isLoading) {
            setShowModal(true);
          }
        }}
      >
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
                <Image
                  src={data.logo_url || "/company_logo_placeholder.png"}
                  alt="logo"
                  width={50}
                />
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
    </>
  );
};

const JobsSection = ({ setShowLogin }) => {
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
                  <Card
                    data={cardData}
                    isLoading={isLoading}
                    setShowLogin={setShowLogin}
                  />
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
                  <Card
                    data={cardData}
                    isInternship
                    isLoading={isLoading}
                    setShowLogin={setShowLogin}
                  />
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
