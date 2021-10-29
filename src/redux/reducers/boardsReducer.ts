import { identity, map } from "lodash";
import { LOAD_BOARD_SUCCESS, SUBMIT_NEW_BOARD } from "../actions/boardsActions";

export const boardsReducer = (state = [], action: any) => {
  switch (action.type) {
    case LOAD_BOARD_SUCCESS: {
      return map(action.payload, identity); //convert incoming collection to array
    }
    case SUBMIT_NEW_BOARD: {
      return [...state, action.payload];
    }
    default:
      return state;
  }
};
