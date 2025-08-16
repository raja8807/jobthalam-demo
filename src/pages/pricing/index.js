import PricingScreen from "@/components/screens/pricing/pricing";
import React from "react";

const PricingPage = ({ session, setShowLogin }) => {
  return <PricingScreen session={session} setShowLogin={setShowLogin} />;
};

export default PricingPage;
