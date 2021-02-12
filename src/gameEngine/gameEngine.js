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

    let pickPiece,
      teamPiece,
      spaceCode = "";
    let possibleMoves = [];
    let count = 0;
    do {
      count++;
      pickPiece = teamPieces[Math.floor(Math.random() * teamPieces.length)];
      [teamPiece, spaceCode] = pickPiece.split("-");
      possibleMoves = moveFuncs(state, "getLegalMoves", spaceCode, teamPiece);
    } while (possibleMoves.length === 0 && count < 10000);
    selectPieceReducer(spaceCode, teamPiece);
    setPossibleMovesReducer(possibleMoves);

    const chosenMoveSpace =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    pieceMoveReducer(chosenMoveSpace, teamPiece);
  };

  return <button onClick={handleClick}>Computer Move!</button>;
};

export default GameEngine;
