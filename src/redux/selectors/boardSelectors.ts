import { createSelector } from "reselect";

const getBoards = (state: any) => state.boards;
const getGameTypes = (state: any) => state.gameTypes;
const getCurrentGameTypeCode = (state: any) => state.currentGame.code;

export const getBoardSizeByGameType = createSelector(
  getBoards,
  getGameTypes,
  getCurrentGameTypeCode,
  (boards: Array<any>, gameTypes: Array<any>, currentGameTypeCode: string) => {
    const gameType = gameTypes.filter(
      (gameType: any) => gameType.code === currentGameTypeCode
    )[0];
    return boards
      .filter((board: any) => board.code === gameType.boardCode)
      .pop().size;
  }
);
