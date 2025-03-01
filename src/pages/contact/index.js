import ContactScreen from "@/components/screens/contact/contact";
import { getAllData } from "@/libs/firebase/firebase";
import React from "react";

const ContactPage = ({data}) => {
  return <ContactScreen candidateFaqData={data?.candidateFaqData} />;
};

export default ContactPage;

export async function getServerSideProps() {
  try {

    const candidateFaqData = (await getAllData("candidateFaqData")) || [];

    const data = {
      candidateFaqData,
    };
    return { props: { data: data || null } };
  } catch (ex) {
    return { props: { data: null } };
  }
}
