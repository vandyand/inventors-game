// import * as api from "../../api";
import { START_NEW_GAME } from "./actionTypes";

export function startNewGame(values) {
  return { type: START_NEW_GAME, payload: values };
}
