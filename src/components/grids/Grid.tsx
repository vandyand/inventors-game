import React from "react";
import { flatten, range } from "lodash";
import Polygon from "./Polygon";

type input = {
  onChange: (newSelectedCells: Array<number>) => void;
  value: Array<number>;
};

type Props = {
  input: input;
  gridSize?: Array<number>;
  type?: "squares" | "triangles" | "hexagons";
  rotation?: number;
  scale?: number;
  updateBoardBox?: (boardBox: Array<number>) => void;
  windowSize?: Array<number>;
};

const expand = (array1, array2) => {
  return flatten(
    array1.map((ar1Val) => array2.map((ar2Val) => [ar2Val, ar1Val]))
  );
};

export const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

const TAN_30 = Math.tan(degreesToRadians(30));
const SIN_60 = Math.sin(degreesToRadians(60));

const offsets = {
  square: [
    [0.5, 0.5],
    [0.5, -0.5],
    [-0.5, -0.5],
    [-0.5, 0.5],
  ],
  hexagon: [
    [0, TAN_30],
    [0.5, TAN_30 * 0.5],
    [0.5, -TAN_30 * 0.5],
    [0, -TAN_30],
    [-0.5, -TAN_30 * 0.5],
    [-0.5, TAN_30 * 0.5],
  ],
  triangle: [
    [0, -TAN_30],
    [0.5, TAN_30 * 0.5],
    [-0.5, TAN_30 * 0.5],
  ],
  upside_down_triangle: [
    [0, TAN_30],
    [0.5, -TAN_30 * 0.5],
    [-0.5, -TAN_30 * 0.5],
  ],
};

const Grid = ({
  input,
  gridSize = [12, 12],
  rotation = 0,
  scale = 80,
  type = "squares",
  updateBoardBox,
  windowSize = [800, 800],
}: Props) => {
  const [numCols, numRows] = gridSize;
  const selectedCells = input.value;
  const updateSelectedCells = (newSelectedCells) => {
    input.onChange(newSelectedCells);
  };

  const gridRotation = `${rotation}, ${windowSize[0] / 2}, ${windowSize[1] / 2
    }`;

  const patterns = {
    triangles: [
      {
        offsets: offsets.triangle,
        center: [0, 0],
      },
      {
        offsets: offsets.upside_down_triangle,
        center: [0.5, -TAN_30 * 0.5],
      },
    ],
    squares: [{ offsets: offsets.square, center: [0, 0] }],
    hexagons: [
      {
        offsets: offsets.hexagon,
        center: [0, 0],
      },
    ],
  };

  const triHexCenters = flatten(
    range(numRows).map((rowNum) =>
      range(numCols).map((colNum) => [
        rowNum % 2 === 0 ? colNum : colNum + 0.5,
        rowNum * SIN_60,
      ])
    )
  );

  const getPatternCenters = (type) => {
    switch (type) {
      case "squares":
        return expand(range(numRows), range(numCols));
      case "triangles":
      case "hexagons":
        return triHexCenters;
    }
  };

  const patternCenters = getPatternCenters(type);

  const handleClick = (id) => {
    toggleCell(id);
  };

  const toggleCell = (targetId) => {
    if (selectedCells.includes(targetId)) {
      updateSelectedCells(selectedCells.filter((x) => x !== targetId));
      return;
    }

    updateSelectedCells([...selectedCells, targetId]);
  };

  return (
    <svg height={`${windowSize[0]}`} width={`${windowSize[1]}`}>
      {patternCenters.map((center, ind) =>
        patterns[type].map((shape, shapeInd) => {
          const id = ind * patterns[type].length + shapeInd;
          return (
            <Polygon
              center={[
                center[0] + shape.center[0],
                center[1] + shape.center[1],
              ]}
              color={selectedCells.includes(id) ? "pink" : "white"}
              displayCellNumber={false}
              gridRotation={gridRotation}
              id={id}
              key={id}
              offsets={shape.offsets}
              onClick={handleClick}
              scale={scale}
            />
          );
        })
      )}
    </svg>
  );
};

export default Grid;
