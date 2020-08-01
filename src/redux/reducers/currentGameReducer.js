import { currentGame, gameTypes, boards, pieces } from "../initialStates";

export const currentGameReducer = (state = currentGame, action) => {
  const currentGameType = gameTypes.filter(
    (gameType) => gameType.code === currentGame.code
  )[0];
  const whoseTurn =
    state.moves.length > 0
      ? state.moves.slice(-1).pop().charAt(0) === "A"
        ? "B"
        : "A"
      : "A";
  const currentBoard = boards
    .filter((board) => board.code === currentGameType.boardCode)
    .pop();

  const prevBoardAndPieces = state.arrangementSequence.slice(-1).pop();
  const pieceOldPos = `${state.newMove.piece}-${state.newMove.from}`;
  let pieceNewPos = `${state.newMove.piece}-${action.payload.code}`;

  // Promotion logic
  const lastRow = currentBoard.rowCodes.slice(-1).pop();
  const firstRow = currentBoard.rowCodes.slice(0, 1).pop();
  const currentPromotion = pieces
    .filter((piece) => piece.code === state.newMove.piece.slice(1))
    .pop().promotion;
  if (
    currentPromotion.conditionCode === "nfm" ||
    (currentPromotion.conditionCode === "lr" &&
      ((whoseTurn === "A" && action.payload.code.includes(lastRow)) ||
        (whoseTurn === "B" && action.payload.code.includes(firstRow))))
  ) {
    pieceNewPos = `${whoseTurn}${currentPromotion.to}-${action.payload.code}`;
  }

  const getNewMoveCode = () =>
    `${state.newMove.piece}-${state.newMove.from}>${action.payload.code}`;

  const getNewArrangement = () => [
    prevBoardAndPieces
      .filter((piecePos) => pieceNewPos.slice(-2) !== piecePos.slice(-2)) // Capturing logic
      .map((piecePos) => {
        if (piecePos === pieceOldPos) {
          return pieceNewPos;
        }
        return piecePos;
      }),
  ];

  // Winner logic
  const getWinner = () => {
    return currentGameType.settings.winCondition.type === "annihilation"
      ? getNewArrangement()[0].reduce((acc, curVal) => {
          if (curVal[0] === "A") {
            return acc.replace("B", "");
          } else if (curVal[0] === "B") {
            return acc.replace("A", "");
          }
          return acc;
        }, "AB")
      : currentGameType.settings.winCondition.type === "kill piece"
      ? getNewArrangement()[0].reduce((acc, curVal) => {
          const team = curVal.split("-")[0][0];
          const piece = curVal.split("-")[0].slice(1);
          if (piece === currentGameType.settings.winCondition.killPiece) {
            return acc.replace(team === "A" ? "B" : "A", "");
          }
          return acc;
        }, "AB")
      : "";
  };

  switch (action.type) {
    case "STARTUP_LOAD_GAME": {
      return {
        ...currentGame,
        arrangementSequence: currentGame.arrangementSequence.concat([
          currentGameType.startingPiecePositions,
        ]),
      };
    }
    case "SELECT_PIECE": {
      return {
        ...state,
        newMove: {
          ...state.newMove,
          from: action.payload.code,
          piece: action.payload.piece,
        },
      };
    }
    case "PIECE_MOVE": {
      return {
        ...state,
        currentWinner: getWinner(),
        moves: state.moves.concat(getNewMoveCode()),
        arrangementSequence: state.arrangementSequence.concat(
          getNewArrangement()
        ),
        currentArrangementSeqNum: state.currentArrangementSeqNum + 1,
        newMove: {
          to: "",
          from: "",
          piece: "",
        },
        whoseTurn: whoseTurn === "A" ? "B" : "A",
      };
    }
    case "ATTACK_MOVE": {
      return {
        ...state,
        currentWinner: getWinner(),
        moves: state.moves.concat(getNewMoveCode()),
        arrangementSequence: state.arrangementSequence.concat(
          getNewArrangement()
        ),
        currentArrangementSeqNum: state.currentArrangementSeqNum + 1,
        newMove: {
          to: "",
          from: "",
          piece: "",
        },
        whoseTurn: whoseTurn === "A" ? "B" : "A",
      };
    }
    case "ENPASSANT_MOVE": {
      return state;
    }
    case "CASTLING_MOVE": {
      return state;
    }
    default:
      return state;
  }
};
