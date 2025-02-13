import CustomSkillSelector from "@/components/ui/select/custom_skills_selector/custom_skills_selector";
import { useFetchAllSkills } from "@/hooks/api_hooks/skill_hooks/skill_hooks";
import React, { useEffect, useState } from "react";

const SkillSelect = ({ setSkill }) => {
  const [skills, setSkills] = useState([]);
  const { data: skillsData } = useFetchAllSkills();
  useEffect(() => {
    const industry = [];

    if (skillsData?.data) {
      skillsData?.data.forEach((skill) => {
        if (skill?.isIndustry) {
          const ind = {
            id: skill?.id,
            name: skill?.industry,
            skills: skillsData?.data?.filter(
              (s) =>
                !s?.isIndustry && s.industry === skill.industry && s.is_active
            ),
          };
          industry.push(ind);
        }
      });
    }

    setSkills(industry);
  }, [skillsData]);

  return (
    <div>
      <CustomSkillSelector
        skills={skills}
        onSelect={(skill) => {
          setSkill(skill[0]);
        }}
        max={1}
      />
    </div>
  );
};

export default SkillSelect;
