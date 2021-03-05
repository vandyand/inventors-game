import React from "react";
import moveFuncs from "../gameEngine/moveFuncs";
import "./Space.scss";

type Space = {
  spaceCode: string;
  color: string;
  teamPiece: string;
  state: any;
  setPossibleMoves: (possibleMoves: Array<any>) => void;
  selectPiece: (code: string, piece: string) => void;
  pieceMove: (code: string, piece: string) => void;
};

const Space: React.FC<Space> = ({
  spaceCode,
  color,
  teamPiece,
  state,
  setPossibleMoves,
  selectPiece,
  pieceMove,
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
      selectPiece(spaceCode, teamPiece);
      const possibleMoves = moveFuncs(
        state,
        "getLegalMoves",
        spaceCode,
        teamPiece
      );
      setPossibleMoves(possibleMoves);
    } else if (
      state.currentGame.newMove.piece && // piece has been selected
      state.currentGame.newMove.possibleMoves.includes(spaceCode) // the move is possible
    ) {
      pieceMove(spaceCode, teamPiece);
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
