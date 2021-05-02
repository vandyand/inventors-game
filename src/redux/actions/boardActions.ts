import * as api from "../../api";
import {
  LOADING_BOARD,
  LOAD_BOARD_SUCCESS,
  SUBMIT_NEW_BOARD,
} from "./actionTypes";
import { getBoardDimensions } from "../../helpers/boardHelpers";

import type { board } from "../../components/game/Board";

export function loadBoard(id): any {
  return (dispatch) => {
    dispatch({
      type: LOADING_BOARD,
      payload: true,
    });

    return api
      .getBoardById(id)
      .then((response) => {
        dispatch({
          type: LOAD_BOARD_SUCCESS,
          payload: response,
        });
        dispatch({
          type: LOADING_BOARD,
          payload: false,
        });
      })
      .catch((err) => console.log(err.messge));
  };
}

export function createNewBoard(values) {
  const newBoard: board = {
    id: "12",
    name: "board-12",
    code: "b-12",
    gridTypeId: 1,
    size: getBoardDimensions(values.selectedCells, [12, 12]),
  };

  return { type: SUBMIT_NEW_BOARD, payload: newBoard };
}
