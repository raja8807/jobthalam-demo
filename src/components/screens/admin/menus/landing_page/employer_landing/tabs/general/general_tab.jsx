import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomForm from "@/components/ui/custom_form/custom_form";
import CustomTextArea from "@/components/ui/custom_textarea/custom_textarea";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { addData, deletData, updateData } from "@/libs/firebase/firebase";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Save2Fill,
  SaveFill,
  XCircleFill,
} from "react-bootstrap-icons";
import { v4 } from "uuid";
import TestimonialsSection from "./testimonails/testimonials";

const GeneralTab = ({ employerFaqData, employerTestimonialsData }) => {
  const [values, setValues] = useState(employerFaqData);
  const [isLoading, setIsLoading] = useState(false);
  const [showFAQ, setShowFaq] = useState(false);

  const handleSaveFaq = async (faq) => {
    setIsLoading(true);
    try {
      await updateData("employerFaqData", faq, faq.id);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const deleteFaq = async (faq, fIdx) => {
    setIsLoading(true);
    console.log(fIdx, faq);

    try {
      await deletData("employerFaqData", faq.id);
      setValues((prev) => prev.filter((_, i) => i !== fIdx));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleAddFaq = async () => {
    setIsLoading(true);
    try {
      const id = v4();
      await addData(
        "employerFaqData",
        {
          question: "",
          answer: "",
          id,
        },
        id
      );
      setValues((prev) => {
        return [
          ...prev,
          {
            question: "",
            answer: "",
            id,
          },
        ];
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <CustomForm
        title="FAQs"
        additionalElement={
          <div>
            {!showFAQ ? (
              <ChevronDown
                onClick={() => {
                  setShowFaq(true);
                }}
              />
            ) : (
              <ChevronUp
                onClick={() => {
                  setShowFaq(false);
                }}
              />
            )}
          </div>
        }
      >
        {showFAQ && (
          <div>
            <div>
              {values?.[0] &&
                values.map((faq, fIdx) => {
                  return (
                    <div key={`faq_${fIdx}`}>
                      <XCircleFill
                        style={{
                          color: "red",
                        }}
                        onClick={async () => {
                          await deleteFaq(faq, fIdx);
                        }}
                      />
                      &nbsp;
                      <CustomTextArea
                        label={`Question - ${fIdx + 1}`}
                        value={faq.question}
                        onChange={(e, v) => {
                          setValues((prev) => {
                            const data = [...prev];
                            data[fIdx].question = v;
                            return data;
                          });
                        }}
                      />
                      <CustomTextArea
                        label={`Answer - ${fIdx + 1}`}
                        value={faq.answer}
                        onChange={(e, v) => {
                          setValues((prev) => {
                            const data = [...prev];
                            data[fIdx].answer = v;
                            return data;
                          });
                        }}
                      />
                      <CustomButton
                        onClick={async () => {
                          try {
                            await handleSaveFaq(faq);
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        Save
                      </CustomButton>
                      <hr />
                    </div>
                  );
                })}
            </div>
            <div>
              <CustomButton variant={2} onClick={handleAddFaq}>
                Add FAQ <PlusCircle />
              </CustomButton>
            </div>
          </div>
        )}
      </CustomForm>
      <br/>
      <TestimonialsSection
        setIsLoading={setIsLoading}
        employerTestimonialsData={employerTestimonialsData}
      />
    </>
  );
};

export default GeneralTab;
