import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomModal from "@/components/ui/custom_modal/custom_modal";
import React, { useState } from "react";
import styles from "./manage_skills.module.scss";
import { Trash } from "react-bootstrap-icons";
import { useDeleteSkill } from "@/hooks/skill_hooks/skill_hooks";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const ManageSillsPopup = ({ industry, setShow, setSkills }) => {
  const [prevSkills, setPrevSkills] = useState(industry?.skills || []);
  const [newSkills, setNewSkills] = useState([]);

  const { mutateAsync, isLoading } = useDeleteSkill();

  const deleteSkill = async (id) => {
    try {
      const res = await mutateAsync(id);
      if (res.status === 204) {
        setPrevSkills((prev) => prev.filter((s) => s.id !== id));
        setSkills((prev) => {
          const prevSkills = [...prev];
          const industryIdx = prev.findIndex((i) => i?.id === industry?.id);
          prevSkills[industryIdx].skills = prevSkills[
            industryIdx
          ].skills.filter((s) => s.id !== id);
          return prevSkills;
        });
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <CustomModal show={industry} setShow={setShow} title="Manage Industry">
      {isLoading && <LoadingScreen />}
      <strong>{industry?.name}</strong>
      <hr />
      <ul>
        {industry?.skills &&
          prevSkills.map((skill, sIdx) => {
            return (
              <li key={`skill_${sIdx}`}>
                <p className={styles.skill}>
                  {skill.skill} &nbsp;{" "}
                  <Trash
                    onClick={async () => {
                      await deleteSkill(skill?.id);
                    }}
                  />
                </p>
              </li>
            );
          })}
      </ul>
      <hr />
      {newSkills.map((skill, sIdx) => {
        return (
          <div key={`skill_${sIdx}`}>
            <CustomInput
              placeHolder={`Skill Name ${sIdx + 1}`}
              value={skill.skill}
              disabled
            />
          </div>
        );
      })}
      <br />
      <div className={styles.btns}>
        <CustomButton
          variant={3}
          onClick={() => {
            setNewSkills((prev) => [
              {
                skill: "",
                industry: industry?.industry,
                isIndustry: false,
              },
              ...prev,
            ]);
          }}
        >
          Add New Skill
        </CustomButton>

        <CustomButton>Save Industry</CustomButton>
      </div>
    </CustomModal>
  );
};

export default ManageSillsPopup;
