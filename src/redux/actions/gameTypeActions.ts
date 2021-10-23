import * as api from "../../api";

export const LOADING_GAME_TYPE = "LOADING_GAME_TYPE";
export const LOAD_GAME_TYPE_SUCCESS = "LOAD_GAME_TYPE_SUCCESS";

export function loadGameType(id): any {
  return (dispatch) => {
    dispatch({
      type: LOADING_GAME_TYPE,
      payload: true,
    });

    return api
      .getGameTypeById(id)
      .then((response) => {
        dispatch({
          type: LOAD_GAME_TYPE_SUCCESS,
          payload: response,
        });
        dispatch({
          type: LOADING_GAME_TYPE,
          payload: false,
        });
      })
      .catch((err) => console.log(err.messge));
  };
}
