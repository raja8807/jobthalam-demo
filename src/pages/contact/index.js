import ContactScreen from "@/components/screens/contact/contact";
import { getAllData } from "@/libs/firebase/firebase";
import React from "react";

const ContactPage = ({ data }) => {
  console.log(data);

  return (
    <ContactScreen
      employerFaqData={data?.employerFaqData}
      employerContactData={data.employerContactData}
    />
  );
};

export default ContactPage;

export async function getServerSideProps() {
  try {
    const employerFaqData = (await getAllData("employerFaqData")) || [];
    const employerContactData =
      (await getAllData("employerContactData")) || null;

    const data = {
      employerFaqData,
      employerContactData: employerContactData?.[0] || null,
    };
    return { props: { data: data || null } };
  } catch (ex) {
    return { props: { data: null } };
  }
}
