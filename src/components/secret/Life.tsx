import React, { useState } from "react";
import { degreesToRadians } from "../../helpers";
import { flatten, range } from "lodash";
// import Triangle from "./shapes";

type Props = {
  height: number;
  startingOrientation: number;
  width: number;
};

const TriangleGrid = ({ height, startingOrientation, width }: Props) => {
  const dx = 0.5; // cos(60 degrees)
  const dy = Math.sin(degreesToRadians(60));

  const sidelength: any = 20;
  const num_wide = 40;
  const num_high = 50;

  const even_row_xs = range(num_wide).map((x) => x * sidelength);
  const odd_row_xs = even_row_xs.map((x) => x + dx * sidelength);

  const ys = range(num_high).map((y) => y * (dy * sidelength));

  // console.log(even_row_xs, odd_row_xs, ys);

  const centers = flatten(
    range(num_high).map((y) => {
      return range(num_wide).map((x) => {
        if (y % 2 === 0) {
          return [even_row_xs[x], ys[y]];
        }
        return [odd_row_xs[x], ys[y]];
      });
    })
  );

  const other_centers = flatten(
    range(num_high).map((y) => {
      return range(num_wide).map((x) => {
        if (y % 2 === 0) {
          return [odd_row_xs[x], ys[y]];
        }
        return [even_row_xs[x], ys[y]];
      });
    })
  );

  const shape_1_offsets = [
    [dx, -dy * 0.5],
    [-dx, -dy * 0.5],
    [0, dy * 0.5],
  ];

  const shape_2_offsets = [
    [0, -dy * 0.5],
    [dx, dy * 0.5],
    [-dx, dy * 0.5],
  ];

  // console.log(node_offsets);

  const pointss = centers.map((center) => {
    let path = "";
    shape_1_offsets.map(
      (offset) =>
        (path += `${center[0] + offset[0] * sidelength},${
          center[1] + offset[1] * sidelength
        } `)
    );
    return path;
  });

  // console.log(pointss);

  const other_pointss = other_centers.map((center) => {
    let path = "";
    shape_2_offsets.map(
      (offset) =>
        (path += `${center[0] + offset[0] * sidelength},${
          center[1] + offset[1] * sidelength
        } `)
    );
    return path;
  });

  // console.log(pointss);

  // let alive = getRandomAliveCells(num_wide * 2 * num_high);
  // console.log(alive);

  const getRandomAliveCells = (numCells) => {
    let cells = new Array(numCells).fill(0);
    cells = cells.map((val) => Math.floor(Math.random() * 1.01));
    return cells;
  };

  const [cells, setCells] = useState(
    getRandomAliveCells(num_wide * 2 * num_high)
  );

  const sequenceLife = () => {
    console.log("going");
    const newCells = cells.map((cell, ind) => {
      const neighbors = getNumAliveNeighbors(ind);
      if (cell === 0) {
        // if cell is dead
        if (neighbors >= 3 && neighbors <= 3) {
          return 1;
        }
      } else {
        // if cell is alive
        if (neighbors >= 2 && neighbors <= 3) {
          return 1;
        }
      }
      return 0;
    });
    setCells(newCells);
  };

  // const getSimpleNumAliveNeighbors = (ind) => {
  //   const rowNum = Math.floor(ind / (num_wide * 2));
  //   const delta = ((rowNum % 2) * 2 - 1) * (num_wide * 2);
  //   // console.log(rowNum, delta);
  //   return (
  //     cells[ind - 1] +
  //     cells[ind + 1] +
  //     cells[
  //       ind % 2 === 0 ? (ind + delta) % (num_high * num_wide * 2) : ind - delta
  //     ]
  //   );
  // };

  const getNumAliveNeighbors = (ind) => {
    const rowNum = Math.floor(ind / (num_wide * 2));
    const delta = ((rowNum % 2) * 2 - 1) * (num_wide * 2);
    // console.log(rowNum, delta);
    const nextRowCell =
      ind % 2 === 0 ? (ind + delta) % (num_high * num_wide * 2) : ind - delta;
    const otherRowCell =
      ind % 2 === 1 ? (ind + delta) % (num_high * num_wide * 2) : ind - delta;
    return (
      cells[ind - 1] +
      cells[ind - 2] +
      cells[ind + 1] +
      cells[ind + 2] +
      cells[nextRowCell] +
      cells[nextRowCell - 1] +
      cells[nextRowCell - 2] +
      cells[nextRowCell + 1] +
      cells[nextRowCell + 2] +
      cells[otherRowCell] +
      cells[otherRowCell + 1] +
      cells[otherRowCell - 1]
    );
  };

  const toggleCell = (targetInd) => {
    // console.log(`cell ${targetInd} toggled`);
    setCells(
      cells.map((cell, ind) => {
        if (ind === targetInd) {
          return cell ? 0 : 1;
        }
        return cell;
      })
    );
  };

  const downIndexMap = range(num_high * num_wide).map((ind) => {
    if (Math.floor(ind / num_wide) % 2 === 0) {
      // even row
      return ind * 2;
    }
    return ind * 2 + 1;
  });

  const upIndexMap = range(num_high * num_wide).map((ind) => {
    if (Math.floor(ind / num_wide) % 2 === 1) {
      // odd row
      return ind * 2;
    }
    return ind * 2 + 1;
  });

  // console.log("upIndexMap:", upIndexMap);
  // console.log("downIndexMap:", downIndexMap);

  return (
    <>
      <svg viewBox="-100 -100 800 800" height="700" width="700">
        {pointss.map((points, ind) => {
          // const [x, y] = coords;
          // const center = centers[ind];
          const cellNum = downIndexMap[ind];
          return (
            <>
              <polygon
                key={cellNum}
                onClick={() => toggleCell(cellNum)}
                fill={cells[cellNum] === 1 ? "pink" : "white"}
                // stroke="black"
                // strokeWidth="0.5"
                points={points}
                // transform={`rotate(45, ${center[0]}, ${center[1]})`}
              />
              {/* <text
                x={Number(points.split(" ")[0].split(",")[0]) - 35}
                y={Number(points.split(" ")[0].split(",")[1]) + 20}
              >
                {cellNum}
              </text> */}
            </>
          );
        })}
        {other_pointss.map((points, ind) => {
          // const [x, y] = coords;
          // const center = centers[ind];
          const cellNum = upIndexMap[ind];
          return (
            <>
              <polygon
                key={cellNum}
                onClick={() => toggleCell(cellNum)}
                fill={cells[cellNum] === 1 ? "pink" : "white"}
                // stroke="black"
                // strokeWidth="0.5"
                points={points}
                // transform={`rotate(45, ${center[0]}, ${center[1]})`}
              />
              {/* <text
                x={Number(points.split(" ")[0].split(",")[0]) - 8}
                y={Number(points.split(" ")[0].split(",")[1]) + 30}
              >
                {cellNum}
              </text> */}
            </>
          );
        })}
      </svg>
      <button onClick={sequenceLife}>Go</button>
    </>
  );
};

export default TriangleGrid;
