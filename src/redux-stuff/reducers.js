import { INCREMENT, DECREMENT, RESET } from "./actionTypes";
import initialState from "./initialState";

const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INC_CURRENT_BOARD_AND_PIECES_NUM": {
      let newCurrentBoardAndPiecesSeqNum = state.currentBoardAndPiecesSeqNum;
      if (
        newCurrentBoardAndPiecesSeqNum <
        state.gameBoardAndPiecesSequence.length - 1
      ) {
        newCurrentBoardAndPiecesSeqNum++;
      }
      return {
        ...state,
        currentBoardAndPiecesSeqNum: newCurrentBoardAndPiecesSeqNum,
      };
    }
    case "DEC_CURRENT_BOARD_AND_PIECES_NUM": {
      let newCurrentBoardAndPiecesSeqNum = state.currentBoardAndPiecesSeqNum;
      if (newCurrentBoardAndPiecesSeqNum > 0) {
        newCurrentBoardAndPiecesSeqNum--;
      }
      return {
        ...state,
        currentBoardAndPiecesSeqNum: newCurrentBoardAndPiecesSeqNum,
      };
    }

    case "SET_CURRENT_MOVE_PIECE": {
      // const whoseTurn = state.gameBoardAndPiecesMoves.slice(-1).pop().charAt(0);

      if (state.currentMove.from && state.currentMove.piece) {
      }

      if (action.payload.piece) {
        return {
          ...state,
          currentMove: {
            ...state.currentMove,
            from: action.payload.code,
            piece: action.payload.piece,
          },
        };
      }
      return state;
    }

    case "MOVEPIECE": {
      return {
        ...state,
      };
    }

    case INCREMENT: {
      const newCount = state.count + 1;
      return {
        // ...state,
        count: newCount,
      };
    }
    case DECREMENT: {
      const newCount = state.count - 1;
      return {
        // ...state,
        count: newCount,
      };
    }
    case RESET: {
      const newCount = 0;
      return {
        // ...state,
        count: newCount,
      };
    }
    default:
      return state;
  }
};

export default countReducer;
