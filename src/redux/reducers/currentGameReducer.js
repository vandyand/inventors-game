import { currentGame, gameTypes, boards, pieces } from "../initialStates";

export const currentGameReducer = (state = currentGame, action) => {
  const currentGameType = gameTypes.filter(
    (gameType) => gameType.code === state.code
  )[0];
  const currentBoard = boards
    .filter((board) => board.code === currentGameType.boardCode)
    .pop();

  const calculateMove = () => {
    return {
      ...state,
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
      winner: getWinner(),
      whoseTurn: state.whoseTurn === "A" ? "B" : "A",
    };
  };
  const getNewMoveCode = () =>
    `${state.newMove.piece}-${state.newMove.from}>${action.payload.code}`;

  const getNewArrangement = () => {
    const prevArrangement = state.arrangementSequence.slice(-1).pop();
    const prevPiecePos = `${state.newMove.piece}-${state.newMove.from}`;
    const updatedPiecePos = getUpdatedPiecePos();

    return [
      prevArrangement
        .filter((piecePos) => updatedPiecePos.slice(-2) !== piecePos.slice(-2)) // Capturing logic
        .map((piecePos) => {
          if (piecePos === prevPiecePos) {
            return updatedPiecePos;
          }
          return piecePos;
        }),
    ];
  };

  const getUpdatedPiecePos = () => {
    let updatedPiecePos = `${state.newMove.piece}-${action.payload.code}`;

    // Promotion logic
    const lastRow = currentBoard.rowCodes.slice(-1).pop();
    const firstRow = currentBoard.rowCodes.slice(0, 1).pop();
    const currentPromotion = pieces
      .filter((piece) => piece.code === state.newMove.piece.slice(1))
      .pop().promotion;
    if (
      currentPromotion.conditionCode === "nfm" ||
      (currentPromotion.conditionCode === "lr" &&
        ((state.whoseTurn === "A" && action.payload.code.includes(lastRow)) ||
          (state.whoseTurn === "B" && action.payload.code.includes(firstRow))))
    ) {
      updatedPiecePos = `${state.whoseTurn}${currentPromotion.to}-${action.payload.code}`;
    }

    return updatedPiecePos;
  };

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
        ...state,
        arrangementSequence: state.arrangementSequence.concat([
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
    case "CALCULATE_POSSIBLE_MOVES": {
      return {
        ...state,
        newMove: {
          ...state.newMove,
          possibleMoves: action.payload,
        },
      };
    }
    case "PIECE_MOVE": {
      return calculateMove();
    }
    case "UPDATE_CURRENT_ARRANGEMENT_SEQ_NUM": {
      let newCurrentArrangementSeqNum =
        state.currentArrangementSeqNum + action.payload;

      if (newCurrentArrangementSeqNum < 0) {
        newCurrentArrangementSeqNum = 0;
      }

      if (newCurrentArrangementSeqNum > state.arrangementSequence.length - 1) {
        newCurrentArrangementSeqNum = state.arrangementSequence.length - 1;
      }

      return {
        ...state,
        currentArrangementSeqNum: newCurrentArrangementSeqNum,
      };
    }
    default:
      return state;
  }
};
