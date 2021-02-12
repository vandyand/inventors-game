import React from "react";
import moveFuncs from "../gameEngine/moveFuncs";
import "./Space.scss";

interface Space {
  spaceCode: string;
  color: string;
  teamPiece: string;
  state: any;
  setPossibleMovesReducer: (possibleMoves: Array<any>) => void;
  selectPieceReducer: (code: string, piece: string) => void;
  pieceMoveReducer: (code: string, piece: string) => void;
}

const Space: React.FC<Space> = ({
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
    ? state.pieces
        .filter((piece: any) => piece.code === teamPiece.slice(1))
        .pop()
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
