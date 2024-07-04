import MainFrame from "@/components/ui/main_frame/main_frame";
import React, { useState } from "react";
import styles from "./update.module.scss";
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomSkillSelector from "@/components/ui/select/custom_skills_selector/custom_skills_selector";
import { auth } from "@/libs/firebase/firebase";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { createUser } from "@/libs/firebase/user/user";

import { v4 as uuidv4 } from "uuid";

const UpdateForm = ({ currentUser, setCurrentUser, session }) => {
  const [values, setValues] = useState(
    currentUser
      ? { ...currentUser }
      : {
          first_name: "",
          last_name: "",
          email: "",
        }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updaterUser = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (session?.uid) {
        const id = uuidv4();
        const res = await createUser(
          {
            id,
            ...values,
            phone_number: session?.uid,
          },
          id
        );

        if (res) {
          setCurrentUser(res);
        }
      }
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await updaterUser();
      }}
    >
      <div className={styles.name}>
        <CustomInput
          placeHolder="First Name"
          type="text"
          required
          onChange={(e, value) => {
            setValues((prev) => ({ ...prev, first_name: value }));
          }}
          value={values.first_name}
        />
        <CustomInput
          placeHolder="Last Name"
          type="text"
          required
          onChange={(e, value) => {
            setValues((prev) => ({ ...prev, last_name: value }));
          }}
          value={values.last_name}
        />
      </div>
      <CustomInput
        placeHolder="Email"
        type="email"
        required
        onChange={(e, value) => {
          setValues((prev) => ({ ...prev, email: value }));
        }}
        value={values.phone_number}
      />

      <CustomSkillSelector />

      <CustomButton
        wFull
        type="submit"
        btnText="Update"
        isLoading={isLoading}
      />
    </form>
  );
};

const UpdateScreen = ({ currentUser, session, setCurrentUser }) => {
  return (
    <div className={styles.UpdateScreen}>
      <CustomContainer>
        <div className={styles.LoginScreen}>
          <div className={styles.box}>
            <h3>Update profile.</h3>

            <small className={styles.create}>
              Not now? &nbsp;
              <span
                onClick={() => {
                  auth.signOut();
                }}
              >
                Logout
              </span>
            </small>

            <UpdateForm
              session={session}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default UpdateScreen;
