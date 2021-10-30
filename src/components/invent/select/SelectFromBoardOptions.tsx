import React from "react";
import { board } from "../../../types/GameComponents";
import BoardOption from "./BoardOption";

import "./SelectStyles.scss";

type Props = {
  boards: Array<board>;
  title: string;
};

const SelectFromBoardOptions = (props: Props) => {
  return (
    <div className="SelectBoard">
      <h4>{props.title}</h4>
      {props.boards ? (
        props.boards.map((board, ind) => (
          <BoardOption board={board} key={ind} onSelectBoardOption={() => console.log(`you clicked board: ${board.name}`)} />
        ))
      ) : (
        <div>No boards here. Please invent one!</div>
      )}
    </div>
  );
};

export default SelectFromBoardOptions;
