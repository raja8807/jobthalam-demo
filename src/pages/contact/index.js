import ContactScreen from "@/components/screens/contact/contact";
import { getAllData } from "@/libs/firebase/firebase";
import React from "react";

const ContactPage = ({ data }) => {
  console.log(data);

  return (
    <ContactScreen
      candidateFaqData={data?.candidateFaqData}
      candidateContactData={data.candidateContactData}
    />
  );
};

export default ContactPage;

export async function getServerSideProps() {
  try {
    const candidateFaqData = (await getAllData("candidateFaqData")) || [];
    const candidateContactData =
      (await getAllData("candidateContactData")) || null;

    const data = {
      candidateFaqData,
      candidateContactData: candidateContactData?.[0] || null,
    };
    return { props: { data: data || null } };
  } catch (ex) {
    return { props: { data: null } };
  }
}
