import { connect } from "react-redux";
import { Dispatch } from "redux";
import Engine from "./Engine";
import {
  SELECT_PIECE,
  CALCULATE_POSSIBLE_MOVES,
} from "../redux/actions/actionTypes";
import { onPieceMoveActionCreator } from "../redux/actions/engineActions";

const mapStateToProps = (state: any) => ({
  state,
});

const mapDispatchToProps = (dispatch: Dispatch, state: any) => ({
  onSelectPiece: (code: string, piece: string) =>
    dispatch({
      type: SELECT_PIECE,
      code,
      piece,
    }),
  onSetPossibleMoves: (possibleMoves: Array<any>) =>
    dispatch({
      type: CALCULATE_POSSIBLE_MOVES,
      possibleMoves,
    }),
  onPieceMove: (state: any, code: string) =>
    dispatch(onPieceMoveActionCreator(state, code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Engine);
