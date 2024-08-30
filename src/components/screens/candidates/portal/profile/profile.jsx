import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import MainFrame from "@/components/ui/main_frame/main_frame";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";
import React, { useState } from "react";
import styles from "./profile.module.scss";

const ProfileTab = ({ currentUser }) => {
  const [values, setValues] = useState({ ...currentUser });

  console.log(values);
  

  return (
    <MainFrame head="Profile">
      <div className={styles.ProfileTab}>
        <form>
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
            <CustomInput value={values.skills} disabled />
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
