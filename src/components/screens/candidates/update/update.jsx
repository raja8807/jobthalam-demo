import MainFrame from "@/components/ui/main_frame/main_frame";
import React, { useState } from "react";
import styles from "./update.module.scss";
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomSkillSelector from "@/components/ui/select/custom_skills_selector/custom_skills_selector";
import { auth, uploadFile } from "@/libs/firebase/firebase";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { createUser } from "@/libs/firebase/user/user";

import { v4 as uuidv4 } from "uuid";
import { Form } from "react-bootstrap";
import { Whatsapp, X } from "react-bootstrap-icons";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";
import ControlLabel from "@/components/ui/contol_label/control_label";

const Form1 = ({ setValues, values, session, setCurrentFormIndex }) => {
  const [isMobile, setIsMobile] = useState(true);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setCurrentFormIndex(1);
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

      <div className={styles.name}>
        <CustomSelect
          options={["Male", "Female"]}
          value={values.gender}
          onChange={(e, value) => {
            setValues((prev) => ({ ...prev, gender: value }));
          }}
          required
          placeholder="Select Gender"
        />
        <CustomInput
          placeHolder="DOB"
          type="date"
          required
          onChange={(e, value) => {
            setValues((prev) => ({ ...prev, dob: value }));
          }}
          value={values.dob}
        />
      </div>

      <CustomInput
        placeHolder="Email"
        type="email"
        required
        onChange={(e, value) => {
          setValues((prev) => ({ ...prev, email: value }));
        }}
        value={values.email}
      />

      <CustomInput
        placeHolder="Whatsapp Number"
        type="tel"
        required
        onChange={(e, value) => {
          setValues((prev) => ({ ...prev, whatsapp_number: value }));
        }}
        value={values.whatsapp_number}
        disabled={isMobile}
      />
      <div className={styles.check}>
        <Form.Check
          onChange={(e) => {
            setIsMobile(e.target.checked);
            setValues((prev) => ({
              ...prev,
              whatsapp_number: e.target.checked ? session.uid : "",
            }));
          }}
          checked={isMobile}
        />
        <small>
          Use mobile number for Whatsapp <Whatsapp />
        </small>
      </div>

      {/* <CustomSkillSelector /> */}

      <CustomButton wFull type="submit" btnText="Next" />
    </form>
  );
};

const Form2 = ({ setValues, values, session, setCurrentFormIndex ,setCurrentUser}) => {
  const [isMobile, setIsMobile] = useState(true)

  const [resumeFile, setResumeFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updaterUser = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (session?.uid) {
        const id = uuidv4();
        const resume_url = await uploadFile(
          resumeFile,
          `resumes/${id}/resume`
        );
       
        const res = await createUser(
          {
            id,
            ...values,
            phone_number: session?.uid,
            resume_url
          },
          id,
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
        // console.log(values);
      }}
    >
      <div className={styles.name}>
        <CustomSelect
          options={["Bachelor", "Master"]}
          value={values.education}
          onChange={(e, value) => {
            setValues((prev) => ({ ...prev, education: value }));
          }}
          placeholder="Select Education"
          required
        />

        <CustomSelect
          options={[1, 2, 3, 4, 5, 6, 8, 9, 10]}
          value={values.experience}
          onChange={(e, value) => {
            setValues((prev) => ({ ...prev, experience: value }));
          }}
          placeholder="Select Experience"
          required
        />
      </div>

      <CustomSkillSelector
        onSelect={(a) => {
          setValues((prev) => ({ ...prev, skills: a.join() }));
        }}
        initialSkills={values.skills ? values.skills.split(",") : []}
      />

      <ControlLabel label="Select Resume (2 MB)" />
      {resumeFile ? (
        <div className={styles.resumePreview}>
          <p>{resumeFile.name}</p>
          <X
            onClick={() => {
              setResumeFile(null);
            }}
          />
        </div>
      ) : (
        <CustomInput
          placeHolder="DOB"
          type="file"
          required
          accept="application/pdf"
          onChange={(e) => {
            setResumeFile(e.target.files[0]);
          }}
        />
      )}

      <div className={styles.check}>
        <Form.Check
          onChange={(e) => {
            setIsMobile(e.target.checked);
            setValues((prev) => ({
              ...prev,
              whatsapp_number: e.target.checked ? session.uid : "",
            }));
          }}
          checked={isMobile}
          required
        />
        <small>Agree to terms and conditions.</small>
      </div>

      {/* <CustomSkillSelector /> */}

      <div className={styles.name}>
        <CustomButton
          wFull
          type="button"
          // btnText="Back"
          variant={2}
          onClick={(e) => {
            e.preventDefault();
            setCurrentFormIndex(0);
          }}
          role="button"
          disabled={isLoading}
        >
          Back
        </CustomButton>
        <CustomButton
          wFull
          type="submit"
          btnText="Update"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

const UpdateForm = ({ currentUser, setCurrentUser, session }) => {
  const [values, setValues] = useState(
    currentUser
      ? { ...currentUser }
      : {
          first_name: "",
          last_name: "",
          gender: "",
          dob: "",
          email: "",
          whatsapp_number: session.uid,
          phone_number: session.uid,
          skills: "",
        }
  );

  const [currentFormIndex, setCurrentFormIndex] = useState(1);

  const forms = [
    {
      id: "form1",
      form: (
        <Form1
          setValues={setValues}
          values={values}
          session={session}
          setCurrentFormIndex={setCurrentFormIndex}
        />
      ),
    },
    {
      id: "form1",
      form: (
        <Form2
          setValues={setValues}
          values={values}
          session={session}
          setCurrentFormIndex={setCurrentFormIndex}
          setCurrentUser={setCurrentUser}
        />
      ),
    },
  ];

  const currentForm = forms[currentFormIndex];

  return <>{currentForm.form}</>;
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
