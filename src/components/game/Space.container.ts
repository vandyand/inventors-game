import { connect } from "react-redux";
import { Dispatch } from "redux";
import Space from "./Space";
import { onPieceMoveActionCreator } from "../../redux/actions/engineActions";
import {
  CALCULATE_POSSIBLE_MOVES,
  SELECT_PIECE,
} from "../../redux/reducers/currentGameReducer";

const mapStateToProps = (state: any) => ({
  state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
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
  onUserPieceMove: (state: any, code: string) =>
    dispatch(onPieceMoveActionCreator(state, code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Space);
