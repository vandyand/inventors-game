import React from "react";
import SquareGrid from "../grids/SquareGrid";
import TriangleGrid from "../grids/TriangleGrid";
import HexagonGrid from "../grids/HexagonGrid";
// import type { gridType } from "./Board";

// type Props = {
//   gridType: gridType;
//   rotation: number;
// };

type Props = any;

const GridWindow = ({ gridType, rotation = "0" }: Props) => {
  console.log("gridwindow props:", { gridType, rotation });

  const renderGrid = (gridType) => {
    switch (gridType) {
      case "square":
        return <SquareGrid />;
      case "triangle":
        return <TriangleGrid rotation={rotation} />;
      case "hexagon":
        return <HexagonGrid />;
    }
  };

  return <div>{renderGrid(gridType)}</div>;
};

export default GridWindow;
