import { first, last } from "lodash";
import {
  getCurrentGameType,
  getCurrentBoardRowCodes,
  getCurrentPromotion,
  getCurrentGame,
} from "../selectors/gameEngineSelectors";
import { PIECE_MOVE } from "./actionTypes";

export const calculateMove = (state: any, code: string) => {
  const currentGame = getCurrentGame(state);

  return {
    ...currentGame,
    moves: currentGame.moves.concat(getNewMoveCode(state, code)),
    arrangementSequence: currentGame.arrangementSequence.concat(
      getNewArrangement(state, code)
    ),
    currentArrangementSeqNum: currentGame.currentArrangementSeqNum + 1,
    newMove: {
      to: "",
      from: "",
      piece: "",
    },
    winner: getWinner(state, code),
    whoseTurn: currentGame.whoseTurn === "A" ? "B" : "A",
  };
};

const getNewMoveCode = (state: any, code: string) =>
  `${getCurrentGame(state).newMove.piece}-${
    getCurrentGame(state).newMove.from
  }>${code}`;

const getNewArrangement = (state: any, code: string) => {
  const currentGame = getCurrentGame(state);

  const prevArrangement: any = last(currentGame.arrangementSequence);
  const prevPiecePos = `${currentGame.newMove.piece}-${currentGame.newMove.from}`;
  const updatedPiecePos = getUpdatedPiecePos(state, code);

  console.log(prevArrangement, currentGame);

  if (!updatedPiecePos) {
    return [];
  }

  return [
    prevArrangement
      .filter(
        (piecePos: string) => updatedPiecePos.slice(-2) !== piecePos.slice(-2)
      ) // Capturing logic
      .map((piecePos: string) => {
        if (piecePos === prevPiecePos) {
          return updatedPiecePos;
        }
        return piecePos;
      }),
  ];
};

const getUpdatedPiecePos = (state: any, code: string) => {
  if (!code) {
    return;
  }

  const currentGame = getCurrentGame(state);
  const currentBoardRowCodes = getCurrentBoardRowCodes(state);
  const currentPromotion = getCurrentPromotion(state);

  let updatedPiecePos = `${currentGame.newMove.piece}-${code}`;
  let promoteAfterFirstMovePawn = currentPromotion.conditionCode === "nfm";

  // Promotion logic
  const lastRow: string = last(currentBoardRowCodes) || "";
  const firstRow: string = first(currentBoardRowCodes) || "";

  if (promoteAfterFirstMovePawn) {
    updatedPiecePos = `${currentGame.whoseTurn}${currentPromotion.to}-${code}`;
  } else if (
    currentPromotion.conditionCode === "lr" &&
    ((currentGame.whoseTurn === "A" && code.includes(lastRow)) ||
      (currentGame.whoseTurn === "B" && code.includes(firstRow)))
  ) {
    updatedPiecePos = `${currentGame.whoseTurn}${currentPromotion.to}-${code}`;
  }

  return updatedPiecePos;
};

// Winner logic
const getWinner = (state: any, code: string) => {
  return getCurrentGameType(state).settings.winCondition.type === "annihilation"
    ? getNewArrangement(state, code)[0].reduce(
        (acc: string, curVal: string) => {
          if (curVal[0] === "A") {
            return acc.replace("B", "");
          } else if (curVal[0] === "B") {
            return acc.replace("A", "");
          }
          return acc;
        },
        "AB"
      )
    : getCurrentGameType(state).settings.winCondition.type === "kill piece"
    ? getNewArrangement(state, code)[0].reduce(
        (acc: string, curVal: string) => {
          const team = curVal.split("-")[0][0];
          const piece = curVal.split("-")[0].slice(1);
          if (
            piece === getCurrentGameType(state).settings.winCondition.killPiece
          ) {
            return acc.replace(team === "A" ? "B" : "A", "");
          }
          return acc;
        },
        "AB"
      )
    : "";
};

export const onPieceMoveActionCreator = (state, code: string) => ({
  type: PIECE_MOVE,
  payload: calculateMove(state, code),
});
