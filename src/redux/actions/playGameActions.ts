export const START_NEW_GAME = "START_NEW_GAME";

export function startNewGame(values) {
  return { type: START_NEW_GAME, payload: values };
}
