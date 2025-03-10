import React, { useEffect, useRef, useState } from "react";

const SandSim = () => {
  const height = 75;
  const width = 75;
  const cellSize = 7; // Updated cell size

  const gridRef = useRef(buildGrid(height, width));
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  function buildGrid(rows, cols) {
    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, columnIndex) => ({
        hasParticle: false,
        rowIndex,
        columnIndex,
      }))
    );
  }

  function getRandomBoolean() {
    return Math.random() < 0.5;
  }

  const updateGrid = () => {
    const grid = gridRef.current;
    const newGrid = grid.map(row => [...row]);
    const particles = [];

    grid.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell.hasParticle) {
          particles.push({ rIdx, cIdx });
        }
      });
    });

    particles.forEach(({ rIdx, cIdx }) => {
      const isBottom = rIdx === height - 1;

      if (!isBottom) {
        const below = grid[rIdx + 1][cIdx];
        if (!below.hasParticle) {
          newGrid[rIdx][cIdx].hasParticle = false;
          newGrid[rIdx + 1][cIdx].hasParticle = true;
        } else {
          const left = cIdx > 0 ? grid[rIdx + 1][cIdx - 1] : null;
          const right = cIdx < width - 1 ? grid[rIdx + 1][cIdx + 1] : null;
          const hasLeft = left && !left.hasParticle;
          const hasRight = right && !right.hasParticle;

          if (hasLeft && hasRight) {
            const isLeftChosen = getRandomBoolean();
            if (isLeftChosen) {
              newGrid[rIdx][cIdx].hasParticle = false;
              newGrid[rIdx + 1][cIdx - 1].hasParticle = true;
            } else {
              newGrid[rIdx][cIdx].hasParticle = false;
              newGrid[rIdx + 1][cIdx + 1].hasParticle = true;
            }
          } else if (hasLeft) {
            newGrid[rIdx][cIdx].hasParticle = false;
            newGrid[rIdx + 1][cIdx - 1].hasParticle = true;
          } else if (hasRight) {
            newGrid[rIdx][cIdx].hasParticle = false;
            newGrid[rIdx + 1][cIdx + 1].hasParticle = true;
          }
        }
      }
    });

    gridRef.current = newGrid;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateGrid();
      drawGrid();
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gridRef.current.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell.hasParticle) {
          ctx.fillStyle = `rgb(255, ${Math.floor((cIdx / width) * 255)}, 0)`;
          ctx.fillRect(cIdx * cellSize, rIdx * cellSize, cellSize, cellSize);
        }
      });
    });
  };

  const placeParticle = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);

    if (x >= 0 && x < width && y >= 0 && y < height) {
      gridRef.current[y][x].hasParticle = true;
      drawGrid();
    }
  };

  const startDrawing = (event) => {
    isDrawing.current = true;
    placeParticle(event);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  return (
    <canvas
      ref={canvasRef}
      width={width * cellSize}
      height={height * cellSize}
      style={{ border: "1px solid black" }}
      onMouseDown={startDrawing}
      onMouseMove={(e) => {
        if (isDrawing.current) placeParticle(e);
      }}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
};

export default SandSim;
