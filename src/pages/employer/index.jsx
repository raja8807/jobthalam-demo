import EmployerScreen from "@/components/screens/employer/employer";
import PortalScreen from "@/components/screens/employer/portal/portal";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { auth } from "@/libs/firebase/firebase";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const EmployerPage = ({ currentUser, session, setCurrentUser }) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (!auth.currentUser) {
        router.push("/");
      }
    }, 1000);
  }, [auth.currentUser]);

  if (session) {
    return (
      <EmployerScreen
        currentUser={currentUser}
        session={session}
        setCurrentUser={setCurrentUser}
      />
    );
  }
  return <LoadingScreen />;
};

export default EmployerPage;
