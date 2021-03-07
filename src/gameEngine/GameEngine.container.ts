import { connect } from "react-redux";
import { Dispatch } from "redux";
import GameEngine from "./gameEngine";
// import { currentGame } from "../redux/initialStates/currentGame";
// import { boards } from "../redux/initialStates/boards";
// import { gameTypes } from "../redux/initialStates/gameTypes";
// import { pieces } from "../redux/initialStates/pieces";
import {
  SELECT_PIECE,
  CALCULATE_POSSIBLE_MOVES,
} from "../redux/actions/actionTypes";
import { onPieceMoveActionCreator } from "../redux/actions/gameEngineActions";

const mapStateToProps = (state: any) => ({
  state,
});

const mapDispatchToProps = (dispatch: Dispatch, state: any) => ({
  onSelectPiece: (code: string, piece: string) =>
    dispatch({
      type: SELECT_PIECE,
      payload: { code, piece },
    }),
  onSetPossibleMoves: (possibleMoves: Array<any>) =>
    dispatch({
      type: CALCULATE_POSSIBLE_MOVES,
      payload: possibleMoves,
    }),
  onPieceMove: (state: any, code: string) =>
    dispatch(onPieceMoveActionCreator(state, code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameEngine);
