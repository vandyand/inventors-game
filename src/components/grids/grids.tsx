import React from "react";
// import Triangle from "./shapes";

type Props = {
  height: number;
  startingOrientation: number;
  width: number;
};

const TriangleGrid = ({ height, startingOrientation, width }: Props) => {
  return (
    <svg height="1000" width="1000">
      {
        [...Array(height).keys()].map((num) => {
          return (
            <rect
              x="25"
              y="25"
              height="100"
              width="200"
              stroke="red"
              fill="none"
            />
          );
        })
        // for(let j = 0; j < width; j++){
        //     return <Triangle fill="none"/>
        // }
      }
    </svg>
  );
};

export default TriangleGrid;
