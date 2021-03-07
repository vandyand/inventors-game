import React from "react";
import moveFuncs from "../gameEngine/moveFuncs";
import "./Space.scss";

type Space = {
  spaceCode: string;
  color: string;
  teamPiece: string;
  state: any;
  onSetPossibleMoves: (possibleMoves: Array<any>) => void;
  onSelectPiece: (code: string, piece: string) => void;
  onUserPieceMove: (state: any, code: string) => void;
};

const Space: React.FC<Space> = ({
  spaceCode,
  color,
  teamPiece,
  state,
  onSetPossibleMoves,
  onSelectPiece,
  onUserPieceMove,
}) => {
  const pieceTeam = teamPiece ? teamPiece.charAt(0) : "";
  const currentSpacePieceInfo = teamPiece
    ? state.pieces
        .filter((piece: any) => piece.code === teamPiece.slice(1))
        .pop()
    : {};
  const handleClick = () => {
    if (state.currentGame.winner) {
      return;
    }

    if (state.currentGame.whoseTurn === pieceTeam) {
      onSelectPiece(spaceCode, teamPiece);
      const possibleMoves = moveFuncs(
        state,
        "getLegalMoves",
        spaceCode,
        teamPiece
      );
      onSetPossibleMoves(possibleMoves);
    } else if (
      state.currentGame.newMove.piece && // piece has been selected
      state.currentGame.newMove.possibleMoves.includes(spaceCode) // the move is possible
    ) {
      onUserPieceMove(state, spaceCode);
    }
  };

  return (
    <div className={`space ${color}-space`} onClick={handleClick}>
      {!!currentSpacePieceInfo && !!pieceTeam && (
        <img
          alt={`${currentSpacePieceInfo.name}`}
          src={require(`../img/${pieceTeam}${currentSpacePieceInfo.img}.png`)}
          height="80px"
          width="80px"
        />
      )}
    </div>
  );
};

export default Space;
