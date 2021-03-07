import { createSelector } from "reselect";
import { first, last } from "lodash";

const getGameTypes = (state: any) => state.gameTypes;
export const getCurrentGame = (state: any) => state.currentGame;
const getNewMovePiece = (state: any) => state.currentGame.newMove;
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
  getNewMovePiece,
  (pieces: Array<any>, newMovePiece: any) => {
    console.log(
      "getCurrentPromotion selector pieces, newMovePiece:",
      pieces,
      newMovePiece
    );
    const rtn = pieces
      .filter((piece) => piece.code === newMovePiece.piece.slice(1))
      .pop();

    console.log("piece getting promotion attribute:", rtn);
    return rtn ? rtn.promotion : "";
  }
);
