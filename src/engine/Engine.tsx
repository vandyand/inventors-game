import React from "react";
import moveFuncs from "./MoveFuncs";

type Engine = {
  state: any;
  onSelectPiece: (code: string, piece: string) => void;
  onSetPossibleMoves: (possibleMoves: Array<any>) => void;
  onPieceMove: (code: string, piece: string) => void;
};

const Engine: React.FC<Engine> = ({
  state,
  onSelectPiece,
  onSetPossibleMoves,
  onPieceMove,
}) => {
  const handleClick = () => {
    const teamPieces = state.currentGame.arrangementSequence
      .slice(-1)
      .pop()
      .filter(
        (teamPieceAndOrSpace: string) =>
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
    onSelectPiece(spaceCode, teamPiece);
    onSetPossibleMoves(possibleMoves);

    const randomMoveSpace =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    onPieceMove(state, randomMoveSpace);
  };

  const handleCompitentClick = () => {};

  return (
    <>
      <button onClick={handleClick}>Computer Move!</button>
      <button onClick={handleCompitentClick}>Computer Compitent Move!</button>
    </>
  );
};

export default Engine;
