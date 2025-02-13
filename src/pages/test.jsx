import React, { useMemo, useRef, useState } from "react";
import styles from "./test.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";

const TestPage = () => {
  const maze = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "A", " ", " ", "#", " ", " ", " ", "#", " ", " ", " ", " ", " ", "#"],
    ["#", "#", "#", " ", "#", " ", "#", " ", "#", " ", "#", "#", "#", " ", "#"],
    ["#", " ", " ", " ", " ", " ", "#", " ", " ", " ", "#", " ", "#", " ", "#"],
    ["#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#", " ", "#"],
    ["#", " ", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " ", "#"],
    ["#", " ", "#", " ", "#", "#", " ", "#", "#", "#", "#", "#", "#", " ", "#"],
    ["#", " ", "#", " ", "#", " ", " ", " ", "#", " ", " ", "#", "#", " ", "#"],
    ["#", " ", "#", " ", "#", " ", "#", " ", "#", " ", "#", "#", "#", " ", "#"],
    ["#", " ", " ", " ", "#", " ", "#", " ", "#", " ", "#", "#", "#", " ", "#"],
    ["#", "#", "#", "#", "#", " ", "#", " ", " ", " ", "#", "#", "#", " ", "#"],
    ["#", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#", "#", "#", " ", "#"],
    [" ", " ", "#", "#", "#", "#", "#", " ", "#", " ", "#", "#", "#", " ", "#"],
    ["#", " ", " ", " ", " ", " ", " ", " ", "#", " ", " ", "B", "#", "#", "#"],
    ["#", "#", " ", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#", "#"],
    ["#", "#", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#"],
  ];

  let colIndexOfB;
  const rowIndexOfB = maze.findIndex((r) => {
    colIndexOfB = r.findIndex((c) => c === "B");
    return r.includes("B");
  });

  const IndexOfB = [rowIndexOfB, colIndexOfB];

  const getNearest = (actions = []) => {
    const len = actions.length;
    for (let i = 0; i < len; i++) {}
    return actions;
    // return actions.reverse();
  };

  const getActions = (state) => {
    let ri = state[0];
    let ci = state[1];

    const possibleActions = [
      [ri - 1, ci], //1,
      [ri, ci + 1], //2,
      [ri + 1, ci], //3,
      [ri, ci - 1], //4,
    ];

    const actions = possibleActions.filter((pa) => {
      return (
        maze[pa?.[0]]?.[pa?.[1]] === " " || maze[pa?.[0]]?.[pa?.[1]] === "B"
      );
    });

    // return actions;
    return getNearest(actions);
  };

  const getResult = (node) => {
    return maze[node?.[0]]?.[node?.[1]] === "B";
  };

  const [explored, setExplored] = useState([]);

  const frontier = useRef([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const solveMaze = async (isBFS) => {
    let colIndexOfA;
    const rowIndexOfA = maze.findIndex((r) => {
      colIndexOfA = r.findIndex((c) => c === "A");
      return r.includes("A");
    });

    const IndexOfA = [rowIndexOfA, colIndexOfA];

    let initialState = IndexOfA;
    frontier.current = [initialState];
    const LocalExplored = [];

    while (frontier.current.length > 0) {
      let node;

      if (isBFS) {
        node = frontier.current.shift();
      } else {
        node = frontier.current.pop();
      }
      if (node) {
        LocalExplored.push(node);
        setExplored([...LocalExplored]); // Ensure reactivity

        const actions = getActions(node);

        for (const action of actions) {
          if (getResult(action)) {
            frontier.current = [];
            alert(LocalExplored.length);
            return;
          }

          const isExplored = LocalExplored.some(
            (ex) => ex[0] === action[0] && ex[1] === action[1]
          );

          if (!isExplored) {
            frontier.current.push(action);
          }
        }

        await delay(50);
      }
    }
  };

  return (
    <>
      <div className={styles.maze}>
        {maze.map((row, ri) => {
          return (
            <div key={`r_${ri}`} className={styles.row}>
              {row.map((col, ci) => {
                return (
                  <div
                    key={`c_${ci}`}
                    className={`${styles.cell} ${col === "#" ? styles.wall : ""}
                  
                  ${col === "A" ? styles.start : ""}
                  ${col === "B" ? styles.end : ""}
                ${
                  explored.some((e) => {
                    return e[0] === ri && e[1] === ci;
                  })
                    ? styles.selected
                    : ""
                }
                  `}
                    onClick={() => {
                      // alert(IndexOfB);
                      getNearest([
                        [2, 3],
                        [3, 3],
                        [3, 4],
                      ]);
                      // alert(getActions([ri, ci]).join(" | "));
                    }}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
      <br />
      <CustomButton
        onClick={() => {
          solveMaze();
        }}
      >
        Solve with DFS
      </CustomButton>
      &nbsp; &nbsp;
      <CustomButton
        onClick={() => {
          solveMaze(true);
        }}
      >
        Solve with BFS
      </CustomButton>
    </>
  );
};

export default TestPage;

// setOutput([]);
// maze.forEach((row, ri) => {
//   row.forEach((cell, ci) => {
//     if (cell === " ") {
//       setOutput((prev) => [...prev, `${ri}${ci}`]);
//     }
//   });
// });
