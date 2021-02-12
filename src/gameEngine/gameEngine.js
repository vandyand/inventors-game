import React from "react";
import moveFuncs from "./MoveFuncs";

const GameEngine = ({
  state,
  selectPieceReducer,
  setPossibleMovesReducer,
  pieceMoveReducer,
}) => {
  const handleClick = () => {
    const teamPieces = state.currentGame.arrangementSequence
      .slice(-1)
      .pop()
      .filter(
        (teamPieceAndOrSpace) =>
          teamPieceAndOrSpace.charAt(0) === state.currentGame.whoseTurn
      );

    let randomPiece,
      teamPiece,
      spaceCode = "";
    let possibleMoves = [];
    let count = 0;
    do {
      count++;
      randomPiece = teamPieces[Math.floor(Math.random() * teamPieces.length)];
      [teamPiece, spaceCode] = randomPiece.split("-");
      possibleMoves = moveFuncs(state, "getLegalMoves", spaceCode, teamPiece);
    } while (possibleMoves.length === 0 && count < 10000);
    selectPieceReducer(spaceCode, teamPiece);
    setPossibleMovesReducer(possibleMoves);

    const randomMoveSpace =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    pieceMoveReducer(randomMoveSpace, teamPiece);
  };

  const handleCompitentClick = () => {};

  return (
    <>
      <button onClick={handleClick}>Computer Move!</button>
      <button onClick={handleCompitentClick}>Computer Compitent Move!</button>
    </>
  );
};

export default GameEngine;
