import { currentGame, gameTypes } from "../initialStates";

export const currentGameReducer = (state = currentGame, action) => {
  switch (action.type) {
    case "STARTUP_LOAD_GAME": {
      const currentGameType = gameTypes.filter(
        (gameType) => gameType.code === currentGame.code
      )[0];
      console.log({ currentGameType });

      return {
        ...currentGame,
        arrangementSequence: currentGame.arrangementSequence.concat([
          currentGameType.startingPiecePositions,
        ]),
      };
    }
    default:
      return state;
  }
};
