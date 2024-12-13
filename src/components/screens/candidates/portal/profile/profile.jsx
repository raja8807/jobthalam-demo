import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import MainFrame from "@/components/ui/main_frame/main_frame";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";
import React, { useState } from "react";
import styles from "./profile.module.scss";
import CustomSkillSelector from "@/components/ui/select/custom_skills_selector/custom_skills_selector";
import { useUpdateCandidate } from "@/hooks/candidate_hooks/candidate_hooks";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const ProfileTab = ({ currentUser, setCurrentUser }) => {
  const [values, setValues] = useState({ ...currentUser });

  const { mutateAsync, isLoading } = useUpdateCandidate();

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await mutateAsync(values);
      setCurrentUser(res?.data);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <MainFrame head="Profile">
      {isLoading && <LoadingScreen />}
      <div className={styles.ProfileTab}>
        <form onSubmit={updateProfile}>
          <div>
            <CustomInput
              value={values?.first_name}
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, first_name: v }));
              }}
            />
            <CustomInput
              value={values?.last_name}
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, last_name: v }));
              }}
            />
          </div>
          <div>
            <CustomInput
              value={values?.dob}
              type="date"
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, dob: v }));
              }}
            />
            <CustomSelect
              options={[0, 1, 2, 3, 4, 5, 6, 8, 9, 10]}
              value={values.experience}
              onChange={(e, value) => {
                setValues((prev) => ({ ...prev, experience: value }));
              }}
              placeholder="Select Experience"
              required
            />
          </div>

          <div>
            <CustomSelect
              options={["Bachelor", "Master"]}
              value={values.education}
              onChange={(e, value) => {
                setValues((prev) => ({ ...prev, education: value }));
              }}
              placeholder="Select Education"
              required
            />

            <CustomSkillSelector
              initialSkills={values.skills.split(",")}
              onSelect={() => {}}
              disabled
            />
          </div>
          <div>
            <CustomInput value={values.phone_number} disabled />
            <CustomInput
              value={values.whatsapp_number}
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, whatsapp_number: v }));
              }}
            />
          </div>
          <div>
            <CustomInput
              value={values.email}
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, email: v }));
              }}
            />
          </div>
          <CustomButton>Update Profile</CustomButton>
        </form>
      </div>
    </MainFrame>
  );
};

export default ProfileTab;
