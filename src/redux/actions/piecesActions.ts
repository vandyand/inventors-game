import * as api from "../../api";
import { LOADING_PIECES, LOAD_PIECES_SUCCESS } from "../reducers/piecesReducer";

export function loadPiecesByCodes(codes): any {
  return (dispatch) => {
    dispatch({
      type: LOADING_PIECES,
      payload: true,
    });

    return api
      .getPiecesByCodes(codes)
      .then((response) => {
        dispatch({
          type: LOAD_PIECES_SUCCESS,
          payload: response,
        });
        dispatch({
          type: LOADING_PIECES,
          payload: false,
        });
      })
      .catch((err) => console.log(err.messge));
  };
}
