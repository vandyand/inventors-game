import { API_URL } from "./config";
import { board } from "./types/GameComponents";

// import { board } from "./components/game/Board";

export const getBoards = async () => {
  return await window.fetch(`${API_URL}/boards`).then((res) => {
    return res.json();
  });
};

export const getBoardById = (id: number) => {
  return window.fetch(`${API_URL}/boards/${id}`).then((res) => {
    return res.json();
  });
};

export const createNewBoard = (newBoard: board) => {
  return window.fetch(`${API_URL}/boards`, {
    method: "POST",
    body: JSON.stringify(newBoard),
  });
};

export const getAllPieces = () => {
  return window.fetch(`${API_URL}/pieces`).then((res) => {
    return res.json();
  });
};

export const getPiecesByIds = (ids) => {
  return window.fetch(`${API_URL}/pieces/?ids=${ids.join(",")}`).then((res) => {
    return res.json();
  });
};

export const getPiecesByCodes = (codes) => {
  return window
    .fetch(`${API_URL}/pieces/?codes=${codes.join(",")}`)
    .then((res) => {
      return res.json();
    });
};

export const getPieceById = (id: number) => {
  return window.fetch(`${API_URL}/pieces/${id}`).then((res) => {
    return res.json();
  });
};

export const getGameTypes = () => {
  return window.fetch(`${API_URL}/gameTypes`).then((res) => {
    return res.json();
  });
};

export const getGameTypeById = (id: number) => {
  return window.fetch(`${API_URL}/gameTypes/${id}`).then((res) => {
    return res.json();
  });
};
