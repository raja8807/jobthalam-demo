import CustomContainer from "@/components/ui/custom_container/custom_container";
import Tabs from "@/components/ui/tabs/tabs";
import React, { useEffect, useState } from "react";
import { Briefcase, ClipboardCheck, PlusLg } from "react-bootstrap-icons";
import JobRequests from "./tabs/joo_requests/joo_requests";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import ManageJobs from "./tabs/create_job/manage_jobs";
import { useFetchAllRequests } from "@/hooks/request_hooks/request_hooks";
import { useFetchAllJobs } from "@/hooks/job_hooks/job_hooks";
import { useFetchAllAdminJobs } from "@/hooks/admin_job_hooks/admin_job_hooks";
import DefaultJobs from "./tabs/default_jobs/default_jobs";
import { useFetchSkills } from "@/hooks/skill_hooks/skill_hooks";

const AdminScreen = ({ session }) => {
  const [allJobs, setAllJobs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [allAdminJobs, setAllAdminJobs] = useState([]);
  const [skills, setSkills] = useState([]);

  // console.log();

  const { mutateAsync: fetchAllRequests, isLoading: requestIsLoading } =
    useFetchAllRequests();

  const { mutateAsync: fetchAllJobsAsync, isLoading: allJobsIsLoading } =
    useFetchAllJobs();

  const { mutateAsync: fetchSkills, isLoading: skillsIsLoading } =
    useFetchSkills();

  const {
    mutateAsync: fetchAllAdminJobsAsync,
    isLoading: allAdminJobsIsLoading,
  } = useFetchAllAdminJobs();

  const isLoading =
    requestIsLoading ||
    allJobsIsLoading ||
    allAdminJobsIsLoading ||
    skillsIsLoading;

  const fetchAllJobs = async () => {
    try {
      const res = await fetchAllRequests();
      const jobs = await fetchAllJobsAsync();
      const adminJobs = await fetchAllAdminJobsAsync();
      const skillsData = await fetchSkills();
      setRequests(res.data || []);
      setAllJobs(jobs?.data || []);
      setAllAdminJobs(adminJobs?.data || []);

      const industry = [];

      if (skillsData?.data) {
        skillsData?.data.forEach((skill) => {
          if (skill?.isIndustry) {
            const ind = {
              id: skill?.id,
              name: skill?.industry,
              skills: skillsData?.data?.filter(
                (s) => !s?.isIndustry && s.industry === skill.industry
              ),
            };
            industry.push(ind);
          }
        });
      }

      // console.log(industry);

      setSkills(industry || []);
    } catch (err) {
      console.log("job request error", err);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const tabs = [
    {
      id: "reqs",
      title: "Job Requests",
      icon: <ClipboardCheck />,
      component: (
        <JobRequests
          allJobs={allJobs}
          setAllJobs={setAllJobs}
          requests={requests}
          allAdminJobs={allAdminJobs}
        />
      ),
    },
    {
      id: "nrw",
      title: "Admin Jobs",
      icon: <Briefcase />,
      component: (
        <ManageJobs
          allJobs={allAdminJobs}
          setAllJobs={setAllAdminJobs}
          skills={skills}
        />
      ),
    },
    {
      id: "amega",
      title: "Default Jobs",
      icon: <PlusLg />,
      component: (
        <DefaultJobs
          allEmployerJobs={allJobs}
          adminJobs={allAdminJobs}
          skills={skills}
          setSkills={setSkills}
          setAllAdminJobs={setAllAdminJobs}
        />
      ),
    },
  ];

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const currentTab = tabs[currentTabIndex];

  return (
    <CustomContainer>
      {isLoading && <LoadingScreen />}
      <Tabs
        tabs={tabs}
        currentTab={currentTab}
        onTabChange={(tab, index) => {
          setCurrentTabIndex(index);
        }}
      />
      {currentTab?.component}
    </CustomContainer>
  );
};

export default AdminScreen;
