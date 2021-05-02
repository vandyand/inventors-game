// import * as api from "../../api";
import { START_NEW_GAME } from "./actionTypes";

export function startNewGame(values) {
  console.log("play new game action called");
  return { type: START_NEW_GAME, payload: values };
}
