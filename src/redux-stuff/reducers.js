import { INCREMENT, DECREMENT, RESET } from "./actionTypes";
import initialState from "./initialState";

const countReducer = (state = initialState, action) => {
  const currentGameType = state.gameTypes[state.currentGameType];
  const currentBoard = state.boards
    .filter((board) => board.code === currentGameType.boardCode)
    .pop();
  const prevBoardAndPieces = state.gameBoardAndPiecesSequence.slice(-1).pop();

  const legalMove = (whoseTurn) => {
    const currentPos = state.newMove.from;

    const currentPiece = state.pieces
      .filter((piece) => piece.code === state.newMove.piece.slice(1))
      .pop();

    const pieceMoveTypes = currentPiece.movement.possibleMoves;

    const possibleMoveSquares = pieceMoveTypes.map((moveType) => {
      let newPossibleMoveSquare = currentPos;
      const turnModifier = whoseTurn === "A" ? 1 : -1;

      return adjacentPos(newPossibleMoveSquare, moveType, turnModifier);
    });

    console.log({ possibleMoveSquares });

    //Make sure it's not a jump condition or jumps are allowed.
    const filteredPossibleMoveSquares = possibleMoveSquares.filter(
      (moveSquare) =>
        currentPiece.movement.canJump || !jumpCondition(moveSquare, currentPos)
    );

    return filteredPossibleMoveSquares.includes(action.payload.code);
  };

  const adjacentPos = (pos, movement, invert) => {
    let newPos = pos;
    movement.split("").map((moveTypeChar) => {
      switch (moveTypeChar) {
        case "f": {
          newPos = newPos.replace(
            newPos.charAt(1),
            String(parseInt(newPos.charAt(1)) + invert)
          );
          return newPos;
        }
        case "b": {
          newPos = newPos.replace(
            newPos.charAt(1),
            String(parseInt(newPos.charAt(1)) - invert)
          );
          return newPos;
        }
        case "l": {
          newPos = newPos.replace(
            newPos.charAt(0),
            String.fromCharCode(newPos.charCodeAt(0) - invert)
          );
          return newPos;
        }
        case "r": {
          newPos = newPos.replace(
            newPos.charAt(0),
            String.fromCharCode(newPos.charCodeAt(0) + invert)
          );
          return newPos;
        }
        default: {
          break;
        }
      }
      return newPos;
    });
    return newPos;
  };

  const jumpCondition = (moveSquare, currentPos) => {
    return prevBoardAndPieces.reduce((acc, curVal, curInd, arr) => {
      const pos = curVal.slice(-2);
      if (between(pos, moveSquare, currentPos)) {
        return true;
      }
      return acc || false;
    }, false);
  };

  const between = (pos, moveTo, moveFrom) => {
    const posCoord = posToCoord(pos);
    const moveToCoord = posToCoord(moveTo);
    const moveFromCoord = posToCoord(moveFrom);
    if (
      ((posCoord[0] < moveToCoord[0] && posCoord[0] > moveFromCoord[0]) ||
        (posCoord[0] > moveToCoord[0] && posCoord[0] < moveFromCoord[0]) ||
        posCoord[0] === moveFromCoord[0]) &&
      ((posCoord[1] < moveToCoord[1] && posCoord[1] > moveFromCoord[1]) ||
        (posCoord[1] > moveToCoord[1] && posCoord[1] < moveFromCoord[1]) ||
        posCoord[1] === moveFromCoord[1]) &&
      (posCoord[0] !== moveFromCoord[0] || posCoord[1] !== moveFromCoord[1])
    ) {
      return true;
    }
    return false;
  };

  const posToCoord = (pos) => {
    return pos.split("").map((posChar, ind) => {
      if (ind < 1) {
        return posChar.charCodeAt(0) - 97;
      }
      return parseInt(posChar) - 1;
    });
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
        legalMove(whoseTurn)
      ) {
        const pieceOldPos = `${state.newMove.piece}-${state.newMove.from}`;
        let pieceNewPos = `${state.newMove.piece}-${action.payload.code}`;
        const lastRow = currentBoard.rowCodes.slice(-1).pop();
        const firstRow = currentBoard.rowCodes.slice(0, 1).pop();

        const currentPromotion = state.pieces
          .filter((piece) => piece.code === state.newMove.piece.slice(1))
          .pop().promotion;

        if (
          // Promotion logic
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

        const winner = newBoardAndPieces[0].reduce((acc, curVal) => {
          if (curVal[0] === "A") {
            return acc.replace("B", "");
          } else if (curVal[0] === "B") {
            return acc.replace("A", "");
          }
          return acc;
        }, "AB");

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

    case "MOVEPIECE": {
      return {
        ...state,
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
