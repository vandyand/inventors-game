import { currentGame } from "../initialStates/currentGame";
import { gameTypes } from "../initialStates/gameTypes";
import {
  STARTUP_LOAD_GAME,
  SELECT_PIECE,
  CALCULATE_POSSIBLE_MOVES,
  PIECE_MOVE,
  USER_PIECE_MOVE,
  UPDATE_CURRENT_ARRANGEMENT_SEQ_NUM,
} from "../actions/actionTypes";

const currentGameType = gameTypes.filter(
  (gameType) => gameType.code === currentGame.code
)[0];

export const currentGameReducer = (state = currentGame, action: any) => {
  switch (action.type) {
    case STARTUP_LOAD_GAME: {
      return {
        ...state,
        arrangementSequence: state.arrangementSequence.concat([
          currentGameType.startingPiecePositions,
        ]),
      };
    }
    case SELECT_PIECE: {
      console.log("SELECT_PIECE reducer state and action:", state, action);
      return {
        ...state,
        newMove: {
          ...state.newMove,
          from: action.payload.code,
          piece: action.payload.piece,
        },
      };
    }
    case CALCULATE_POSSIBLE_MOVES: {
      return {
        ...state,
        newMove: {
          ...state.newMove,
          possibleMoves: action.payload,
        },
      };
    }
    case PIECE_MOVE: {
      console.log("PIECE_MOVE reducer state and action:", state, action);
      return {
        ...state,
        ...action.payload,
      };
    }
    case USER_PIECE_MOVE: {
      console.log("USER_PIECE_MOVE reducer state and action:", state, action);
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_CURRENT_ARRANGEMENT_SEQ_NUM: {
      let newCurrentArrangementSeqNum =
        state.currentArrangementSeqNum + action.payload;

      if (newCurrentArrangementSeqNum < 0) {
        newCurrentArrangementSeqNum = 0;
      }

      if (newCurrentArrangementSeqNum > state.arrangementSequence.length - 1) {
        newCurrentArrangementSeqNum = state.arrangementSequence.length - 1;
      }

      return {
        ...state,
        currentArrangementSeqNum: newCurrentArrangementSeqNum,
      };
    }
    default:
      return state;
  }
};
