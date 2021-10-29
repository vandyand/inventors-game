import React from "react";
import { board } from "../../../types/GameComponents";

type Props = {
  board: board;
};

const BoardOption = ({ board }: Props) => {
  return (
    <div className="BoardOption">
      <div>this is board {`${board.name}`}</div>
      <img alt={`${board.name}`} src={board.pic} />
    </div>
  );
};

export default BoardOption;
