const moveFuncs = (
  state: any,
  funcToCall: string,
  spaceCode: string,
  teamPiece: string
) => {
  const currentGameType = state.gameTypes.filter(
    (gameType: any) => gameType.code === state.currentGame.code
  )[0];

  const currentBoardType = state.boards
    .filter((board: any) => board.code === currentGameType.boardCode)
    .pop();

  const prevBoardAndPieces = state.currentGame.arrangementSequence
    .slice(-1)
    .pop();

  const flatMap = (xs: Array<any>, f: any) =>
    xs.reduce((acc, x) => acc.concat(f(x)), []);

  const newMovePieceInfo = teamPiece
    ? state.pieces
        .filter((piece: any) => piece.code === teamPiece.slice(1))
        .pop()
    : {};

  const getLegalMoves = () => {
    let possibleMoveSpaces = getPossibleMoveSpaces("move");
    const possibleAttackSpaces = getPossibleMoveSpaces("attack");
    possibleMoveSpaces = possibleMoveSpaces.concat(possibleAttackSpaces);
    return possibleMoveSpaces;
  };

  const getPossibleMoveSpaces = (moveNotAttack: string) => {
    const currentPos = spaceCode;
    const pieceMoveTypes =
      moveNotAttack === "move" || newMovePieceInfo.movement.attackSameAsMove
        ? newMovePieceInfo.movement.possibleMoves
        : newMovePieceInfo.movement.attackMoves;
    const possibleSpaces = flatMap(pieceMoveTypes, (moveType: string) => {
      if (moveType.includes("+")) {
        let moveTypes = [];
        for (let i = 1; i < 8; i++) {
          moveTypes.push(moveType.replace("+", "").repeat(i));
        }
        return moveTypes;
      } else {
        return moveType;
      }
    })
      .map((moveType: string) => {
        const turnModifier = state.currentGame.whoseTurn === "A" ? 1 : -1;
        return adjacentPos(currentPos, moveType, turnModifier);
      })
      .filter((possibleSpace: string) => possibleSpace !== undefined)
      .filter((possibleSpace: string) => squareAvailable(possibleSpace))
      .filter(
        (possibleSpace: string) => !jumpCondition(possibleSpace, currentPos)
      )
      .filter(
        (possibleSpace: string) =>
          moveNotAttack !== "move" || !enemyOnSpace(possibleSpace)
      )
      .filter(
        (possibleSpace: string) =>
          moveNotAttack !== "attack" || enemyOnSpace(possibleSpace)
      );
    return possibleSpaces;
  };

  const enemyOnSpace = (spaceCode: string) => {
    const pieceOnSpace = getPieceOnSpace(spaceCode);
    return (
      pieceOnSpace.charAt(0) &&
      pieceOnSpace.charAt(0) !== state.currentGame.whoseTurn
    );
  };

  const squareAvailable = (spaceCode: string) => {
    const pieceOnSpace = getPieceOnSpace(spaceCode);
    return pieceOnSpace.charAt(0) !== state.currentGame.whoseTurn;
  };

  const getPieceOnSpace = (spaceCode: string) => {
    const spaceFromArrangement = prevBoardAndPieces.filter(
      (teamPieceSpace: string) => teamPieceSpace.includes(spaceCode)
    )[0];
    if (spaceFromArrangement && spaceFromArrangement.length > 2) {
      return spaceFromArrangement.split("-")[0];
    } else {
      return "";
    }
  };

  // const attacking = (spaceCode) => {
  //   return prevBoardAndPieces.reduce((acc, pieceAndPos) => {
  //     if (pieceAndPos.slice(-2) === spaceCode) {
  //       return true;
  //     }
  //     return acc;
  //   }, false);
  // };

  const getNewRow = (spaceCode: string | undefined, val: number) => {
    if (spaceCode) {
      const newRow = parseInt(spaceCode.charAt(1)) + val;
      if (
        newRow >= parseInt(currentBoardType.rowCodes.slice(0, 1).pop()) &&
        newRow <= parseInt(currentBoardType.rowCodes.slice(-1).pop())
      ) {
        return spaceCode.replace(spaceCode.charAt(1), String(newRow));
      }
    }
  };

  const getNewColumn = (spaceCode: string | undefined, val: number) => {
    if (spaceCode) {
      const newColSymbolNum = spaceCode.charCodeAt(0) + val;
      if (
        newColSymbolNum >=
          currentBoardType.columnCodes.slice(0, 1).pop().charCodeAt(0) &&
        newColSymbolNum <=
          currentBoardType.columnCodes.slice(-1).pop().charCodeAt(0)
      ) {
        return spaceCode.replace(
          spaceCode.charAt(0),
          String.fromCharCode(newColSymbolNum)
        );
      }
    }
  };

  const adjacentPos = (pos: string, movement: string, invert: number) => {
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

  const jumpCondition = (moveTo: string, moveFrom: string) => {
    const betweenPositions = getBetweenPositions(moveTo, moveFrom);
    const piecePositions = new Set(
      prevBoardAndPieces.map((pieceAndSpace: string) => pieceAndSpace.slice(-2))
    );
    const intersection = new Set(
      [...betweenPositions].filter((x) => piecePositions.has(x))
    );
    return !newMovePieceInfo.movement.canJump && intersection.size !== 0;
  };

  const getBetweenPositions = (moveTo: string, moveFrom: string) => {
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
      const numBetweenSquares = Math.abs(moveToCoord[0] - moveFromCoord[0]) - 1;
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
    return betweenPositions;
  };

  const posToCoord = (pos: string) => {
    return pos.split("").map((posChar, ind) => {
      if (ind < 1) {
        return posChar.charCodeAt(0) - 97;
      } else {
        return parseInt(posChar) - 1;
      }
    });
  };

  const coordToPos = (coord: Array<number>) => {
    return `${String.fromCharCode(coord[0] + 97)}${coord[1] + 1}`;
  };

  if (funcToCall === "getLegalMoves") {
    return getLegalMoves();
  } else {
    return;
  }
};

export default moveFuncs;
