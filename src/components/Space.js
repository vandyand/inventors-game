import React from "react";
import "./Space.scss";

const Space = ({
  spaceCode,
  color,
  teamPiece,
  state,
  selectPieceReducer,
  pieceMoveReducer,
  attackMoveReducer,
  enPassantMoveReducer,
  castlingMoveReducer,
}) => {
  const pieceTeam = teamPiece ? teamPiece.charAt(0) : "";
  const currentGameType = state.gameTypes.filter(
    (gameType) => gameType.code === state.currentGame.code
  )[0];
  const currentBoard = state.boards
    .filter((board) => board.code === currentGameType.boardCode)
    .pop();
  const prevBoardAndPieces = state.currentGame.arrangementSequence
    .slice(-1)
    .pop();
  const newMovePieceInfo = state.currentGame.newMove.piece
    ? state.pieces
        .filter(
          (piece) => piece.code === state.currentGame.newMove.piece.slice(1)
        )
        .pop()
    : {};

  const currentSpacePieceInfo = teamPiece
    ? state.pieces.filter((piece) => piece.code === teamPiece.slice(1)).pop()
    : {};

  const flatMap = (xs, f) => xs.reduce((acc, x) => acc.concat(f(x)), []);

  const legalMove = () => {
    const currentPos = state.currentGame.newMove.from;
    const pieceMoveTypes =
      !newMovePieceInfo.movement.attackSameAsMove && attacking()
        ? newMovePieceInfo.movement.attackMoves
        : newMovePieceInfo.movement.possibleMoves;
    const possibleMoveSquares = flatMap(pieceMoveTypes, (moveType) => {
      if (moveType.includes("+")) {
        let moveTypes = [];
        for (let i = 1; i < 8; i++) {
          moveTypes.push(moveType.replace("+", "").repeat(i));
        }
        return moveTypes;
      }
      return moveType;
    })
      .map((moveType) => {
        const turnModifier = state.currentGame.whoseTurn === "A" ? 1 : -1;
        return adjacentPos(currentPos, moveType, turnModifier);
      })
      .filter((possibleMoveSquare) => possibleMoveSquare !== undefined);
    console.log({ possibleMoveSquares });

    return newMovePieceInfo.movement.canJump ||
      !jumpCondition(spaceCode, state.currentGame.newMove.from)
      ? possibleMoveSquares.includes(spaceCode)
      : false;
  };

  const attacking = () => {
    return prevBoardAndPieces.reduce((acc, pieceAndPos) => {
      if (pieceAndPos.slice(-2) === spaceCode) {
        return true;
      }
      return acc;
    }, false);
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
      ? (movement.split("f").length - 1) * invert
      : movement.includes("b")
      ? (movement.split("b").length - 1) * invert * -1
      : 0;
    const colIncDec = movement.includes("l")
      ? (movement.split("l").length - 1) * invert
      : movement.includes("r")
      ? (movement.split("r").length - 1) * invert * -1
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
      const numBetweenSquares = Math.abs(moveToCoord[1] - moveFromCoord[1]) - 1;
      for (let i = 0; i < numBetweenSquares; i++) {
        if (moveFromCoord[0] > moveToCoord[0]) {
          moveFromCoord = [moveFromCoord[0] - 1, moveFromCoord[1]];
        } else {
          moveFromCoord = [moveFromCoord[0] + 1, moveFromCoord[1]];
        }
        betweenPositions.add(coordToPos(moveFromCoord));
      }
    } else {
      const numBetweenSquares = Math.min(
        Math.abs(moveToCoord[0] - moveFromCoord[0]) - 1,
        Math.abs(moveToCoord[1] - moveFromCoord[1]) - 1
      );
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

  const handleClick = () => {
    if (state.currentGame.winner) {
      return;
    }
    if (state.currentGame.whoseTurn === pieceTeam) {
      selectPieceReducer(spaceCode, teamPiece);
    } else if (
      state.currentGame.newMove.piece && // piece has been selected
      pieceTeam !== state.currentGame.whoseTurn && // empty space or opponent space
      legalMove() // the move is legal
    ) {
      if (attacking()) {
        attackMoveReducer(spaceCode, teamPiece);
      } else {
        pieceMoveReducer(spaceCode, teamPiece);
      }
    }
  };

  return (
    <div className={`space ${color}-space`} onClick={handleClick}>
      {!!currentSpacePieceInfo && !!pieceTeam && (
        <img
          alt="blackKing"
          src={require(`../img/${pieceTeam}${currentSpacePieceInfo.img}.png`)}
          height="80px"
          width="80px"
        />
      )}
    </div>
  );
};

export default Space;
