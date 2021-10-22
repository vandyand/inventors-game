import React from "react";
import { board } from "../../../types/GameComponents";

type Props = {
  board: board;
};

const BoardOption = ({ board }: Props) => {
  return (
    <div className="BoardOption">
      <img alt={`${board.name}`} src={board.pic} />
    </div>
  );
};

export default BoardOption;
