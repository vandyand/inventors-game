import React from "react";
// import { degreesToRadians } from "../../helpers";
import { flatten, range } from "lodash";
// import Triangle from "./shapes";

type Props = {
  height: number;
  startingOrientation: number;
  width: number;
};

const SquareGrid = ({ height, startingOrientation, width }: Props) => {
  const sidelength: any = 75;
  const num_wide = 8;
  const num_high = 10;

  const xs = range(num_wide).map((x) => x * sidelength);
  const ys = range(num_high).map((y) => y * sidelength);

  // console.log(even_row_xs, odd_row_xs, ys);

  const nodes = flatten(
    range(num_high).map((y) => {
      return range(num_wide).map((x) => {
        return [xs[x], ys[y]];
      });
    })
  );

  // console.log(nodes);

  return (
    <svg height="1000" width="1000">
      {nodes.map((coords, ind) => {
        const [x, y] = coords;
        return (
          <>
            <polygon
              key={ind}
              onClick={() => alert(`space ${x}, ${y} clicked!`)}
              fill="#eee"
              stroke="black"
              points={`${x},${y} ${x + sidelength},${y} ${x + sidelength},${
                y + sidelength
              } ${x},${y + sidelength}`}
              // transform="rotate(30 100 100)"
            />
          </>
        );
      })}
    </svg>
  );
};

export default SquareGrid;
