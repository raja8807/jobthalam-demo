import MainFrame from "@/components/ui/main_frame/main_frame";
import { getDataByQuery } from "@/libs/firebase/firebase";
import React, { useEffect, useState } from "react";
import AllJobRequests from "./all_requests/requests";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { useFetchRequestByUid } from "@/hooks/request_hooks/request_hooks";
import CustomButton from "@/components/ui/custom_button/custom_button";
import BuyRequests from "./buy_request/buy_request";

const JobRequests = ({ currentUser, setCurrentUser, setCurrentTabIndex }) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <>
      {showHistory ? (
        <AllJobRequests
          currentUser={currentUser}
          setShowHistory={setShowHistory}
        />
      ) : (
        <BuyRequests
          setShowHistory={setShowHistory}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setCurrentTabIndex={setCurrentTabIndex}
        />
      )}
    </>
  );
};

export default JobRequests;
