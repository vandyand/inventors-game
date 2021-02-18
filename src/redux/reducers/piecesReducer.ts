import { pieces } from "../initialStates/pieces";

export const piecesReducer = (state = pieces, action: any) => {
  switch (action.type) {
    case "GET_PIECES_STRENGTH": {
      const scoredPieces = pieces.map((pieceInfo) => {
        const allMoves = new Set([
          ...pieceInfo.movement.possibleMoves,
          ...pieceInfo.movement.attackMoves,
        ]);
        const strength = Array.from(allMoves).reduce((acc, cur) => {
          if (!cur.includes("+")) {
            return acc + 1;
          } else if (cur.length === 3) {
            return acc + 2;
          } else {
            return acc + 3;
          }
        }, 0);

        const adjustedStrength = pieceInfo.movement.canJump
          ? strength * 1.2
          : strength;

        return {
          ...pieceInfo,
          strength: adjustedStrength,
        };
      });

      return [...scoredPieces];
    }
    default:
      return state;
  }
};
