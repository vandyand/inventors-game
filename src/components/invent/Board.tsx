import React from "react";
import GridWindow from "./GridWindow";
import BoardOptionsSidebar from "./BoardOptionsSidebar";

export type gridType = "square" | "triangle" | "hexagon";

type Props = {
  formValues: {
    gridType: gridType;
    rotation: number;
  };
};

const Board = ({ formValues }: Props) => {
  window.console.log("board props:", formValues);
  return (
    <div className="InventBoard" style={{ display: "flex" }}>
      <GridWindow
        gridType={formValues ? formValues.gridType : "square"}
        rotation={formValues ? formValues.rotation : 0}
      />
      <BoardOptionsSidebar />
    </div>
  );
};

export default Board;
