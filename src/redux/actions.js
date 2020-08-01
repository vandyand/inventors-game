import { INCREMENT, DECREMENT, RESET } from "./actionTypes";

export const incrementActionCreator = () => ({
  type: INCREMENT,
});

export const decrementActionCreator = () => ({
  type: DECREMENT,
});

export const resetActionCreator = () => ({
  type: RESET,
});
