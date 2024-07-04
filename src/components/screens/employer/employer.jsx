import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import React, { useEffect, useState } from "react";
import UpdateScreen from "./update/update";
import PortalScreen from "./portal/portal";
// import UpdateScreen from "../portal copy/update/update";

const EmployerScreen = ({ currentUser, session, setCurrentUser }) => {
  const [currentScreen, setCurrentScreen] = useState("loading");

  const updateScreen = () => {
    if (session && currentUser) {
      setCurrentScreen("portal");
    } else if (session && !currentUser) {
      setCurrentScreen("update");
    }
  };

  useEffect(() => {
    updateScreen();
  }, [currentUser, session]);

  return (
    <div>
      {currentScreen === "loading" && <LoadingScreen />}

      {currentScreen === "portal" && (
        <PortalScreen
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
      {currentScreen === "update" && (
        <UpdateScreen
          currentUser={currentUser}
          session={session}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
};

export default EmployerScreen;
