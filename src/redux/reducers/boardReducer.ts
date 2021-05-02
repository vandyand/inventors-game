import {
  LOADING_BOARD,
  LOAD_BOARD_SUCCESS,
  SUBMIT_NEW_BOARD,
} from "../actions/actionTypes";

export const boardReducer = (state = [], action: any) => {
  switch (action.type) {
    case LOADING_BOARD: {
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
