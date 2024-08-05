import React, { useEffect, useState } from "react";
import styles from "./custom_skills_selector.module.scss";
import CustomInput from "../../cuatom_input/cuatom_input";
import { XCircleFill } from "react-bootstrap-icons";
import ControlLabel from "../../contol_label/control_label";

const Bubble = ({ name, index, setBubbles }) => {
  return (
    <div className={styles.bubble}>
      {name}
      <XCircleFill
        onClick={() => {
          setBubbles((prev) =>
            prev.filter((_, i) => {
              return i !== index;
            })
          );
        }}
      />
    </div>
  );
};

const CustomSkillSelector = ({
  onSelect,
  initialSkills = [],
  max = 5,
  skills = [],
}) => {
  const SKILL_CATEGORIES = skills;

  const [showList, setShowList] = useState(false);
  const [query, setQuery] = useState("");

  const [bubbles, setBubbles] = useState(initialSkills);

  useEffect(() => {
    onSelect(bubbles);
  }, [bubbles]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.className !== "cat") {
        if (e.target.id !== "inp") {
          setShowList(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (bubbles.length === max) {
      setShowList(false);
    }
  }, [bubbles]);

  return (
    <div className={styles.CustomMultiSelect}>
      {bubbles.length === max && <ControlLabel label="Skills" />}
      <div className={styles.bubbles}>
        {bubbles.map((bubble, idx) => {
          return (
            <Bubble
              key={`b_${idx}`}
              name={bubble}
              index={idx}
              setBubbles={setBubbles}
            />
          );
        })}
        <small>{bubbles.length}/max</small>
      </div>
      {bubbles.length < max && (
        <CustomInput
          placeHolder="Skills"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onFocus={() => {
            setShowList(true);
          }}
          id="inp"
          // disabled={}
        />
      )}

      {showList && (
        <div className={styles.list} id="cat_list">
          {SKILL_CATEGORIES.filter((scc) => {
            if (query) {
              return scc.skills.some((sk) => {
                return sk
                  .toLocaleLowerCase()
                  .includes(query.toLocaleLowerCase());
              });
            } else {
              return true;
            }
          }).map((sc) => {
            if (!sc.skills.every((x) => bubbles.includes(x))) {
              return (
                <div key={sc.id}>
                  <h3>{sc.name}</h3>
                  {sc.skills
                    .filter((sks) => {
                      return sks.toLowerCase().includes(query.toLowerCase());
                    })
                    .map((s, i) => {
                      if (!bubbles.includes(s)) {
                        return (
                          <p
                            key={`skill_${sc.id}_${i}`}
                            onClick={() => {
                              setBubbles((prev) => [...prev, s]);
                            }}
                            className="cat"
                          >
                            {s}
                          </p>
                        );
                      }
                    })}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSkillSelector;
