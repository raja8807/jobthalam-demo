import CandidateLandingScreen from "@/components/screens/admin/menus/landing_page/candidate_landing/candidate_landing";
import { getAllData } from "@/libs/firebase/firebase";
import React from "react";

const CandidateLandingPage = ({ aboutData = [], candidateHomePageData }) => {

  //   const aboutData = {
  //     banner: {
  //       heading: [
  //         {
  //           text: "About",
  //           tag: "text",
  //         },
  //         {
  //           text: "Jobthalam",
  //           tag: "highlight",
  //         },
  //       ],
  //       text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad iste debitis quidem, cupiditate voluptate quasi. Temporibus animi ipsam incidunt repudiandae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci aliquid quo repellendus officia eum cupiditate ex asperiores a eveniet sequi?",
  //       img: "/logo/logo_f_v.png",
  //     },

  //     sections: [
  //       {
  //         type: "row",
  //         head: "Who We Are",
  //         caption:
  //           "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, harum?",
  //         text: "Jobthalam is an all-inclusive online job search portal created to connect jobseekers with potential employers by providing a comprehensive and easy-to-use service for discovering employment opportunities",
  //         img: "/user.jpg",
  //       },
  //       {
  //         type: "clients",
  //         data: [
  //           "/assets/Google_2015_logo.svg.webp",
  //           "/assets/Google_2015_logo.svg.webp",
  //           "/assets/Google_2015_logo.svg.webp",
  //           "/assets/Google_2015_logo.svg.webp",
  //           "/assets/Google_2015_logo.svg.webp",
  //           "/assets/Google_2015_logo.svg.webp",
  //         ],
  //       },
  //       {
  //         type: "row",

  //         head: "Who We Are",
  //         caption:
  //           "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, harum?",
  //         text: "Jobthalam is an all-inclusive online job search portal created to connect jobseekers with potential employers by providing a comprehensive and easy-to-use service for discovering employment opportunities",
  //         img: "/assets/abt_banner.svg",
  //       },
  //       {
  //         type: "count",
  //         data: [
  //           {
  //             id: "ex",
  //             title: "Jobseekers have used Jobthalam",
  //             number: 10,
  //             add: "M",
  //           },
  //           {
  //             id: "cl",
  //             title: "Current Vacancies",
  //             number: 15,
  //             add: "M",
  //           },
  //           {
  //             id: "aw",
  //             title: "States in which we are present",
  //             number: 20,
  //           },
  //         ],
  //       },
  //       {
  //         type: "row",

  //         head: "Who We Are",
  //         caption:
  //           "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, harum?",
  //         text: "Jobthalam is an all-inclusive online job search portal created to connect jobseekers with potential employers by providing a comprehensive and easy-to-use service for discovering employment opportunities",
  //         img: "/assets/abt_banner.svg",
  //       },
  //     ],
  //   };

  return (
    <CandidateLandingScreen
      aboutData={aboutData?.[0]}
      candidateHomePageData={candidateHomePageData}
    />
  );
};

export default CandidateLandingPage;

export async function getServerSideProps() {
  // Fetch data from external API
  const aboutData = await getAllData("aboutPageData");
  const homePageData =
    (await getAllData("candidateHomePageData")) || [];
  const candidateTestimonialsData =
    (await getAllData("candidateTestimonialsData")) || [];
  const candidateFaqData = (await getAllData("candidateFaqData")) || [];
  const candidateContactData = (await getAllData("candidateContactData")) || [];

  const candidateHomePageData = {
    homePageData: homePageData?.[0] || null,
    candidateTestimonialsData: candidateTestimonialsData?.[0] || null,
    candidateFaqData: candidateFaqData || [],
    candidateContactData: candidateContactData || null,
  };

  // Pass data to the page via props
  return { props: { aboutData, candidateHomePageData } };
}
