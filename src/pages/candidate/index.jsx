import CandidatesScreen from "@/components/screens/candidates/candidates";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { auth } from "@/libs/firebase/firebase";
// import { auth } from "firebase-admin";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Candidates = ({ currentUser, session, setCurrentUser }) => {
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
      <CandidatesScreen
        currentUser={currentUser}
        session={session}
        setCurrentUser={setCurrentUser}
      />
    );
  }
  return <LoadingScreen/>;
};

export default Candidates;
