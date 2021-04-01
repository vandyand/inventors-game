import { GET_PIECES_STRENGTH } from "../actions/actionTypes";

export const piecesReducer = (state = [], action: any) => {
  switch (action.type) {
    case GET_PIECES_STRENGTH: {
      const scoredPieces = state.map((pieceInfo) => {
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
