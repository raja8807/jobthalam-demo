import AboutScreen from "@/components/screens/about/about";
import { getAllData } from "@/libs/firebase/firebase";
import React from "react";

const AboutPage = ({ aboutData = [] }) => {
  return <AboutScreen aboutData={aboutData?.[0]} />;
};

export default AboutPage;

export async function getServerSideProps() {
  // Fetch data from external API
  const aboutData = await getAllData("aboutPageData");

  // Pass data to the page via props
  return { props: { aboutData } };
}
