import React from "react";
import { connect } from "react-redux";
import Row from "./Row";
import "./Board.scss";

type BoardProps = {
  boards: Array<any>;
  currentGameTypeCode: string;
  gameTypes: Array<any>;
};

const Board: React.FC<BoardProps> = ({
  boards,
  currentGameTypeCode,
  gameTypes,
}) => {
  const gameType = gameTypes.filter(
    (gameType) => gameType.code === currentGameTypeCode
  )[0];
  const board = boards
    .filter((board) => board.code === gameType.boardCode)
    .pop();

  return (
    <div className="board">
      {[7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
        <Row
          key={num}
          numSpaces={board.size[1]}
          colorIndent={(num + 1) % 2}
          rowNum={num + 1}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  boards: state.boards,
  currentGameTypeCode: state.currentGame.code,
  gameTypes: state.gameTypes,
});

export default connect(mapStateToProps, null)(Board);
