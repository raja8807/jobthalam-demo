import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomForm from "@/components/ui/custom_form/custom_form";
import React, { useState } from "react";
import styles from "./home_section.module.scss";
import { Col, Row } from "react-bootstrap";
import CustomTextArea from "@/components/ui/custom_textarea/custom_textarea";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { X, XCircle, XCircleFill } from "react-bootstrap-icons";
import { addData, updateData } from "@/libs/firebase/firebase";
import { v4 } from "uuid";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const HomeSection = ({ homePageData }) => {
  const [values, setValues] = useState(homePageData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const id = v4();

      const res = await updateData(
        "candidateHomePageData",
        { ...values },
        homePageData.id
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <CustomForm title="Home Page Data">
      {isLoading && <LoadingScreen />}
      <div className={styles.box}>
        <Row>
          {values.bannerData.title.map((e, idx) => {
            if (e.tag === "highlight") {
              return (
                <Col key={`col_${idx}`}>
                  <CustomInput
                    label="Highlight"
                    value={e.text}
                    onChange={(e, v) => {
                      setValues((prev) => {
                        const data = { ...prev };
                        data.bannerData.title[idx].text = v;
                        return data;
                      });
                    }}
                  />
                </Col>
              );
            }
            return (
              <Col key={`col_${idx}`}>
                <CustomInput
                  label="Text"
                  value={e.text}
                  onChange={(e, v) => {
                    setValues((prev) => {
                      const data = { ...prev };
                      data.bannerData.title[idx].text = v;
                      return data;
                    });
                  }}
                />
              </Col>
            );
          })}
          <Col xs={12}>
            <CustomTextArea
              value={values.bannerData.caption}
              onChange={(e, v) => {
                setValues((prev) => {
                  const data = { ...prev };
                  data.bannerData.caption = v;
                  return data;
                });
              }}
            />
          </Col>
        </Row>
      </div>

      <div className={styles.box}>
        <p>Vacancies</p>

        <div className={styles.wrap}>
          {values.vacanciesData.map((vac, vIdx) => {
            return (
              <div key={`vac_${vIdx}`} className={styles.inpBox}>
                <XCircleFill
                  className={styles.del}
                  onClick={() => {
                    setValues((prev) => {
                      const data = { ...prev };
                      data.vacanciesData = prev.vacanciesData.filter(
                        (v, i) => i !== vIdx
                      );

                      return data;
                    });
                  }}
                />
                <CustomInput
                  value={vac.title}
                  label={"Tile"}
                  onChange={(e, v) => {
                    setValues((prev) => {
                      const data = { ...prev };
                      data.vacanciesData[vIdx].title = v;
                      return data;
                    });
                  }}
                />
                <CustomInput
                  value={vac.positions}
                  label="Positions"
                  type="number"
                  onChange={(e, v) => {
                    setValues((prev) => {
                      const data = { ...prev };
                      data.vacanciesData[vIdx].positions = v;
                      return data;
                    });
                  }}
                />
              </div>
            );
          })}
          <CustomButton
            onClick={() => {
              setValues((prev) => {
                const data = { ...prev };
                data.vacanciesData = [
                  ...prev.vacanciesData,
                  {
                    title: "",
                    positions: 0,
                  },
                ];

                return data;
              });
            }}
          >
            Add +
          </CustomButton>
        </div>
      </div>

      <div className={styles.box}>
        <p>Categories</p>

        <div className={styles.wrap}>
          {values.categoryData.map((vac, cIdx) => {
            return (
              <div key={`cat_${cIdx}`} className={styles.inpBox}>
                <XCircleFill
                  className={styles.del}
                  onClick={() => {
                    setValues((prev) => {
                      const data = { ...prev };
                      data.categoryData = prev.categoryData.filter(
                        (v, i) => i !== cIdx
                      );

                      return data;
                    });
                  }}
                />
                <CustomInput
                  value={vac.title}
                  label={"Tile"}
                  onChange={(e, v) => {
                    setValues((prev) => {
                      const data = { ...prev };
                      data.categoryData[cIdx].title = v;
                      return data;
                    });
                  }}
                />
                <CustomInput
                  value={vac.availableJobs}
                  label="Positions"
                  type="number"
                  onChange={(e, v) => {
                    setValues((prev) => {
                      const data = { ...prev };
                      data.categoryData[cIdx].availableJobs = v;
                      return data;
                    });
                  }}
                />
              </div>
            );
          })}
          <CustomButton
            onClick={() => {
              setValues((prev) => {
                const data = { ...prev };
                data.categoryData = [
                  ...prev.categoryData,
                  {
                    title: "",
                    availableJobs: 0,
                  },
                ];

                return data;
              });
            }}
          >
            Add +
          </CustomButton>
        </div>
      </div>
      <br />
      <CustomButton onClick={handleSave}>Save</CustomButton>
    </CustomForm>
  );
};

export default HomeSection;
