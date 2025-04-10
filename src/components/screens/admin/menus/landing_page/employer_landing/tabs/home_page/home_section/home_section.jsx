import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomForm from "@/components/ui/custom_form/custom_form";
import React, { useState } from "react";
import styles from "./home_section.module.scss";
import { Col, Image, Row } from "react-bootstrap";
import CustomTextArea from "@/components/ui/custom_textarea/custom_textarea";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { X, XCircle, XCircleFill } from "react-bootstrap-icons";
import { addData, updateData, uploadFile } from "@/libs/firebase/firebase";
import { v4 } from "uuid";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const HomeSection = ({ homePageData }) => {
  const [values, setValues] = useState({
    ...homePageData,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await updateData(
        "employerHomePageData",
        { ...values },
        homePageData.id
      );
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const [tempImage, setTempImage] = useState(null);

  const uploadImage = async () => {
    setIsLoading(true);
    try {
      const url = await uploadFile(tempImage, "homepage/banner/employer");

      setValues((prev) => {
        const data = { ...prev };
        data.bannerData.image = url;
        return data;
      });

      setTimeout(async () => {
        await handleSave();
      }, 1000);

      setTempImage(null);
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
          <Col xs={12} md={6}>
            <div>
              {values?.bannerData?.image ? (
                <div>
                  <Image src={values?.bannerData?.image} fluid />
                  <CustomButton
                    onClick={() => {
                      setValues((prev) => {
                        const x = { ...prev };
                        x.bannerData.image = null;
                        return x;
                      });
                    }}
                  >
                    Delete
                  </CustomButton>
                </div>
              ) : (
                <div>
                  <CustomInput
                    type="file"
                    label="Image"
                    onChange={(e, v) => {
                      setTempImage(e.target.files[0]);
                    }}
                  />
                  <br />
                  {tempImage && (
                    <div>
                      <Image src={URL.createObjectURL(tempImage)} width={200} />
                      <div>
                        <CustomButton onClick={uploadImage}>
                          Upload
                        </CustomButton>
                        <CustomButton
                          onClick={() => {
                            setTempImage(null);
                          }}
                        >
                          Delete
                        </CustomButton>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
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
      <hr />
      <div className={styles.box}>
        <Row>
          {values.cards.map((card, cIdx) => {
            return (
              <Col xs={12} md={6} key={`card_${cIdx}`}>
                <div>
                  <CustomInput
                    value={card.head}
                    onChange={(e, v) => {
                      setValues((prev) => {
                        const pd = { ...prev };
                        pd.cards[cIdx].head = v;
                        return pd;
                      });
                    }}
                  />
                  <CustomTextArea
                    value={card.text}
                    onChange={(e, v) => {
                      setValues((prev) => {
                        const pd = { ...prev };
                        pd.cards[cIdx].text = v;
                        return pd;
                      });
                    }}
                  />
                  <CustomInput
                    value={card.btnTxt}
                    onChange={(e, v) => {
                      setValues((prev) => {
                        const pd = { ...prev };
                        pd.cards[cIdx].btnTxt = v;
                        return pd;
                      });
                    }}
                  />
                  <CustomInput
                    value={card.link}
                    onChange={(e, v) => {
                      setValues((prev) => {
                        const pd = { ...prev };
                        pd.cards[cIdx].link = v;
                        return pd;
                      });
                    }}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
      <br />
      <CustomButton onClick={handleSave}>Save</CustomButton>
    </CustomForm>
  );
};

export default HomeSection;
