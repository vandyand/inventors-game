import { createSelector } from "reselect";
import { alphabet } from "../../helpers/alphabet";

const getBoards = (state: any) => state.boards;
const getGameTypes = (state: any) => state.gameTypes;
const getCurrentGameCode = (state: any) => state.currentGame.code;

export const getBoardSizeByGameType = createSelector(
  getBoards,
  getGameTypes,
  getCurrentGameCode,
  (boards: Array<any>, gameTypes: Array<any>, currentGameTypeCode: string) => {
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
