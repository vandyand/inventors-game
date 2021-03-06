import { connect } from "react-redux";
import { Dispatch } from "redux";
import GameEngine from "./gameEngine";
import { currentGame } from "../redux/initialStates/currentGame";
import { boards } from "../redux/initialStates/boards";
import { gameTypes } from "../redux/initialStates/gameTypes";
import { pieces } from "../redux/initialStates/pieces";
import {
  SELECT_PIECE,
  CALCULATE_POSSIBLE_MOVES,
  PIECE_MOVE,
} from "../redux/actions/actionTypes";

const currentGameType = gameTypes.filter(
  (gameType) => gameType.code === currentGame.code
)[0];

const currentBoard = boards
  .filter((board) => board.code === currentGameType.boardCode)
  .pop();

const currentPiece = pieces
  .filter((piece) => piece.code === currentGame.newMove.piece.slice(1))
  .pop();

const currentPromotion = currentPiece && currentPiece.promotion;

const calculateMove = (code: string) => {
  return {
    ...currentGame,
    moves: currentGame.moves.concat(getNewMoveCode(code)),
    arrangementSequence: currentGame.arrangementSequence.concat(
      getNewArrangement(code)
    ),
    currentArrangementSeqNum: currentGame.currentArrangementSeqNum + 1,
    newMove: {
      to: "",
      from: "",
      piece: "",
    },
    winner: getWinner(code),
    whoseTurn: currentGame.whoseTurn === "A" ? "B" : "A",
  };
};

const getNewMoveCode = (code: string) =>
  `${currentGame.newMove.piece}-${currentGame.newMove.from}>${code}`;

const getNewArrangement = (code: string) => {
  const prevArrangement = currentGame.arrangementSequence.slice(-1).pop();
  const prevPiecePos = `${currentGame.newMove.piece}-${currentGame.newMove.from}`;
  const updatedPiecePos = getUpdatedPiecePos(code);

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

const getUpdatedPiecePos = (code: string) => {
  if (!code) {
    return;
  }

  let updatedPiecePos = `${currentGame.newMove.piece}-${code}`;

  let promoteAfterFirstMovePawn =
    currentPromotion && currentPromotion.conditionCode === "nfm";

  // Promotion logic
  const lastRow: string =
    (currentBoard && currentBoard.rowCodes.slice(-1).pop()) || "";
  const firstRow: string =
    (currentBoard && currentBoard.rowCodes.slice(0, 1).pop()) || "";

  if (promoteAfterFirstMovePawn) {
    updatedPiecePos = `${currentGame.whoseTurn}${
      currentPromotion && currentPromotion.to
    }-${code}`;
  } else if (
    currentPromotion &&
    currentPromotion.conditionCode === "lr" &&
    ((currentGame.whoseTurn === "A" && code.includes(lastRow)) ||
      (currentGame.whoseTurn === "B" && code.includes(firstRow)))
  ) {
    updatedPiecePos = `${currentGame.whoseTurn}${currentPromotion.to}-${code}`;
  }

  return updatedPiecePos;
};

// Winner logic
const getWinner = (code: string) => {
  return currentGameType.settings.winCondition.type === "annihilation"
    ? getNewArrangement(code)[0].reduce((acc: string, curVal: string) => {
        if (curVal[0] === "A") {
          return acc.replace("B", "");
        } else if (curVal[0] === "B") {
          return acc.replace("A", "");
        }
        return acc;
      }, "AB")
    : currentGameType.settings.winCondition.type === "kill piece"
    ? getNewArrangement(code)[0].reduce((acc: string, curVal: string) => {
        const team = curVal.split("-")[0][0];
        const piece = curVal.split("-")[0].slice(1);
        if (piece === currentGameType.settings.winCondition.killPiece) {
          return acc.replace(team === "A" ? "B" : "A", "");
        }
        return acc;
      }, "AB")
    : "";
};

const mapStateToProps = (state: any) => ({
  state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSelectPiece: (code: string, piece: string) =>
    dispatch({
      type: SELECT_PIECE,
      payload: { code, piece },
    }),
  onSetPossibleMoves: (possibleMoves: Array<any>) =>
    dispatch({
      type: CALCULATE_POSSIBLE_MOVES,
      payload: possibleMoves,
    }),
  onPieceMove: (code: string, piece: string) =>
    dispatch({
      type: PIECE_MOVE,
      payload: calculateMove(code),
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameEngine);
