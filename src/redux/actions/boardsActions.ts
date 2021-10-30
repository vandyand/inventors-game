import * as api from "../../api";

export const CREATE_BOARD_SUCCESS = "CREATE_BOARD_SUCCESS";
export const LOAD_BOARD_SUCCESS = "LOAD_BOARD_SUCCESS";
export const LOAD_BOARDS_SUCCESS = "LOAD_BOARDS_SUCCESS";
export const LOAD_PIECE_SUCCESS = "LOAD_PIECE_SUCCESS";
export const LOAD_PIECES_SUCCESS = "LOAD_PIECES_SUCCESS";
export const LOADING_STATE = "LOADING_STATE";

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
      type: LOADING_STATE,
      payload: { loadingBoard: true },
    });

    return api
      .getBoardById(id)
      .then((response) => {
        dispatch({
          type: LOAD_BOARD_SUCCESS,
          payload: response,
        });
        dispatch({
          type: LOADING_STATE,
          payload: { loadingBoard: false },
        });
      })
      .catch((err) => console.log(err.messge));
  };
}

export function loadBoards(): any {
  return (dispatch) => {
    return api
      .getBoards()
      .then((res) => dispatch({ type: LOAD_BOARD_SUCCESS, payload: res }));
  };
}

// export function loadBoards(): any {
//   return async (dispatch) => {
//     dispatch({ type: LOADING_BOARDS, payload: true });

//     return api.getBoards().then((response) => {
//       dispatch({ type: LOAD_BOARD_SUCCESS, payload: response });
//       dispatch({ type: LOADING_BOARDS, payload: false });
//     });
//   };
// }

export function loadPieces(): any {
  return (dispatch) => {
    dispatch({ type: LOADING_STATE, payload: { loadingPieces: true } });

    return api.getAllPieces().then((response) => {
      dispatch({ type: LOAD_PIECES_SUCCESS, payload: response });
      dispatch({ type: LOADING_STATE, payload: { loadingPieces: false } });
    });
  };
}

export function createNewBoard(board) {
  return (dispatch) => {
    return api
      .createNewBoard(board)
      .then((newBoard) =>
        dispatch({ type: CREATE_BOARD_SUCCESS, payload: newBoard })
      );
  };
}
