// const GET_PIECES_STRENGTH: string = "GET_PIECES_STRENGTH";
export const LOAD_PIECES_SUCCESS = "LOAD_PIECES_SUCCESS";
export const LOADING_PIECES = "LOADING_PIECES";

export const piecesReducer = (state = [], action: any) => {
  switch (action.type) {
    case LOADING_PIECES: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case LOAD_PIECES_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    // case GET_PIECES_STRENGTH: {
    //   const scoredPieces = state.map((pieceInfo) => {
    //     const allMoves = new Set([
    //       ...pieceInfo.movement.possibleMoves,
    //       ...pieceInfo.movement.attackMoves,
    //     ]);
    //     const strength = Array.from(allMoves).reduce((acc, cur) => {
    //       if (!cur.includes("+")) {
    //         return acc + 1;
    //       } else if (cur.length === 3) {
    //         return acc + 2;
    //       } else {
    //         return acc + 3;
    //       }
    //     }, 0);

    //     const adjustedStrength = pieceInfo.movement.canJump
    //       ? strength * 1.2
    //       : strength;

    //     return {
    //       ...pieceInfo,
    //       strength: adjustedStrength,
    //     };
    //   });

    //   return [...scoredPieces];
    // }
    default:
      return state;
  }
};
