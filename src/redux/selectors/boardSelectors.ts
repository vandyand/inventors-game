import { createSelector } from "reselect";
import type { Board } from "../../components/Board";
import { alphabet } from "../../helpers/alphabet";

const getBoards = (state: any) => state.boards;
const getGameTypes = (state: any) => state.gameTypes;
const getCurrentGameTypeCode = (state: any) => state.currentGame.code;

export const getBoardSizeByGameType = createSelector(
  getBoards,
  getGameTypes,
  getCurrentGameTypeCode,
  (
    boards: Array<Board>,
    gameTypes: Array<any>,
    currentGameTypeCode: string
  ) => {
    const gameType = gameTypes.filter(
      (gameType: any) => gameType.code === currentGameTypeCode
    )[0];
    return boards
      .filter((board: any) => board.code === gameType.boardCode)
      .pop().size;
  }
);

export const getRowColumnCodes = createSelector(
  getBoardSizeByGameType,
  (boardSize: Array<number>) => {
    return {
      rowCodes: [...Array(boardSize[0]).keys()].map(String),
      columnCodes: alphabet.slice(0, boardSize[1]),
    };
  }
);
