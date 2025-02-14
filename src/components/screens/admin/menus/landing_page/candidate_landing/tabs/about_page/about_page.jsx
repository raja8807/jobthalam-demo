import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomForm from "@/components/ui/custom_form/custom_form";
import CustomTextArea from "@/components/ui/custom_textarea/custom_textarea";
import React, { useState } from "react";
import styles from "./about_page.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { Image } from "react-bootstrap";
import { Plus, X, XCircleFill } from "react-bootstrap-icons";
import { addData, updateData, uploadFile } from "@/libs/firebase/firebase";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { v4 } from "uuid";

const AboutPageTab = ({ aboutData }) => {
  const [bannerData, setBannerData] = useState(aboutData.banner || {});
  const [sectionsData, setSectionsData] = useState(aboutData.sections || []);
  const [newClientImg, setNewClientImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlesSave = async () => {
    setIsLoading(true);
    try {
      const id = aboutData?.id || v4();
      const res = await addData(
        "aboutPageData",
        {
          banner: bannerData,
          sections: sectionsData,
          id,
        },
        id
      );
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleUpload = async (img, sIdx) => {
    setIsLoading(true);
    try {
      const url = await uploadFile(img, "/landing/about");
      setSectionsData((prev) => {
        const data = [...prev];
        data[sIdx].tempImg = null;
        data[sIdx].img = url;
        return data;
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleClientImageUpload = async (sIdx) => {
    setIsLoading(true);
    try {
      const url = await uploadFile(newClientImg, "/landing/about/clients");

      setSectionsData((prev) => {
        console.log("ok");
        const data = [...prev];
        data[sIdx].data = [...data[sIdx].data, url];
        return data;
      });

      
      setNewClientImg(null);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.AboutPageTab}>
      {isLoading && <LoadingScreen />}
      <div className={styles.banner}>
        <CustomForm title={"Banner"}>
          <div className={styles.head}>
            {bannerData.heading &&
              bannerData.heading.map((el, hIdx) => {
                return (
                  <div key={`h_${hIdx}`}>
                    <CustomInput
                      value={el.text}
                      id={`hi_${hIdx}`}
                      label={el.tag}
                      onChange={(e, v) => {
                        setBannerData((bd) => {
                          const data = { ...bd };
                          data.heading = data.heading.map((h, i) => ({
                            ...h,
                            text: i === hIdx ? v : h.text,
                          }));

                          return data;
                        });
                      }}
                    />
                  </div>
                );
              })}
            {/* <CustomButton
              onClick={() => {
                setBannerData((bd) => {
                  const x = { ...bd };
                  x.heading.push({
                    tag: "text",
                    text: "",
                  });
                  return x;
                });
              }}
            >
              Add Text
            </CustomButton>
            <CustomButton
              onClick={() => {
                setBannerData((bd) => {
                  const x = { ...bd };
                  x.heading.push({
                    tag: "highlight",
                    text: "",
                  });
                  return x;
                });
              }}
            >
              Add Highlight
            </CustomButton> */}
          </div>
          <CustomTextArea value={bannerData.text} label="Banner Text" />
        </CustomForm>
      </div>
      <br />
      <div className={styles.sections}>
        <CustomForm title={"Sections"}>
          {sectionsData.map((sd, sIdx) => {
            if (sd.type === "row") {
              return (
                <div key={`s_${sIdx}`} className={styles.row}>
                  <CustomInput value={sd.head} label="Heading" />
                  <CustomTextArea value={sd.caption} label="Caption" />
                  <CustomTextArea value={sd.text} label="Text" />
                  {sd.img ? (
                    <div className={styles.img_prev}>
                      <Image src={sd.img} width={200} />
                      <XCircleFill
                        className={styles.x}
                        onClick={() => {
                          setSectionsData((prev) => {
                            const data = [...prev];
                            data[sIdx].img = null;
                            return data;
                          });
                        }}
                      />
                    </div>
                  ) : (
                    <div className={styles.upload}>
                      <CustomInput
                        type="file"
                        onChange={(e) => {
                          setSectionsData((prev) => {
                            const data = [...prev];
                            data[sIdx].tempImg = e.target.files[0];

                            return data;
                          });
                        }}
                      />
                      {sd.tempImg && (
                        <div className={styles.img_prev}>
                          <Image
                            src={URL.createObjectURL(sd.tempImg)}
                            width={200}
                          />
                          <XCircleFill
                            className={styles.x}
                            onClick={() => {
                              setSectionsData((prev) => {
                                const data = [...prev];
                                data[sIdx].tempImg = null;
                                return data;
                              });
                            }}
                          />
                          <br />
                          <br />
                          <CustomButton
                            onClick={async () => {
                              handleUpload(sd.tempImg, sIdx);
                            }}
                          >
                            Upload
                          </CustomButton>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            if (sd.type == "clients") {
              return (
                <div key={`s_${sIdx}`}>
                  <div className={styles.clients}>
                    <br />
                    {sd?.data &&
                      sd?.data.map((src, imgIdx) => {
                        return (
                          <div key={`img_idx_${imgIdx}`} className={styles.img}>
                            <Image src={src} width={100} />
                            <XCircleFill
                              className={styles.x}
                              onClick={() => {
                                setSectionsData((prev) => {
                                  const data = [...prev];
                                  data[sIdx].data = data[sIdx].data.filter(
                                    (u, i) => u !== src
                                  );
                                  return data;
                                });
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                  <br />
                  <CustomInput
                    type="file"
                    onChange={(e) => {
                      setNewClientImg(e.target.files[0]);
                    }}
                  />
                  {newClientImg && (
                    <div>
                      <Image
                        src={URL.createObjectURL(newClientImg)}
                        width={100}
                      />
                      <CustomButton
                        onClick={async () => {
                          await handleClientImageUpload(sIdx);
                        }}
                      >
                        Upload
                      </CustomButton>
                    </div>
                  )}
                </div>
              );
            }
            if (sd.type == "count") {
              return (
                <div key={`s_${sIdx}`} className={styles.counts}>
                  <br />
                  {sd.data.map((cd, cIdx) => {
                    return (
                      <div key={`c_${cIdx}`} className={styles.count}>
                        <CustomInput
                          type="number"
                          value={cd.number}
                          onChange={(e) => {
                            setSectionsData((prev) => {
                              const data = [...prev];
                              data[sIdx].data[cIdx].number = e.target.value;
                              return data;
                            });
                          }}
                        />
                        <CustomInput
                          value={cd.add}
                          onChange={(e) => {
                            setSectionsData((prev) => {
                              const data = [...prev];
                              data[sIdx].data[cIdx].add = e.target.value;
                              return data;
                            });
                          }}
                        />

                        <CustomInput
                          value={cd.title}
                          onChange={(e) => {
                            setSectionsData((prev) => {
                              const data = [...prev];
                              data[sIdx].data[cIdx].title = e.target.value;
                              return data;
                            });
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
          <br />
          <CustomButton onClick={handlesSave}>Save</CustomButton>
        </CustomForm>
      </div>
    </div>
  );
};

export default AboutPageTab;
