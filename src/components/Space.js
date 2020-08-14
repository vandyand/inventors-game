import React from "react";
import moveFuncs from "../gameEngine/MoveFuncs";
import "./Space.scss";

const Space = ({
  spaceCode,
  color,
  teamPiece,
  state,
  setPossibleMovesReducer,
  selectPieceReducer,
  pieceMoveReducer,
}) => {
  const pieceTeam = teamPiece ? teamPiece.charAt(0) : "";
  const currentSpacePieceInfo = teamPiece
    ? state.pieces.filter((piece) => piece.code === teamPiece.slice(1)).pop()
    : {};
  const handleClick = () => {
    if (state.currentGame.winner) {
      return;
    }
    if (state.currentGame.whoseTurn === pieceTeam) {
      selectPieceReducer(spaceCode, teamPiece);
      setPossibleMovesReducer(
        moveFuncs(state, "getLegalMoves", spaceCode, teamPiece)
      );
    } else if (
      state.currentGame.newMove.piece && // piece has been selected
      state.currentGame.newMove.possibleMoves.includes(spaceCode) // the move is possible
    ) {
      pieceMoveReducer(spaceCode, teamPiece);
    }
  };

  return (
    <div className={`space ${color}-space`} onClick={handleClick}>
      {!!currentSpacePieceInfo && !!pieceTeam && (
        <img
          alt="blackKing"
          src={require(`../img/${pieceTeam}${currentSpacePieceInfo.img}.png`)}
          height="80px"
          width="80px"
        />
      )}
    </div>
  );
};

export default Space;
