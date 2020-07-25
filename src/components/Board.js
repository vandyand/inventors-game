import React from "react";
import { connect } from "react-redux";
import Row from "./Row";
import "./Board.scss";

const Board = ({ boards, currentGameTypeCode, gameTypes, movePiece }) => {
  const gameType = gameTypes.filter(
    (gameType) => gameType.code === currentGameTypeCode
  )[0];
  const board = boards
    .filter((board) => board.code === gameType.boardCode)
    .pop();

  return (
    <div className="board">
      {[...Array(board.size[0]).keys()].reverse().map((num) => (
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

const mapStateToProps = (state) => ({
  gameTypes: state.gameTypes,
  boards: state.boards,
  currentGameTypeCode: state.currentGameTypeCode,
});

export default connect(mapStateToProps, null)(Board);
