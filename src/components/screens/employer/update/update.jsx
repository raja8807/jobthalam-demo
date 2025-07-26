import React, { useState } from "react";
import styles from "./update.module.scss";
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { auth } from "@/libs/firebase/firebase";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { v4 as uuidv4 } from "uuid";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";
import { Link } from "react-bootstrap-icons";
import { useCreateEmployer } from "@/hooks/employer_hooks/employer_hooks";
import { useFetCurrentUser } from "@/api-hooks/current_user_hooks/current_user.hooks";

const UpdateForm = ({ currentUser, setCurrentUser, session }) => {
  const [values, setValues] = useState(
    currentUser
      ? { ...currentUser }
      : {
          first_name: "",
          last_name: "",
          email: "",
          company_name: "",
          company_type: "",
          website_url: "",
        }
  );

  const { mutateAsync: createUser, isLoading, error } = useCreateEmployer();

  const updaterUser = async () => {
    try {
      if (session?.uid) {
        const res = await createUser({
          ...values,
          phone_number: session?.uid,
        });

        if (res.data) {
          setCurrentUser(res.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const industryTypes = [
    "Software & IT",
    "Manufacturing & Auto Ancillary",
    "Education",
    "Food",
    "Media & Emerging technology",
    "Banking",
    "construction",
    "recruitment",
  ];

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
        placeHolder="Company Name"
        type="text"
        required
        onChange={(e, value) => {
          setValues((prev) => ({ ...prev, company_name: value }));
        }}
        value={values.company_name}
      />
      <CustomSelect
        placeholder="Industry Type"
        required
        onChange={(e, value) => {
          setValues((prev) => ({ ...prev, company_type: value }));
        }}
        value={values.company_type}
        options={industryTypes}
      />

      <CustomInput
        placeHolder="Website - Eg: https://example.com"
        // type="url"
        // required
        onChange={(e, value) => {
          setValues((prev) => ({ ...prev, website_url: value }));
        }}
        value={values.website_url}
        rightElement={<Link className={styles.link} />}
      />

      <CustomInput
        placeHolder="Email"
        type="email"
        required
        onChange={(e, value) => {
          setValues((prev) => ({ ...prev, email: value }));
        }}
        value={values.phone_number}
      />

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
