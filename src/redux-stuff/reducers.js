import { INCREMENT, DECREMENT, RESET } from "./actionTypes";
import initialState from "./initialState";

const countReducer = (state = initialState, action) => {
  const currentGameType = state.gameTypes[state.currentGameType];

  const legalMove = (whoseTurn) => {
    const currentPos = state.newMove.from;

    const currentPiece = currentGameType.pieces
      .filter((piece) => piece.code === state.newMove.piece.slice(1))
      .pop();

    console.log({ currentPiece });
    const pieceMoveTypes = currentPiece.movement.possibleMoves;

    console.log({ pieceMoveTypes });

    const possibleMoveSquares = pieceMoveTypes.map((moveType) => {
      let newPossibleMoveSquare = currentPos;

      moveType.split("").map((moveTypeChar) => {
        const turnModifier = whoseTurn === "A" ? 1 : -1;
        const foreBackModifier =
          moveTypeChar === "f" ? 1 : moveTypeChar === "b" ? -1 : 0;
        const leftRightModifier =
          moveTypeChar === "r" ? 1 : moveTypeChar === "l" ? -1 : 0;
        switch (moveTypeChar) {
          case "f":
          case "b": {
            newPossibleMoveSquare = newPossibleMoveSquare.replace(
              newPossibleMoveSquare.charAt(1),
              String(
                parseInt(newPossibleMoveSquare.charAt(1)) +
                  turnModifier * foreBackModifier
              )
            );
            return newPossibleMoveSquare;
          }
          case "l":
          case "r": {
            newPossibleMoveSquare = newPossibleMoveSquare.replace(
              newPossibleMoveSquare.charAt(0),
              String.fromCharCode(
                newPossibleMoveSquare.charCodeAt(0) +
                  turnModifier * leftRightModifier
              )
            );

            return newPossibleMoveSquare;
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
        const prevBoardAndPieces = state.gameBoardAndPiecesSequence
          .slice(-1)
          .pop();

        const pieceOldPos = `${state.newMove.piece}-${state.newMove.from}`;
        let pieceNewPos = `${state.newMove.piece}-${action.payload.code}`;
        const lastRow = currentGameType.board.rows.slice(-1).pop();
        const firstRow = currentGameType.board.rows.slice(0, 1).pop();

        if (
          // Promotion logic
          currentGameType.pieces
            .filter((piece) => piece.code === state.newMove.piece.slice(1))
            .pop().promotion.conditionCode === "lr" &&
          ((whoseTurn === "A" && action.payload.code.includes(lastRow)) ||
            (whoseTurn === "B" && action.payload.code.includes(firstRow)))
        ) {
          pieceNewPos = `${whoseTurn}${
            currentGameType.pieces
              .filter((piece) => piece.code === state.newMove.piece.slice(1))
              .pop().promotion.to
          }-${action.payload.code}`;
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

        return {
          ...state,
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
