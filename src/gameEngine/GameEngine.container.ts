import { connect } from "react-redux";
import { Dispatch } from "redux";
import GameEngine from "./gameEngine";

const mapStateToProps = (state: any) => ({
  state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSelectPiece: (code: string, piece: string) =>
    dispatch({
      type: "SELECT_PIECE",
      payload: { code, piece },
    }),
  onSetPossibleMoves: (possibleMoves: Array<any>) =>
    dispatch({
      type: "CALCULATE_POSSIBLE_MOVES",
      payload: possibleMoves,
    }),
  onPieceMove: (code: string, piece: string) =>
    dispatch({
      type: "PIECE_MOVE",
      payload: { code, piece },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameEngine);
