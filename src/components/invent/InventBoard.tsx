// import React, {useState} from "react";
import React from 'react';
// import Grid from "../grids/Grid";
import InventBoardForm from "./InventBoardForm";

export type gridType = "squares" | "triangles" | "hexagons";

type Props = {
  cellIds: Array<number>;
  formValues: {
    gridType: gridType;
    rotation: number;
  };
};

const Board = ({ cellIds, formValues }: Props) => {
  return (
    <div className="InventBoard" style={{ display: "flex" }}>
      <InventBoardForm cellIds={cellIds} />
    </div>
  );
};

export default Board;
