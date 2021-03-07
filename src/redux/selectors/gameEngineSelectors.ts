import { createSelector } from "reselect";
import { first, last } from "lodash";

const getGameTypes = (state: any) => state.gameTypes;
export const getCurrentGame = (state: any) => state.currentGame;
const getBoards = (state: any) => state.boards;
const getPieces = (state: any) => state.pieces;

export const getCurrentGameType = createSelector(
  getGameTypes,
  getCurrentGame,
  (gameTypes: Array<any>, currentGame: any) =>
    first(gameTypes.filter((gameType) => gameType.code === currentGame.code))
);

export const getCurrentBoardRowCodes = createSelector(
  getBoards,
  getCurrentGameType,
  (boards: Array<any>, currentGameType: any) =>
    last(boards.filter((board) => board.code === currentGameType.boardCode))
      .rowCodes
);

export const getCurrentPromotion = createSelector(
  getPieces,
  getCurrentGame,
  (pieces: Array<any>, currentGame: any) =>
    pieces
      .filter((piece) => piece.code === currentGame.newMove.piece.slice(1))
      .pop().promotion
);
