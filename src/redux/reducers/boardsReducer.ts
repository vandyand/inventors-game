// import { boards } from "../initialStates/boards";

import { getBoards } from "../../api";

const initialState = getBoards();

export const boardsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
