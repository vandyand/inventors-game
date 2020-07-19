import { INCREMENT, DECREMENT, RESET } from "./actionTypes";
import initialState from "./initialState";

const countReducer = (state = initialState, action) => {
  const legalMove = (whoseTurn) => {
    // const pieceType = state.currentMove.piece.slice(1);
    const currentPos = state.currentMove.from.split("");
    const pieceMoveTypes =
      state.gameTypes[state.currentGameType].pieces[0].movement.possibleMoves; // todo - search for piece type (not just [0])

    console.log({ pieceMoveTypes });

    const possibleMoveSquares = pieceMoveTypes.map((moveType) => {
      const newPossibleMoveSquare = currentPos;
      moveType.split("").map((moveTypeChar) => {
        console.log({ moveTypeChar });
        switch (moveTypeChar) {
          case "f": {
            if (whoseTurn === "A") {
              newPossibleMoveSquare[1] = String(
                parseInt(newPossibleMoveSquare[1]) + 1
              );
            } else {
              newPossibleMoveSquare[1] = String(
                parseInt(newPossibleMoveSquare[1]) - 1
              );
            }
            return newPossibleMoveSquare.join("");
          }
          case "b": {
            if (whoseTurn === "A") {
              newPossibleMoveSquare[1] = String(
                parseInt(newPossibleMoveSquare[1]) - 1
              );
            } else {
              newPossibleMoveSquare[1] = String(
                parseInt(newPossibleMoveSquare[1]) + 1
              );
            }
            return newPossibleMoveSquare.join("");
          }
          case "l": {
            if (whoseTurn === "A") {
              newPossibleMoveSquare[0] = String.fromCharCode(
                newPossibleMoveSquare[0].charCodeAt(0) - 1
              );
            } else {
              newPossibleMoveSquare[0] = String.fromCharCode(
                newPossibleMoveSquare[0].charCodeAt(0) + 1
              );
            }
            return newPossibleMoveSquare.join("");
          }
          case "r": {
            if (whoseTurn === "A") {
              newPossibleMoveSquare[0] = String.fromCharCode(
                newPossibleMoveSquare[0].charCodeAt(0) + 1
              );
            } else {
              newPossibleMoveSquare[0] = String.fromCharCode(
                newPossibleMoveSquare[0].charCodeAt(0) - 1
              );
            }
            return newPossibleMoveSquare.join("");
          }
          default: {
            break;
          }
        }
        return newPossibleMoveSquare;
      });
      return newPossibleMoveSquare;
    });

    console.log({ possibleMoveSquares });

    return possibleMoveSquares.includes(action.payload.code);
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
        state.gameBoardAndPiecesMoves.slice(-1).pop().charAt(0) === "A"
          ? "B"
          : "A";
      const pieceTeam = action.payload.piece
        ? action.payload.piece.charAt(0)
        : "";

      if (whoseTurn === pieceTeam) {
        return {
          ...state,
          currentMove: {
            ...state.currentMove,
            from: action.payload.code,
            piece: action.payload.piece,
          },
        };
      } else if (
        pieceTeam !== whoseTurn &&
        state.currentMove.piece &&
        legalMove(whoseTurn)
      ) {
        const prevBoardAndPieces = state.gameBoardAndPiecesSequence
          .slice(-1)
          .pop();

        const pieceOldPos = `${state.currentMove.piece}-${state.currentMove.from}`;
        const pieceNewPos = `${state.currentMove.piece}-${action.payload.code}`;

        const newMove = `${state.currentMove.piece}-${state.currentMove.from}>${action.payload.code}`;

        // const attackedPiece = prevBoardAndPieces.filter(piecePos => pieceNewPos === piecePos)

        const newBoardAndPieces = [
          prevBoardAndPieces
            .filter((piecePos) => pieceNewPos.slice(1) !== piecePos.slice(1))
            .map((piecePos) => {
              if (piecePos === pieceOldPos) {
                return pieceNewPos;
              }
              return piecePos;
            }),
        ];

        return {
          ...state,
          gameBoardAndPiecesMoves: state.gameBoardAndPiecesMoves.concat(
            newMove
          ),
          gameBoardAndPiecesSequence: state.gameBoardAndPiecesSequence.concat(
            newBoardAndPieces
          ),
          currentBoardAndPiecesSeqNum: state.currentBoardAndPiecesSeqNum + 1,
          currentMove: {
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
