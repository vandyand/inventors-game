import React from "react";
import moveFuncs from "../gameEngine/MoveFuncs";
import "./Space.scss";

const Space = ({
  spaceCode,
  color,
  teamPiece,
  state,
  selectPieceReducer,
  pieceMoveReducer,
  attackMoveReducer,
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
    } else if (
      state.currentGame.newMove.piece && // piece has been selected
      pieceTeam !== state.currentGame.whoseTurn && // empty space or opponent space
      moveFuncs(state, "legalMove", spaceCode) // the move is legal
    ) {
      if (moveFuncs(state, "attacking", spaceCode)) {
        attackMoveReducer(spaceCode, teamPiece);
      } else {
        pieceMoveReducer(spaceCode, teamPiece);
      }
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
