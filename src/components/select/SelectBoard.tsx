import React from "react";
// import { boards } from "../../redux/initialStates/boards";
import { board } from "../game/Board";
import BoardOption from "./BoardOption";

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
