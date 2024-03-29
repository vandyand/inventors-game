import React from "react";
import { flatten, range } from "lodash";
import { degreesToRadians } from "./Grid";

type Props = {
  rotation?: number;
};

const HexagonGrid = ({ rotation = 0 }: Props) => {
  const dx = 0.5; // cos(60 degrees)
  const dy = Math.sin(degreesToRadians(60));
  const dy1 = Math.tan(degreesToRadians(30)) * dx;
  const dy2 = dy1 * 2;

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

  const node_offsets = [
    [0, dy2],
    [dx, dy1],
    [dx, -dy1],
    [0, -dy2],
    [-dx, -dy1],
    [-dx, dy1],
  ];

  const pointss = centers.map((center) => {
    let path = "";
    node_offsets.map(
      (offset) =>
      (path += `${center[0] + offset[0] * sidelength},${center[1] + offset[1] * sidelength
        } `)
    );
    return path;
  });

  return (
    <svg height="1000" width="1000">
      {pointss.map((points, ind) => {
        return (
          <polygon
            key={ind}
            onClick={() => alert(`space ${ind} clicked!`)}
            fill="white"
            stroke="black"
            strokeWidth="0.5"
            points={points}
            transform={`rotate(${rotation}, 0, 0)`}
          />
        );
      })}
    </svg>
  );
};

export default HexagonGrid;
