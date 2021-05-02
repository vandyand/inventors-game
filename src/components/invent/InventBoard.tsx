// import React, {useState} from "react";
import React from 'react';
// import Grid from "../grids/Grid";
import InventBoardForm from "./InventBoardForm";

export type gridType = "squares" | "triangles" | "hexagons";

type Props = {
  formValues: {
    gridType: gridType;
    rotation: number;
    selectedCells: Array<number>;
  };
};

const Board = (props: Props) => {
  return (
    <div className="InventBoard" style={{ display: "flex" }}>
      <InventBoardForm {...props} />
    </div>
  );
};

export default Board;
