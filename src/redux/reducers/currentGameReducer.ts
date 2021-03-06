import { currentGame } from "../initialStates/currentGame";
import { gameTypes } from "../initialStates/gameTypes";
// import { boards } from "../initialStates/boards";
// import { pieces } from "../initialStates/pieces";

const currentGameType = gameTypes.filter(
  (gameType) => gameType.code === currentGame.code
)[0];

export const currentGameReducer = (state = currentGame, action: any) => {
  switch (action.type) {
    case "STARTUP_LOAD_GAME": {
      return {
        ...state,
        arrangementSequence: state.arrangementSequence.concat([
          action.payload,
          currentGameType.startingPiecePositions,
        ]),
      };
    }
    case "SELECT_PIECE": {
      return {
        ...state,
        newMove: {
          ...state.newMove,
          from: action.payload.code,
          piece: action.payload.piece,
        },
      };
    }
    case "CALCULATE_POSSIBLE_MOVES": {
      return {
        ...state,
        newMove: {
          ...state.newMove,
          possibleMoves: action.payload,
        },
      };
    }
    case "PIECE_MOVE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "UPDATE_CURRENT_ARRANGEMENT_SEQ_NUM": {
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
