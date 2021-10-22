import {
  LOADING_BOARD,
  LOADING_BOARDS,
  LOAD_BOARD_SUCCESS,
  SUBMIT_NEW_BOARD,
} from "../actions/boardActions";

export const boardReducer = (state = [], action: any) => {
  switch (action.type) {
    case LOADING_BOARD:
    case LOADING_BOARDS: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case LOAD_BOARD_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SUBMIT_NEW_BOARD: {
      return [...state, action.payload];
    }
    default:
      return state;
  }
};
