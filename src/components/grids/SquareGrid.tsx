import React from "react";
// import { degreesToRadians } from "../../helpers";
import { flatten, range } from "lodash";
// import Triangle from "./shapes";

type Props = {
  rotation?: number;
};

const SquareGrid = ({ rotation = 0 }: Props) => {
  const sidelength: any = 100;
  const num_wide = 20;
  const num_high = 20;

  const xs = range(num_wide).map((x) => x * sidelength);
  const ys = range(num_high).map((y) => y * sidelength);

  const centers = flatten(
    range(num_high).map((y) => {
      return range(num_wide).map((x) => {
        return [xs[x], ys[y]];
      });
    })
  );

  const dx = 1;
  const dy = 1;

  const node_offsets = [
    [dx / 2, dy / 2],
    [dx / 2, -dy / 2],
    [-dx / 2, -dy / 2],
    [-dx / 2, dy / 2],
  ];

  const pointss = centers.map((center) => {
    let path = "";
    node_offsets.map(
      (offset) =>
        (path += `${center[0] + offset[0] * sidelength},${
          center[1] + offset[1] * sidelength
        } `)
    );
    return path;
  });

  return (
    <svg height="500" width="600">
      {pointss.map((points, ind) => {
        const center = centers[ind];
        return (
          <polygon
            key={ind}
            onClick={() => alert(`space ${ind} clicked!`)}
            fill="#eee"
            stroke="black"
            points={points}
            transform={`rotate(${rotation}, 0, 0) rotate(${rotation}, ${center[0]}, ${center[1]})`}
            // transform={`rotate(45, ${center[0]}, ${center[1]})`}
          />
        );
      })}
    </svg>
  );
};

export default SquareGrid;
