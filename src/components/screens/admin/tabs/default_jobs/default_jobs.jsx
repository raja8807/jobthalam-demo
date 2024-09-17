import React, { useEffect, useState } from "react";
import MainFrame from "@/components/ui/main_frame/main_frame";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import ManageSkills from "./manage_skills/manage_skills";

const DefaultJobs = ({ allEmployerJobs, adminJobs, skills, setSkills ,setAllAdminJobs}) => {
  const SKILL_CATEGORIES = skills || [];

  const isLoading = false;

  return (
    <MainFrame>
      {isLoading && <LoadingScreen />}

      <ManageSkills
        SkillCategories={SKILL_CATEGORIES}
        setSkills={setSkills}
        adminJobs={adminJobs}
        allEmployerJobs={allEmployerJobs}
        setAllAdminJobs={setAllAdminJobs}
      />
    </MainFrame>
  );
};

export default DefaultJobs;
