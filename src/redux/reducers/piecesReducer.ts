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

    default:
      return state;
  }
};
