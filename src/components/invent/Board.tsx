import React from "react";
import GridWindow from "./GridWindow";
import BoardOptionsSidebarContainer from "./BoardOptionsSidebar.container";

const Board = () => {
  return (
    <div className="InventBoard" style={{ display: "flex" }}>
      <GridWindow />
      <BoardOptionsSidebarContainer />
    </div>
  );
};

export default Board;
