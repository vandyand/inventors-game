import { INCREMENT, DECREMENT, RESET } from "./actionTypes";
import initialState from "./initialState";

const countReducer = (state = initialState, action) => {
  const currentGameType = state.gameTypes[state.currentGameType];
  const currentBoard = state.boards
    .filter((board) => board.code === currentGameType.boardCode)
    .pop();
  const prevBoardAndPieces = state.gameBoardAndPiecesSequence.slice(-1).pop();
  const currentPieceType = state.newMove.piece
    ? state.pieces
        .filter((piece) => piece.code === state.newMove.piece.slice(1))
        .pop()
    : {};

  const flatMap = (f, xs) => xs.reduce((acc, x) => acc.concat(f(x)), []);

  const legalMove = (whoseTurn) => {
    const currentPos = state.newMove.from;
    const pieceMoveTypes = currentPieceType.movement.possibleMoves;

    const possibleMoveSquares = flatMap((moveType) => {
      if (moveType.includes("+")) {
        let moveTypes = [];
        for (let i = 1; i < 8; i++) {
          moveTypes.push(moveType.replace("+", "").repeat(i));
        }
        return moveTypes;
      }
      return moveType;
    }, pieceMoveTypes)
      .map((moveType) => {
        const turnModifier = whoseTurn === "A" ? 1 : -1;
        return adjacentPos(currentPos, moveType, turnModifier);
      })
      .filter((possibleMoveSquare) => possibleMoveSquare !== undefined);
    console.log({ possibleMoveSquares });
    return possibleMoveSquares.includes(action.payload.code);
  };

  const getNewRow = (spaceCode, val) => {
    if (spaceCode) {
      const newRow = parseInt(spaceCode.charAt(1)) + val;
      if (
        newRow >= parseInt(currentBoard.rowCodes.slice(0, 1).pop()) &&
        newRow <= parseInt(currentBoard.rowCodes.slice(-1).pop())
      ) {
        return spaceCode.replace(spaceCode.charAt(1), String(newRow));
      }
    }
  };

  const getNewColumn = (spaceCode, val) => {
    if (spaceCode) {
      const newColSymbolNum = spaceCode.charCodeAt(0) + val;
      if (
        newColSymbolNum >=
          currentBoard.columnCodes.slice(0, 1).pop().charCodeAt(0) &&
        newColSymbolNum <=
          currentBoard.columnCodes.slice(-1).pop().charCodeAt(0)
      ) {
        return spaceCode.replace(
          spaceCode.charAt(0),
          String.fromCharCode(newColSymbolNum)
        );
      }
    }
  };

  const adjacentPos = (pos, movement, invert) => {
    const rowIncDec = movement.includes("f")
      ? -1 * (movement.split("f").length - 1)
      : movement.includes("b")
      ? movement.split("b").length - 1
      : 0;
    const colIncDec = movement.includes("l")
      ? -1 * (movement.split("l").length - 1)
      : movement.includes("r")
      ? movement.split("r").length - 1
      : 0;
    return getNewRow(getNewColumn(pos, colIncDec), rowIncDec);
  };

  const jumpCondition = (moveTo, moveFrom) => {
    const betweenPositions = getBetweenPositions(moveTo, moveFrom);
    const piecePositions = new Set(
      prevBoardAndPieces.map((pieceAndSpace) => pieceAndSpace.slice(-2))
    );
    const intersection = new Set(
      [...betweenPositions].filter((x) => piecePositions.has(x))
    );
    return intersection.size !== 0;
  };

  const getBetweenPositions = (moveTo, moveFrom) => {
    let moveToCoord = posToCoord(moveTo);
    let moveFromCoord = posToCoord(moveFrom);
    let betweenPositions = new Set();
    if (moveToCoord[0] === moveFromCoord[0]) {
      const numBetweenSquares = Math.abs(moveToCoord[1] - moveFromCoord[1]) - 1;
      for (let i = 0; i < numBetweenSquares; i++) {
        if (moveFromCoord[1] > moveToCoord[1]) {
          moveFromCoord = [moveFromCoord[0], moveFromCoord[1] - 1];
        } else {
          moveFromCoord = [moveFromCoord[0], moveFromCoord[1] + 1];
        }
        betweenPositions.add(coordToPos(moveFromCoord));
      }
    } else if (moveToCoord[1] === moveFromCoord[1]) {
      if (moveFromCoord[0] > moveToCoord[0]) {
        moveFromCoord = [moveFromCoord[0] - 1, moveFromCoord[1]];
      } else {
        moveFromCoord = [moveFromCoord[0] + 1, moveFromCoord[1]];
      }
      betweenPositions.add(coordToPos(moveFromCoord));
    } else {
      const numBetweenSquares = Math.abs(moveToCoord[0] - moveFromCoord[0]) - 1;
      for (let i = 0; i < numBetweenSquares; i++) {
        if (moveToCoord[0] > moveFromCoord[0]) {
          if (moveToCoord[1] > moveFromCoord[1]) {
            moveFromCoord = [moveFromCoord[0] + 1, moveFromCoord[1] + 1];
          } else {
            moveFromCoord = [moveFromCoord[0] + 1, moveFromCoord[1] - 1];
          }
        } else {
          if (moveToCoord[1] > moveFromCoord[1]) {
            moveFromCoord = [moveFromCoord[0] - 1, moveFromCoord[1] + 1];
          } else {
            moveFromCoord = [moveFromCoord[0] - 1, moveFromCoord[1] - 1];
          }
        }
        betweenPositions.add(coordToPos(moveFromCoord));
      }
    }
    console.log({ betweenPositions });
    return betweenPositions;
  };

  const posToCoord = (pos) => {
    return pos.split("").map((posChar, ind) => {
      if (ind < 1) {
        return posChar.charCodeAt(0) - 97;
      }
      return parseInt(posChar) - 1;
    });
  };

  const coordToPos = (coord) => {
    return `${String.fromCharCode(coord[0] + 97)}${coord[1] + 1}`;
  };

  switch (action.type) {
    case "INC_CURRENT_BOARD_AND_PIECES_NUM": {
      let newCurrentBoardAndPiecesSeqNum = state.currentBoardAndPiecesSeqNum;
      if (
        newCurrentBoardAndPiecesSeqNum <
        state.gameBoardAndPiecesSequence.length - 1
      ) {
        newCurrentBoardAndPiecesSeqNum++;
      }
      return {
        ...state,
        currentBoardAndPiecesSeqNum: newCurrentBoardAndPiecesSeqNum,
      };
    }
    case "DEC_CURRENT_BOARD_AND_PIECES_NUM": {
      let newCurrentBoardAndPiecesSeqNum = state.currentBoardAndPiecesSeqNum;
      if (newCurrentBoardAndPiecesSeqNum > 0) {
        newCurrentBoardAndPiecesSeqNum--;
      }
      return {
        ...state,
        currentBoardAndPiecesSeqNum: newCurrentBoardAndPiecesSeqNum,
      };
    }
    case "MOVE_PIECE": {
      const whoseTurn =
        state.gameBoardAndPiecesMoves.length > 0
          ? state.gameBoardAndPiecesMoves.slice(-1).pop().charAt(0) === "A"
            ? "B"
            : "A"
          : "A";
      const pieceTeam = action.payload.piece
        ? action.payload.piece.charAt(0)
        : "";
      if (whoseTurn === pieceTeam) {
        return {
          ...state,
          newMove: {
            ...state.newMove,
            from: action.payload.code,
            piece: action.payload.piece,
          },
        };
      } else if (
        pieceTeam !== whoseTurn &&
        state.newMove.piece &&
        legalMove(whoseTurn) &&
        (currentPieceType.movement.canJump ||
          !jumpCondition(action.payload.code, state.newMove.from))
      ) {
        const pieceOldPos = `${state.newMove.piece}-${state.newMove.from}`;
        let pieceNewPos = `${state.newMove.piece}-${action.payload.code}`;
        // Promotion logic
        const lastRow = currentBoard.rowCodes.slice(-1).pop();
        const firstRow = currentBoard.rowCodes.slice(0, 1).pop();
        const currentPromotion = state.pieces
          .filter((piece) => piece.code === state.newMove.piece.slice(1))
          .pop().promotion;
        if (
          currentPromotion.conditionCode === "lr" &&
          ((whoseTurn === "A" && action.payload.code.includes(lastRow)) ||
            (whoseTurn === "B" && action.payload.code.includes(firstRow)))
        ) {
          pieceNewPos = `${whoseTurn}${currentPromotion.to}-${action.payload.code}`;
        }
        const newBoardAndPiecesMove = `${state.newMove.piece}-${state.newMove.from}>${action.payload.code}`;
        const newBoardAndPieces = [
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
        const winner =
          currentGameType.settings.winCondition.type === "annihilation"
            ? newBoardAndPieces[0].reduce((acc, curVal) => {
                if (curVal[0] === "A") {
                  return acc.replace("B", "");
                } else if (curVal[0] === "B") {
                  return acc.replace("A", "");
                }
                return acc;
              }, "AB")
            : currentGameType.settings.winCondition.type === "kill piece"
            ? newBoardAndPieces[0].reduce((acc, curVal) => {
                const team = curVal.split("-")[0][0];
                const piece = curVal.split("-")[0].slice(1);
                if (piece === currentGameType.settings.winCondition.killPiece) {
                  return acc.replace(team === "A" ? "B" : "A", "");
                }
                return acc;
              }, "AB")
            : "";

        return {
          ...state,
          currentWinner: winner,
          gameBoardAndPiecesMoves: state.gameBoardAndPiecesMoves.concat(
            newBoardAndPiecesMove
          ),
          gameBoardAndPiecesSequence: state.gameBoardAndPiecesSequence.concat(
            newBoardAndPieces
          ),
          currentBoardAndPiecesSeqNum: state.currentBoardAndPiecesSeqNum + 1,
          newMove: {
            to: "",
            from: "",
            piece: "",
          },
        };
      }
      return state;
    }

    case "STARTUP_LOAD_GAME": {
      return {
        ...state,
        gameBoardAndPiecesSequence: state.gameBoardAndPiecesSequence.concat([
          currentGameType.startingPiecePositions,
        ]),
      };
    }

    case INCREMENT: {
      const newCount = state.count + 1;
      return {
        // ...state,
        count: newCount,
      };
    }
    case DECREMENT: {
      const newCount = state.count - 1;
      return {
        // ...state,
        count: newCount,
      };
    }
    case RESET: {
      const newCount = 0;
      return {
        // ...state,
        count: newCount,
      };
    }
    default:
      return state;
  }
};

export default countReducer;
