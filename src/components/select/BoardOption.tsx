import React from "react";
import { board } from "../game/Board";

type Props = {
  board: board;
};

const BoardOption = ({ board }: Props) => {
  return (
    <div className="BoardOption">
      <div className="BoardOption__name">{board.name}</div>
      <img alt={`${board.name} board`} src={board.pic} />
    </div>
  );
};

export default BoardOption;
