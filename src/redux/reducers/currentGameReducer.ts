import { currentGame } from "../initialStates/currentGame";
import { gameTypes } from "../initialStates/gameTypes";

export const UPDATE_CURRENT_ARRANGEMENT_SEQ_NUM: string =
  "UPDATE_CURRENT_ARRANGEMENT_SEQ_NUM";
export const PIECE_MOVE: string = "PIECE_MOVE";
export const CALCULATE_POSSIBLE_MOVES: string = "CALCULATE_POSSIBLE_MOVES";
export const SELECT_PIECE: string = "SELECT_PIECE";
export const LOAD_GAME: string = "LOAD_GAME";

const currentGameType = gameTypes.filter(
  (gameType) => gameType.code === currentGame.gameTypeCode
)[0];

export const currentGameReducer = (state = currentGame, action: any) => {
  switch (action.type) {
    case LOAD_GAME: {
      return {
        ...state,
        arrangementSequence: state.arrangementSequence.concat([
          currentGameType.startingPiecePositions,
        ]),
      };
    }
    case SELECT_PIECE: {
      return {
        ...state,
        newMove: {
          ...state.newMove,
          from: action.code,
          piece: action.piece,
        },
      };
    }
    case CALCULATE_POSSIBLE_MOVES: {
      return {
        ...state,
        newMove: {
          ...state.newMove,
          possibleMoves: action.possibleMoves,
        },
      };
    }
    case PIECE_MOVE: {
      return {
        ...state,
        ...action.newState,
      };
    }
    case UPDATE_CURRENT_ARRANGEMENT_SEQ_NUM: {
      let newCurrentArrangementSeqNum =
        state.currentArrangementSeqNum + action.seqNum;

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
