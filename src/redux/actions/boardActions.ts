import * as api from "../../api";
import { board } from "../../types/board";

// import type { board } from "../../components/game/Board";

export const SUBMIT_NEW_BOARD = "SUBMIT_NEW_BOARD";
export const LOAD_BOARD_SUCCESS = "LOAD_BOARD_SUCCESS";
export const LOADING_BOARD = "LOADING_BOARD";
export const LOADING_BOARDS = "LOADING_BOARDS";

export const getRowNum = (cellId, numCols) => Math.floor(cellId / numCols);

export const getColNum = (cellId, numRows) => cellId % numRows;

export const getBoardDimensions = (selectedCells, gridSize) => {
  if (!selectedCells) {
    return [0, 0];
  }
  const numGridRows = gridSize[1];
  const numGridCols = gridSize[0];
  const topRow = selectedCells.reduce((acc, cellId) => {
    const rowNum = getRowNum(cellId, numGridCols);
    if (rowNum < acc) {
      return rowNum;
    }
    return acc;
  }, Number.MAX_VALUE);
  const bottomRow = selectedCells.reduce((acc, cellId) => {
    const rowNum = getRowNum(cellId, numGridCols);
    if (rowNum > acc) {
      return rowNum;
    }
    return acc;
  }, Number.MIN_VALUE);
  const leftCol = selectedCells.reduce((acc, cellId) => {
    const colNum = getColNum(cellId, numGridRows);
    if (colNum < acc) {
      return colNum;
    }
    return acc;
  }, Number.MAX_VALUE);
  const rightCol = selectedCells.reduce((acc, cellId) => {
    const colNum = getColNum(cellId, numGridRows);
    if (colNum > acc) {
      return colNum;
    }
    return acc;
  }, Number.MIN_VALUE);

  return [bottomRow - topRow + 1, rightCol - leftCol + 1];
};

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
