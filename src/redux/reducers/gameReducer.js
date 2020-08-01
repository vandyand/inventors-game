import initialState from "../initialState";

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INC_CURRENT_BOARD_AND_PIECES_NUM": {
      let newCurrentArrangementSeqNum =
        state.currentGame.currentArrangementSeqNum;
      if (
        newCurrentArrangementSeqNum <
        state.currentGame.currentArrangementSeqNum.length - 1
      ) {
        newCurrentArrangementSeqNum++;
      }
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          currentArrangementSeqNum: newCurrentArrangementSeqNum,
        },
      };
    }
    case "DEC_CURRENT_BOARD_AND_PIECES_NUM": {
      let newCurrentArrangementSeqNum =
        state.currentGame.currentArrangementSeqNum;
      if (newCurrentArrangementSeqNum > 0) {
        newCurrentArrangementSeqNum--;
      }
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          currentArrangementSeqNum: newCurrentArrangementSeqNum,
        },
      };
    }
    default:
      return state;
  }
};

export default gameReducer;
