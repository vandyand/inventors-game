import React, { useEffect } from "react";
import Row from "./Row";
import "./Board.scss";

type OwnProps = any;

export type board = {
  id: string;
  name: string;
  pic?: string;
  code: string;
  gridType?: string;
  gridTypeId?: number;
  size: Array<number>;
};

type StateProps = {
  board: board;
  onLoadBoard: (id: number) => void;
  // onLoadPieces: (codes: Array<string>) => void;
};

export type BoardProps = StateProps & OwnProps;

const Board: React.FC<BoardProps> = ({ board, onLoadBoard }) => {
  useEffect(() => {
    onLoadBoard(1);
  }, []);

  return (
    <div className="board">
      {board &&
        board.size &&
        [...Array(board.size[0]).keys()]
          .reverse()
          .map((num) => (
            <Row key={num} numSpaces={board.size[1]} rowNum={num + 1} />
          ))}
    </div>
  );
};

export default Board;
