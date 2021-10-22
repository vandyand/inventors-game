import React, { useState } from "react";
import { degreesToRadians } from "../../helpers/miscHelpers";
import { flatten, range } from "lodash";
import Triangle from "./Polygon";

type Props = {
  rotation?: number;
};

const TriangleGrid = ({ rotation = 0 }: Props) => {
  const dx = 0.5; // cos(60 degrees)
  const dy = Math.sin(degreesToRadians(60));

  const sidelength: any = 100;
  const num_wide = 8;
  const num_high = 10;

  const even_row_xs = range(num_wide).map((x) => x * sidelength);
  const odd_row_xs = even_row_xs.map((x) => x + dx * sidelength);

  const ys = range(num_high).map((y) => y * dy * sidelength);

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

  const pointss = centers.map((center) => {
    let path = "";
    shape_1_offsets.map(
      (offset) =>
      (path += `${center[0] + offset[0] * sidelength},${center[1] + offset[1] * sidelength
        } `)
    );
    return path;
  });

  const other_pointss = other_centers.map((center) => {
    let path = "";
    shape_2_offsets.map(
      (offset) =>
      (path += `${center[0] + offset[0] * sidelength},${center[1] + offset[1] * sidelength
        } `)
    );
    return path;
  });

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

  const [cells, setCells] = useState(
    new Array(num_wide * 2 * num_high).fill(0)
  );

  const toggleCell = (targetInd) => {
    setCells(
      cells.map((cell, ind) => {
        if (ind === targetInd) {
          return cell ? 0 : 1;
        }
        return cell;
      })
    );
  };

  return (
    <>
      <svg viewBox="-100 -100 800 800" height="700" width="700">
        {pointss.map((points, ind) => {
          const cellNum = downIndexMap[ind];
          return (
            <Triangle
              center={centers[ind]}
              color="white"
              id={cellNum}
              // gridRotation={rotation}
              offsets={shape_1_offsets}
              onClick={() => undefined}
              scale={sidelength}
              shapeRotation={rotation}
            />
            // <polygon
            //   key={cellNum}
            //   onClick={() => toggleCell(cellNum)}
            //   fill={cells[cellNum] === 1 ? "light-blue" : "white"}
            //   stroke="black"
            //   strokeWidth="0.5"
            //   points={points}
            //   transform={`rotate(${rotation}, 0, 0)`}
            // />
          );
        })}
        {other_pointss.map((points, ind) => {
          const cellNum = upIndexMap[ind];
          return <div onClick={() => toggleCell(0)}>{cellNum}</div>;
          // return (
          //   <polygon
          //     key={cellNum}
          //     onClick={() => toggleCell(cellNum)}
          //     fill={cells[cellNum] === 1 ? "light-blue" : "white"}
          //     stroke="black"
          //     strokeWidth="0.5"
          //     points={points}
          //     transform={`rotate(${rotation}, 0, 0)`}
          //   />
          // );
        })}
      </svg>
    </>
  );
};

export default TriangleGrid;
