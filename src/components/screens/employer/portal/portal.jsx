import CustomContainer from "@/components/ui/custom_container/custom_container";
import Tabs from "@/components/ui/tabs/tabs";
import React, { useEffect, useState } from "react";
import {
  Briefcase,
  PersonBadge,
  PersonCircle,
  Wallet2,
} from "react-bootstrap-icons";
import { useRouter } from "next/router";
import ManageJobs from "./tabs/manage_jobs/manage_jobs";
import { getDataByQuery } from "@/libs/firebase/firebase";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import Applications from "./tabs/applications/applications";
import PaymentsTab from "./tabs/payments/paymnets";

const PortalScreen = ({ currentUser, setCurrentUser }) => {
  const router = useRouter();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  let tabs = [
    {
      id: "2",
      title: "Manage Jobs",
      icon: <Briefcase />,
      component: (
        <ManageJobs currentUser={currentUser} setCurrentUser={setCurrentUser} />
      ),
    },
    {
      id: "1",
      title: "Applications",
      icon: <PersonBadge />,
      component: <Applications currentUser={currentUser} />,
    },

    // {
    //   id: "4",
    //   title: "Payments",
    //   icon: <Wallet2 />,
    //   component: (
    //     <PaymentsTab
    //       currentUser={currentUser}
    //       setCurrentTabIndex={setCurrentTabIndex}
    //       setCurrentUser={setCurrentUser}
    //     />
    //   ),
    // },
    {
      id: "3",
      title: "Profile",
      icon: <PersonCircle />,
    },
  ];

  const currentTab = tabs[currentTabIndex];

  // useEffect(() => {
  //   if (tabIndex == 2) {
  //     setCurrentTabIndex(tabIndex);
  //   }
  // }, [tabIndex]);

  return (
    <div>
      <CustomContainer>
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          onTabChange={(tab, i) => {
            setCurrentTabIndex(i);
            router.push(
              {
                pathname: "/employer",
                query: { t: `${i}` },
              },
              undefined,
              { shallow: true }
            );
          }}
        />
        {currentTab?.component}
      </CustomContainer>
    </div>
  );
};

export default PortalScreen;
