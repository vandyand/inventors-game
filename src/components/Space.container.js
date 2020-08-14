import { connect } from "react-redux";
import Space from "./Space";

const selectPieceActionCreator = (code, piece) => {
  return function (dispatch) {
    dispatch({
      type: "SELECT_PIECE",
      payload: { code, piece },
    });
  };
};

const setPossibleMovesActionCreator = (possibleMoves) => {
  return function (dispatch) {
    dispatch({
      type: "CALCULATE_POSSIBLE_MOVES",
      payload: { possibleMoves: possibleMoves },
    });
  };
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  selectPieceReducer: (code, piece) =>
    dispatch(selectPieceActionCreator(code, piece)),
  setPossibleMovesReducer: (possibleMoves) =>
    dispatch(setPossibleMovesActionCreator(possibleMoves)),
  pieceMoveReducer: (code, piece) =>
    dispatch({
      type: "PIECE_MOVE",
      payload: { code, piece },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Space);
