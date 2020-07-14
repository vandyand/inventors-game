import React from "react";
import { connect } from "react-redux";
import Row from "./Row";
import "./Board.scss";

const Board = ({ games, movePiece }) => {
  const getGameById = (id) => {
    return games
      .filter((game) => {
        return game.id === id;
      })
      .shift();
  };

  const game = getGameById(143);
  console.log(game);

  return (
    <div className="board">
      {[...Array(game.board.size[0]).keys()].map((num) => (
        <Row numSpaces={game.board.size[1]} colorIndent={num % 2} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    games: state.games,
  };
};

const mapDispatchToProps = (dispatch) => ({
  movePiece: () =>
    dispatch({ type: "MOVEPIECE", payload: { from: "d2", to: "b3" } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
