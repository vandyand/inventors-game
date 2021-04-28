import React, { useState } from "react";
import { degreesToRadians } from "../../helpers";
import { flatten, range } from "lodash";
import Polygon from "./Polygon";

type Props = {
  numCols?: number;
  numRows?: number;
  type?: "squares" | "triangles" | "hexagons";
  rotation?: number;
  scale?: number;
  updateBoardBox?: (boardBox: Array<number>) => void;
};

const expand = (array1, array2) => {
  return flatten(
    array1.map((ar1Val) => array2.map((ar2Val) => [ar1Val, ar2Val]))
  );
};

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
  numCols = 30,
  numRows = 30,
  rotation = 0,
  scale = 80,
  type = "squares",
  updateBoardBox,
}: Props) => {
  const [selectedCells, updateSelectedCells] = useState([]);

  const gridSize = [numCols * scale, numRows * scale];
  const gridRotationOrigin = `${gridSize[0] / 2}, ${gridSize[1] / 2}`;
  const gridRotation = `${rotation}, ${gridRotationOrigin}`;

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

  // const getBoardBox = () => {
  //   return cells.reduce(
  //     (acc, val, ind) => {
  //       const rowInd = Math.floor(ind / numRows);
  //       const colInd = ind % numCols;
  //       if (val === 1) {
  //         if (
  //           acc ===
  //           [
  //             [-1, -1],
  //             [-1, -1],
  //           ]
  //         ) {
  //           return [
  //             [rowInd, colInd],
  //             [rowInd, colInd],
  //           ];
  //         }
  //         if (acc[0][1] > colInd) {
  //           acc[0][1] = colInd;
  //         }
  //         if (acc[1][0] < rowInd) {
  //           acc[1][0] = rowInd;
  //         }
  //         if (acc[1][1] < colInd) {
  //           acc[1][1] = colInd;
  //         }
  //       }
  //       return acc;
  //     },
  //     [
  //       [-1, -1],
  //       [-1, -1],
  //     ]
  //   );
  // };

  return (
    <svg viewBox={`${gridRotationOrigin}, 800, 800`} height="800" width="800">
      {patternCenters.map((center, ind) =>
        patterns[type].map((shape, shapeInd) => {
          const id = ind * patterns[type].length + shapeInd;
          // console.log(selectedCells.includes(id))
          // const color = getColor(id);
          return (
            <Polygon
              center={[
                center[0] + shape.center[0],
                center[1] + shape.center[1],
              ]}
              color={selectedCells.includes(id) ? "pink" : "white"}
              // color="pink"
              // displayCellNumber={true}
              displayRowColNumbers={true}
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

// type PolygonProps = {
//   center: Array<number>;
//   color?: string;
//   gridRotation?: number;
//   id: number;
//   offsets: Array<Array<number>>;
//   onClick?: () => void;
//   scale?: number;
//   shapeRotation?: number;
// };
