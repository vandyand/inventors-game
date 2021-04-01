import React, { useEffect } from "react";
import Row from "./Row";
import "./Board.scss";

type OwnProps = any;

type StateProps = {
  boardSize: Array<number>;
};

export type BoardProps = StateProps & OwnProps;

const Board: React.FC<BoardProps> = ({ boardSize, onLoadBoard }) => {
  useEffect(() => {
    onLoadBoard(1);
  });

  window.console.log("boardSize:", boardSize);

  return (
    <div className="board">
      {[...Array(boardSize).keys()].reverse().map((num) => (
        <Row
          key={num}
          numSpaces={boardSize}
          colorIndent={(num + 1) % 2}
          rowNum={num + 1}
        />
      ))}
    </div>
  );
};

export default Board;
