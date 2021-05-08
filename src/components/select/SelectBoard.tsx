import React from "react";
import { boards } from "../../redux/initialStates/boards";
import { board } from "../game/Board";
import BoardOption from "./BoardOption";

type Props = {
  boards: Array<board>;
  title: string;
};

const SelectBoard = (props: Props) => {
  return (
    <div className="SelectBoard">
      <span>{props.title}</span>
      {boards.map((board, ind) => (
        <BoardOption board={board} key={ind} />
      ))}
    </div>
  );
};

export default SelectBoard;
