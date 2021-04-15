import * as api from "../../api";
import { LOADING_GAME_TYPE, LOAD_GAME_TYPE_SUCCESS } from "./actionTypes";

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

// export function loadGameTypes(): any {
//   return (dispatch) => {
//     dispatch({
//       type: LOADING_BOARD,
//       payload: true,
//     });

//     return api
//       .getBoard(id)
//       .then((response) => {
//         dispatch({
//           type: LOAD_BOARD_SUCCESS,
//           payload: response,
//         });
//         dispatch({
//           type: LOADING_BOARD,
//           payload: false,
//         });
//       })
//       .catch((err) => console.log(err.messge));
//   };
// }
