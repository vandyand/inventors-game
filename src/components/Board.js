import React from "react";
import { connect } from "react-redux";
import Row from "./Row";
import "./Board.scss";

const Board = ({ currentGameType, gameTypes, movePiece }) => {
  const gameType = gameTypes[currentGameType];
  console.log(gameType);

  return (
    <div className="board">
      {[...Array(gameType.board.size[0]).keys()].reverse().map((num) => (
        <Row
          key={num}
          numSpaces={gameType.board.size[1]}
          colorIndent={(num + 1) % 2}
          rowNum={num + 1}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  gameTypes: state.gameTypes,
  currentGameType: state.currentGameType,
});

export default connect(mapStateToProps, null)(Board);
