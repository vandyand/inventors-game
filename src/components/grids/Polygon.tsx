import React from "react";

type Props = {
  center: any;
  color?: string;
  displayCenters?: boolean;
  gridRotation?: number;
  id: number;
  offsets: Array<Array<number>>;
  onClick?: () => void;
  scale?: number;
  shapeRotation?: number;
};

const Polygon = ({
  center,
  color = "white",
  displayCenters = false,
  gridRotation = 0,
  id,
  offsets,
  onClick,
  scale = 1,
  shapeRotation = 0,
}: Props) => {
  const points = offsets.reduce(
    (acc, offset) =>
      (acc += `${(center[0] + offset[0]) * scale},${
        (center[1] + offset[1]) * scale
      } `),
    ""
  );

  return (
    <>
      <polygon
        key={id}
        onClick={onClick}
        fill={color}
        stroke="black"
        strokeWidth="0.5"
        points={points}
        transform={`rotate(${gridRotation}, 0, 0) rotate(${shapeRotation}, ${center[0]}, ${center[1]})`}
      />
      {displayCenters && (
        <polygon
          strokeWidth="2"
          points={`${center[0] * scale + 1},${center[1] * scale + 1}, ${
            center[0] * scale + 1
          },${center[1] * scale - 1}, ${center[0] * scale - 1},${
            center[1] * scale - 1
          } ${center[0] * scale - 1},${center[1] * scale + 1}`}
        />
      )}
    </>
  );
};

export default Polygon;
