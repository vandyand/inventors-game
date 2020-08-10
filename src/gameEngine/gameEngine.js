import React from "react";
import { connect } from "react-redux";

const GameEngine = (state, selectPieceReducer) => {
  const handleClick = () => {
    console.log("computer move button clicked!");
    const pickPiece = state.currentGame.arrangementSequence
      .slice(-1)
      .pop()
      .reduce((acc, cur) => {
        if (acc) {
          return acc;
        }
        if (cur.includes("B")) {
          return cur;
        }
        return "";
      }, "");
    console.log(pickPiece);
    selectPieceReducer(pickPiece.split("-")[0], pickPiece.split("-")[1]);
  };

  return <button onClick={handleClick}>Computer Move!</button>;
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  selectPieceReducer: (code, piece) =>
    dispatch({
      type: "SELECT_PIECE",
      payload: { code, piece },
    }),
  pieceMoveReducer: (code, piece) =>
    dispatch({
      type: "PIECE_MOVE",
      payload: { code, piece },
    }),
  attackMoveReducer: (code, piece) =>
    dispatch({
      type: "ATTACK_MOVE",
      payload: { code, piece },
    }),
  enPassantMoveReducer: (code, piece) =>
    dispatch({
      type: "ENPASSANT_MOVE",
      payload: { code, piece },
    }),
  castlingMoveReducer: (code, piece) =>
    dispatch({
      type: "CASTLING_MOVE",
      payload: { code, piece },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameEngine);
