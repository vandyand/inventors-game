import React from "react";
// import Grid from "../grids/Grid";
import Grid from "../grids/Grid";
import BoardOptionsSidebar from "./BoardOptionsSidebar";

export type gridType = "squares" | "triangles" | "hexagons";

type Props = {
  formValues: {
    gridType: gridType;
    rotation: number;
  };
};

const Board = ({ formValues }: Props) => {
  // window.console.log("board props:", formValues);
  return (
    <div className="InventBoard" style={{ display: "flex" }}>
      <Grid
        type={formValues ? formValues.gridType : "triangles"}
        rotation={formValues ? formValues.rotation : 0}
      />
      <BoardOptionsSidebar />
    </div>
  );
};

export default Board;
