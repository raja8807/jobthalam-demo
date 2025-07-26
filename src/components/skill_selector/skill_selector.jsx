import React, { useEffect, useState } from "react";
import styles from "./skill_selector.module.scss";
import CustomInput from "../ui/cuatom_input/cuatom_input";
import { XCircleFill } from "react-bootstrap-icons";
import { useFetchAllCategories } from "@/api-hooks/category/category_hooks";

const SkillSelector = ({
  max = 2,
  onChanage = () => {},
  initialSkills = [],
  disabled,
}) => {
  const { data: categories = [], isLoading: categoriesIsLoading } =
    useFetchAllCategories();

  const [selectedSkills, setSelectedSkills] = useState(initialSkills);
  const [showOptions, setShowOptions] = useState(false);
  const [queryvalue, setQueryValue] = useState("");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.className !== "skill" && e.target.id !== "skill_input") {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onChanage(selectedSkills);
  }, [selectedSkills]);

  return (
    <div className={styles.SkillSelector}>
      <div className={styles.bubbles}>
        <div>
          {selectedSkills.map((skill) => {
            return (
              <div className={styles.bubble} key={`bubble_${skill.id}`}>
                {skill.name} &nbsp;
                {!disabled && (
                  <XCircleFill
                    onClick={() => {
                      setSelectedSkills((prev) => {
                        return prev.filter((s) => s.id !== skill.id);
                      });
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <small>
          {selectedSkills.length} / {max}
        </small>
      </div>
      {!disabled && (
        <div className={styles.text}>
          <CustomInput
            placeHolder="Skill"
            id="skill_input"
            onFocus={() => {
              setShowOptions(true);
            }}
            //   onBlur={() => {
            //     setShowOptions(false);
            //   }}
            value={queryvalue}
            onChange={(e, v) => {
              setQueryValue(v);
            }}
            disabled={selectedSkills.length === max}
          />
        </div>
      )}
      {!disabled && showOptions && selectedSkills.length < max && (
        <div className={styles.options}>
          {categories.map((cat) => {
            return (
              <div key={cat.id} className={styles.category}>
                <h4>{cat.name}</h4>
                {cat.skills
                  .filter((s) => {
                    if (selectedSkills.some((ss) => ss.id === s.id)) {
                      return false;
                    }

                    return s.name
                      .toLowerCase()
                      .includes(queryvalue.toLowerCase());
                  })
                  .map((sk) => (
                    <p
                      key={sk.id}
                      className={"skill"}
                      onClick={() => {
                        setQueryValue("");
                        setSelectedSkills((prev) => [...prev, sk]);
                      }}
                    >
                      {sk.name}
                    </p>
                  ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SkillSelector;
