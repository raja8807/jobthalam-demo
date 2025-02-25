import CustomButton from '@/components/ui/custom_button/custom_button';
import CustomForm from '@/components/ui/custom_form/custom_form';
import CustomTextArea from '@/components/ui/custom_textarea/custom_textarea';
import React from 'react'
import { ChevronDown, ChevronUp, PlusCircle, XCircleFill } from 'react-bootstrap-icons';

const TestimonialsSection = () => {

      const candidateTestimonialsData = [
        {
          text: "I would like to appreciate  Jobthalam team for extending the continuous cooperation and support. I am happy with the services and would like to continue with the same for fulfilling our hiring needs.",
          name: "Subramanian.K",
          title: "Deputy General Manager,(HYUNDAI) GLOVES INDIA PVT.Ltd.",
        },
        {
          text: " jobthalam.com is great help for us in finding the candidates specially in mechanical engineering. Also jobthalam & Job posting responses are fantastic. We thank you for your continuous support.",
          name: "Dr.VinothKumar K",
          title: "Sr.Manager Technology Sales,HUBERT ENVIRO CARE SYSTEMS (P) Ltd.",
        },
        {
          text: " We are happy to share that jobthalam has been a great hiring partner for us. We appreciate its good services, fast and friendly support.",
          name: "Dr.K.G.Parthiban",
          title: "Prinicipal,DHANISH AHAMED INSTITUTE OF TECHNOLOGY.",
        },
        {
          text: " I would like to thank jobthalam team for the great amount of support that they have provided. We are really happy with the services of jobthalam and very much satisfied in using it.",
          name: "Dr.R.Vijayarangan",
          title: "Advisor,Innovation&Incubation,GNANAMANI COLLEGE OF TECHNOLOGY.",
        },
        {
          text: " jobthalam is the real deal - a great partner and passionate champion of remote work! They help Sundaram Fasteners ltd connect with job seekers who are specifically looking for remote and/or flexible work.",
          name: "KALIMUTHU.K",
          title:
            "Deputy General Manager-Personal,SUNDARAM FASTENERS LIMITED Autolec Division.",
        },
        {
          text: " jobthalam system is user friendly and easy to use. Also, we have found jobthalam and their support staff to be efficient, friendly and professional. We have no hesitation in recommending jobthalam.com.",
          name: "Dr.I.Paul Theophilos Rajkumar",
          title:
            "Undustry Collaboration and Placement,PANIMALAR ENGINEERING COLLEGE.",
        },
        {
          text: " jobthalam.com has beyond doubt helped many organization grow in a big way. The database is quite good enough for us to bank on in satisfying our client's requirement. We are content with the service delivery from the support staff who are extremely hospitable…Way to go jobthalam.",
          name: "S.SenthilKumar",
          title: "Chief Executive Officer,TANSTIA-FNF SERVICE CENTRE.",
        },
        {
          text: " Just a note to express my appreciation for the outstanding service that we receive from jobthalam.com, we have had their service for about 3 years now, and have been very happy with the service offered. Jobthalam.com has helped to make our recruitment process much easier and cost effective.",
          name: "Aloha.K.Kumaran",
          title: "Chief Executive Officer,ALOHA INDIA PVT.Ltd.",
        },
      ];

    const [values, setValues] = useState(candidateFaqData);
      const [showTestimonials, setShowTestimonials] = useState(true);

  return (
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
  )
}

export default TestimonialsSection
