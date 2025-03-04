import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomForm from "@/components/ui/custom_form/custom_form";
import CustomTextArea from "@/components/ui/custom_textarea/custom_textarea";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { addData, updateData } from "@/libs/firebase/firebase";
import React, { useState } from "react";
import { v4 } from "uuid";

const ContactPageTab = ({ candidateContactData }) => {
  // const candidateContactData = {
  //   head: "We Care About Customer Service",
  //   text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Corporis perferendis, voluptas quos quaerat incidunt harum?Dolor eum modi doloremque sunt minima, laudantium, numquamquidem soluta, adipisci ea eaque cupiditate nisi!",
  // };

  const [values, setValues] = useState(candidateContactData);
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await updateData(
        "candidateContactData",
        { ...values, id: candidateContactData?.id },
        candidateContactData?.id
      );
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <CustomForm>
        <CustomInput
          label="Head"
          onChange={(e, v) => {
            setValues((prev) => ({ ...prev, head: v }));
          }}
          value={values.head}
        />
        <CustomTextArea
          label="text"
          onChange={(e, v) => {
            setValues((prev) => ({ ...prev, text: v }));
          }}
          value={values.text}
        />
        <br />
        <br />
        <CustomButton onClick={handleSave}>Save</CustomButton>
      </CustomForm>
    </div>
  );
};

export default ContactPageTab;
