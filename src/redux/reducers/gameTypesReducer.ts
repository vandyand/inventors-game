import {
  LOADING_GAME_TYPE,
  LOAD_GAME_TYPE_SUCCESS,
} from "../actions/actionTypes";

export const gameTypesReducer = (state = [], action: any) => {
  switch (action.type) {
    case LOADING_GAME_TYPE: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case LOAD_GAME_TYPE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
