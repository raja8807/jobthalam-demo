import CandidatesScreen from "@/components/screens/candidates/candidates";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { auth } from "@/libs/firebase/firebase";
// import { auth } from "firebase-admin";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Candidates = ({ currentUser, session, setCurrentUser }) => {
  const router = useRouter();

  console.log(session);

  useEffect(() => {
    if (session !== undefined) {
      if (!auth.currentUser) {
        router.push("/");
      }
    }
  }, [auth.currentUser, session]);

  if (session) {
    return (
      <CandidatesScreen
        currentUser={currentUser}
        session={session}
        setCurrentUser={setCurrentUser}
      />
    );
  }
  return <LoadingScreen />;
};

export default Candidates;
