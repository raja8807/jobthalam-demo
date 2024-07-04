import PortalScreen from "@/components/screens/portal/portal";
import React from "react";

const PortalPage = ({
  currentUser,
  session,
  setCurrentUser,
  setSession,
  supabase,
}) => {
  return (
    <PortalScreen
      currentUser={currentUser}
      session={session}
      setCurrentUser={setCurrentUser}
      setSession={setSession}
      supabase={supabase}
    />
  );
};

export default PortalPage;
