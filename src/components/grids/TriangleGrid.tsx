import React from "react";
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

  const sidelength: any = 100;
  const num_wide = 8;
  const num_high = 10;

  const even_row_xs = range(num_wide).map((x) => x * sidelength);
  const odd_row_xs = even_row_xs.map((x) => x + dx * sidelength);

  const ys = range(num_high).map((y) => y * dy * sidelength);

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

  const shape_1_offsets = [
    [dx, -dy / 2],
    [-dx, -dy / 2],
    [0, dy / 2],
  ];

  // const shape_2_offsets = [
  //   [0, -dy * 2],
  //   [dx, -dy],
  //   [-dx, -dy],
  // ];

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

  console.log(pointss);

  return (
    <svg height="1000" width="1000">
      {pointss.map((points, ind) => {
        // const [x, y] = coords;
        const center = centers[ind];
        return (
          <polygon
            key={ind}
            onClick={() => alert(`space ${ind} clicked!`)}
            fill="white"
            stroke="black"
            strokeWidth="0.5"
            points={points}
            transform={`rotate(45, ${center[0]}, ${center[1]})`}
          />
        );
      })}
    </svg>
  );
};

export default TriangleGrid;
