import React from "react";

type Props = {
  center: Array<number>;
  color?: string;
  displayCellNumber?: boolean;
  displayCenters?: boolean;
  displayRowColNumbers?: boolean;
  gridRotation?: string;
  id: number;
  offsets: Array<Array<number>>;
  onClick?: (id: number) => void;
  rotateOrigin?: string;
  scale?: number;
  shapeRotation?: number;
};

const Polygon = ({
  color = "white",
  displayCellNumber = false,
  displayCenters = false,
  displayRowColNumbers = false,
  gridRotation = "0, 0, 0",
  id,
  offsets,
  onClick,
  center,
  rotateOrigin = "0, 0",
  scale = 1,
  shapeRotation = 0,
}: Props) => {
  const points = offsets.reduce(
    (acc, offset) =>
    (acc += `${(center[0] + offset[0]) * scale},${(center[1] + offset[1]) * scale
      } `),
    ""
  );

  const centerPoints = `${center[0] * scale + 1},${center[1] * scale + 1}, ${center[0] * scale + 1
    },${center[1] * scale - 1}, ${center[0] * scale - 1},${center[1] * scale - 1
    } ${center[0] * scale - 1},${center[1] * scale + 1}`;

  return (
    <>
      <polygon
        key={id}
        onClick={() => onClick(id)}
        fill={color}
        stroke="black"
        strokeWidth="0.5"
        points={points}
        transform={`rotate(${gridRotation}) rotate(${shapeRotation}, ${center[0]}, ${center[1]})`}
      />
      {displayCenters && <polygon strokeWidth="2" points={centerPoints} />}
      {displayCellNumber && (
        <text
          x={center[0] * scale * 0.99}
          y={center[1] * scale}
          transform={`rotate(${gridRotation}) rotate(${shapeRotation}, ${center[0]}, ${center[1]})`}
        >
          {id}
        </text>
      )}
      {displayRowColNumbers && (
        <text
          x={center[0] * scale * 0.99}
          y={center[1] * scale}
          transform={`rotate(${gridRotation}) rotate(${shapeRotation}, ${center[0]}, ${center[1]})`}
        >
          {`${center[1]},${center[0]}`}
        </text>
      )}
    </>
  );
};

export default Polygon;
