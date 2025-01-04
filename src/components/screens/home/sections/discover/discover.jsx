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

const JobCard = ({ data }) => {
  return (
    <div className={styles.jobCard}>
      <div className={styles.Ctop}>
        <div>
          <Image src="/assets/avatar.png" width={100} />
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

const DiscoverSection = () => {
  const cards = [
    {
      text: "I would like to appreciate  Jobthalam team for extending the continuous cooperation and support. I am happy with the services and would like to continue with the same for fulfilling our hiring needs.",
      name: "Subramanian.K",
      title: "Deputy General Manager,(HYUNDAI) GLOVES INDIA PVT.Ltd.",
    },
    {
      text: " jobthalam.com is great help for us in finding the candidates specially in mechanical engineering. Also jobthalam & Job posting responses are fantastic. We thank you for your continuous support.",
      name: "Dr.VinothKumar K",
      title: "Sr.Manager Technology Sales,HUBERT ENVIRO CARE SYSTEMS (P) Ltd.",
    },
    {
      text: " We are happy to share that jobthalam has been a great hiring partner for us. We appreciate its good services, fast and friendly support.",
      name: "Dr.K.G.Parthiban",
      title: "Prinicipal,DHANISH AHAMED INSTITUTE OF TECHNOLOGY.",
    },
    {
      text: " I would like to thank jobthalam team for the great amount of support that they have provided. We are really happy with the services of jobthalam and very much satisfied in using it.",
      name: "Dr.R.Vijayarangan",
      title: "Advisor,Innovation&Incubation,GNANAMANI COLLEGE OF TECHNOLOGY.",
    },
    {
      text: " jobthalam is the real deal - a great partner and passionate champion of remote work! They help Sundaram Fasteners ltd connect with job seekers who are specifically looking for remote and/or flexible work.",
      name: "KALIMUTHU.K",
      title:
        "Deputy General Manager-Personal,SUNDARAM FASTENERS LIMITED Autolec Division.",
    },
    {
      text: " jobthalam system is user friendly and easy to use. Also, we have found jobthalam and their support staff to be efficient, friendly and professional. We have no hesitation in recommending jobthalam.com.",
      name: "Dr.I.Paul Theophilos Rajkumar",
      title:
        "Undustry Collaboration and Placement,PANIMALAR ENGINEERING COLLEGE.",
    },
    {
      text: " jobthalam.com has beyond doubt helped many organization grow in a big way. The database is quite good enough for us to bank on in satisfying our client's requirement. We are content with the service delivery from the support staff who are extremely hospitable…Way to go jobthalam.",
      name: "S.SenthilKumar",
      title: "Chief Executive Officer,TANSTIA-FNF SERVICE CENTRE.",
    },
    {
      text: " Just a note to express my appreciation for the outstanding service that we receive from jobthalam.com, we have had their service for about 3 years now, and have been very happy with the service offered. Jobthalam.com has helped to make our recruitment process much easier and cost effective.",
      name: "Aloha.K.Kumaran",
      title: "Chief Executive Officer,ALOHA INDIA PVT.Ltd.",
    },
  ];
  // 9.jobthalam.com is a great platform for talent sourcing, a wide range of profiles from all specialties is available, and the site is very much user user friendly. The team is very supportive helpful.
  // Dr.V.Kavitha,Assistant professor, Department of Data science and Business Systems
  // School of computing, SRM Institute of Science and Technology,
  // Katankullathur.

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
                slidesPerView: 1,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView:1,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            {cards.map((card, idx) => {
              return (
                <SwiperSlide key={`card_${idx}`}>
                  <JobCard data={card} />
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
