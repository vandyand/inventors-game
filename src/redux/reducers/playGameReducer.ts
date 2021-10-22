import { START_NEW_GAME } from "../actions/playGameActions";

export const boardReducer = (state = [], action: any) => {
  switch (action.type) {
    case START_NEW_GAME: {
      return {
        ...state,
        currentGame: action.payload,
      };
    }
    default:
      return state;
  }
};
