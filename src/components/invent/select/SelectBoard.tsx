import React from "react";
import { board } from "../../../types/board";
import BoardOption from "./SelectBoardOption";

type Props = {
  boards: Array<board>;
  title: string;
};

const SelectBoard = (props: Props) => {
  return (
    <div className="SelectBoard">
      <h4>{props.title}</h4>
      {props.boards ? (
        props.boards.map((board, ind) => (
          <BoardOption board={board} key={ind} />
        ))
      ) : (
        <div>No boards here. Please invent one!</div>
      )}
    </div>
  );
};

export default SelectBoard;
