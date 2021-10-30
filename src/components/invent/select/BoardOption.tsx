import React from "react";
import { board } from "../../../types/GameComponents";

type Props = {
  board: board;
  onSelectBoardOption: () => void;
};

const BoardOption = ({ board, onSelectBoardOption }: Props) => {
  return (
    <div className="BoardOption" onClick={onSelectBoardOption}>
      <div>this is board {`${board.name}`}</div>
      <img alt={`${board.name}`} src={board.pic} />
    </div>
  );
};

export default BoardOption;
