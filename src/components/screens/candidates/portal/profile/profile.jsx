import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import MainFrame from "@/components/ui/main_frame/main_frame";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";
import React, { useState } from "react";
import styles from "./profile.module.scss";
import CustomSkillSelector from "@/components/ui/select/custom_skills_selector/custom_skills_selector";
// import { useUpdateCandidate } from "@/hooks/candidate_hooks/candidate_hooks";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import SkillSelector from "@/components/skill_selector/skill_selector";
import { EDUCATIONS, EXPERIENCES, LOCATIONS } from "@/constants/job";
import Link from "next/link";
import { FilePdf, FiletypePdf, Trash, X } from "react-bootstrap-icons";
import ConfirmPopup from "@/components/ui/popups/confirm_popup/confirm_popup";
import {
  useDeletedResume,
  useUpdateCandidate,
  useUploadResume,
} from "@/api_hooks/candidate_hooks/candidate.hooks";
import { useRouter } from "next/router";

const ProfileTab = ({ currentUser, setCurrentUser }) => {
  const [values, setValues] = useState({ ...currentUser });
  const { mutateAsync, isPending: updateIsLoading } = useUpdateCandidate();

  const [showConfirmDeleteResume, setShowConfirmDeleteResume] = useState(false);

  const [resumeFile, setResumeFile] = useState(null);
  const { mutateAsync: uploadResumeAsync, isPending: uploadIsLoading } =
    useUploadResume();

  const { mutateAsync: deleteResumeAsync, isPending: deleteIsLoading } =
    useDeletedResume();

  const updateProfile = async (data) => {
    try {
      await mutateAsync(data);
      router.reload();
    } catch (error) {
      console.log("error", error);
    }
  };

  const updloadResume = async () => {
    const resume_url = await uploadResumeAsync({
      resume: resumeFile,
      uid: values.phone_number,
    });

    await updateProfile({ ...values, resume_url });
  };

  const deleteResume = async () => {
    await deleteResumeAsync(values.phone_number);
    await updateProfile({ ...values, resume_url: "" });
  };

  const router = useRouter();

  const isLoading = updateIsLoading || deleteIsLoading || uploadIsLoading;

  return (
    <MainFrame head="Profile">
      <ConfirmPopup
        show={showConfirmDeleteResume}
        setShow={setShowConfirmDeleteResume}
        onConfirm={deleteResume}
      />
      {isLoading && <LoadingScreen />}
      <div className={styles.ProfileTab}>
        <form
          onSubmit={async (e) => {
            e?.preventDefault?.();
            await updateProfile(values);
          }}
        >
          <div>
            <CustomInput
              value={values?.first_name}
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, first_name: v }));
              }}
              label={"First Name"}
            />
            <CustomInput
              value={values?.last_name}
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, last_name: v }));
              }}
              label={"Last Name"}
            />
          </div>
          <div>
            <CustomInput
              value={values?.dob}
              type="date"
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, dob: v }));
              }}
              label={"Date of Birth"}
            />
            <CustomSelect
              options={EXPERIENCES}
              value={values.experience}
              onChange={(e, value) => {
                setValues((prev) => ({ ...prev, experience: value }));
              }}
              placeholder="Select Experience"
              required
              label={"Experience"}
            />
          </div>

          <div>
            <CustomSelect
              options={EDUCATIONS}
              value={values.education}
              onChange={(e, value) => {
                setValues((prev) => ({ ...prev, education: value }));
              }}
              placeholder="Select Education"
              required
              label={"Education"}
            />

            <CustomSelect
              options={LOCATIONS}
              value={values.education}
              onChange={(e, value) => {
                setValues((prev) => ({ ...prev, education: value }));
              }}
              placeholder="Select Location"
              required
              label={"Location"}
            />
          </div>
          <div>
            <CustomInput
              value={values.phone_number}
              disabled
              label={"Phone Number"}
            />
            <CustomInput
              value={values.whatsapp_number}
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, whatsapp_number: v }));
              }}
              label={"Whatsapp Number"}
            />
          </div>
          <div>
            <CustomInput
              value={values.email}
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, email: v }));
              }}
              label={"Email"}
            />

            <div className={styles.skills}>
              <br />
              <SkillSelector initialSkills={currentUser.skills} disabled />
            </div>
          </div>

          <div className={styles.resumes}>
            {values.resume_url ? (
              <div>
                <div className={styles.resume}>
                  <Link
                    href={values.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiletypePdf />
                    Resume.pdf
                  </Link>
                  <Trash
                    onClick={() => {
                      setShowConfirmDeleteResume(true);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div>
                {resumeFile ? (
                  <div className={styles.preview}>
                    <div className={styles.resume}>
                      <div>
                        <FiletypePdf />
                        &nbsp; Resume.pdf
                      </div>
                    </div>
                    <CustomButton
                      disabled={!resumeFile}
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        await updloadResume();
                      }}
                    >
                      Upload
                    </CustomButton>
                  </div>
                ) : (
                  <CustomInput
                    type="File"
                    label={"Upload Resume"}
                    accept="application/pdf"
                    onChange={(e) => {
                      setResumeFile(e.target.files[0]);
                    }}
                  />
                )}
              </div>
            )}
          </div>
          <br />

          <CustomButton>Update Profile</CustomButton>

          <br></br>
          <br></br>
        </form>
      </div>
    </MainFrame>
  );
};

export default ProfileTab;
