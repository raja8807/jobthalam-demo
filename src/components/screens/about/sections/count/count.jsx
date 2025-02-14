import React, { useEffect, useRef, useState } from "react";
import styles from "./count.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Row } from "react-bootstrap";
import { useIntersection } from "./intercation";

const Box = ({ data }) => {
  const { title, number, id, add } = data;

  const [count, setCount] = useState(0);

  const triggerRef = useRef(null);
  const isVisible = useIntersection(triggerRef, "0px");

  function calculateX(variableValue) {
    const constantValue = 1000;
    let x = constantValue / variableValue;
    return x;
  }

  const startCounter = () => {
    let int = null;
    setTimeout(() => {
      int = setInterval(() => {
        if (count < number) {
          setCount((prev) => {
            if (prev < number) {
              if (number > 100) {
                return prev + 4;
              } else {
                return prev + 1;
              }
            } else {
              return prev;
            }
          });
        } else {
          clearInterval(int);
        }
      }, calculateX(number));
    }, 100);
  };

  useEffect(() => {
    if (isVisible) {
      startCounter(); // Trigger a function when the div is visible on view port
    }
  }, [isVisible]);

  return (
    <Col xs={12} lg={4}>
      <div
        className={styles.Box}
        id={`box_${id}`}
        ref={triggerRef}
        // data-aos="fade-left"
      >
        <div className={styles.right}>
          <h3>
            {count}
            {add}+
          </h3>
          <p>{title}</p>
        </div>
      </div>
    </Col>
  );
};

const CountSection = ({data}) => {
  // const data = [
  //   {
  //     id: "ex",
  //     title: "Jobseekers have used Jobthalam",
  //     number: 10,
  //     add: "M",
  //   },
  //   {
  //     id: "cl",
  //     title: "Current Vacancies",
  //     number: 15,
  //     add: "M",
  //   },
  //   {
  //     id: "aw",
  //     title: "States in which we are present",
  //     number: 20,
  //   },
  // ];

  return (
    <div className={styles.CustomersSection}>
      <CustomContainer>
        <div className={styles.wrap}>
          <Row>
            {data.map((d) => {
              return <Box key={d.title} data={d} />;
            })}
          </Row>
        </div>
      </CustomContainer>
    </div>
  );
};

export default CountSection;
