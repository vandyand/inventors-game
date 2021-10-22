import * as api from "../../api";
import { getBoardDimensions } from "../../helpers/boardHelpers";

import type { board } from "../../components/game/Board";

export const SUBMIT_NEW_BOARD = "SUBMIT_NEW_BOARD";
export const LOAD_BOARD_SUCCESS = "LOAD_BOARD_SUCCESS";
export const LOADING_BOARD = "LOADING_BOARD";
export const LOADING_BOARDS = "LOADING_BOARDS";

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

export function loadBoards(): any {
  return (dispatch) => {
    dispatch({ type: LOADING_BOARDS, payload: true });

    return api
      .getBoards()
      .then((response) => {
        dispatch({ type: LOAD_BOARD_SUCCESS, payload: response });
        dispatch({ type: LOADING_BOARDS, payload: false });
      })
      .catch((err) => console.log(err.message));
  };
}

export function createNewBoard(values) {
  const newBoard: board = {
    id: "12",
    name: "board-12",
    code: "b-12",
    gridTypeId: 1,
    gridType: values.gridType,
    size: getBoardDimensions(values.selectedCells, [12, 12]),
  };

  return { type: SUBMIT_NEW_BOARD, payload: newBoard };
}
