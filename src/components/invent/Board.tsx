import React, {useState} from "react";
// import Grid from "../grids/Grid";
import Grid from "../grids/Grid";
import BoardOptionsSidebar from "./BoardOptionsSidebar";

export type gridType = "squares" | "triangles" | "hexagons";

type Props = {
  cellIds: Array<number>;
  formValues: {
    gridType: gridType;
    rotation: number;
  };
};

const Board = ({ cellIds, formValues }: Props) => {
  const [boardBox, setBoardBox] = useState([[-1,-1],[-1,-1]]);
  console.log("Board boardBox:",boardBox[0],boardBox[1])
  return (
    <div className="InventBoard" style={{ display: "flex" }}>
      <Grid
        type={formValues ? formValues.gridType : "triangles"}
        rotation={formValues ? formValues.rotation : 0}
        updateBoardBox={(boardBox: any) => setBoardBox(boardBox)}
      />
      <BoardOptionsSidebar cellIds={cellIds} />
    </div>
  );
};

export default Board;
