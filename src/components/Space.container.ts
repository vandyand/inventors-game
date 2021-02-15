import { connect } from "react-redux";
import { Dispatch } from "redux";
import Space from "./Space";

// const selectPieceActionCreator = (code: string, piece: string) => {
//   return function (dispatch: Dispatch) {
//     dispatch({
//       type: "SELECT_PIECE",
//       payload: { code, piece },
//     });
//   };
// };

// const setPossibleMovesActionCreator = (possibleMoves: Array<string>) => {
//   return function (dispatch: Dispatch) {
//     dispatch({
//       type: "CALCULATE_POSSIBLE_MOVES",
//       payload: { possibleMoves: possibleMoves },
//     });
//   };
// };

const mapStateToProps = (state: any) => ({
  state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectPiece: (code: string, piece: string) =>
    dispatch({
      type: "SELECT_PIECE",
      payload: { code, piece },
    }),
  setPossibleMoves: (possibleMoves: Array<any>) =>
    dispatch({
      type: "CALCULATE_POSSIBLE_MOVES",
      payload: possibleMoves,
    }),
  pieceMove: (code: string, piece: string) =>
    dispatch({
      type: "PIECE_MOVE",
      payload: { code, piece },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Space);
