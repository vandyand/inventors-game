const api_url = "http://localhost:3001";

export const getBoards = async () => {
  return await window.fetch(`${api_url}/boards`).then((res) => {
    return res.json();
  });
};

export const getBoard = (id: number) => {
  return window.fetch(`${api_url}/boards/${id}`).then((res) => {
    return res.json();
  });
};

export const getPieces = () => {
  return window.fetch(`${api_url}/pieces`).then((res) => {
    return res.json();
  });
};

export const getPiece = (id: number) => {
  return window.fetch(`${api_url}/pieces/${id}`).then((res) => {
    return res.json();
  });
};

export const getGameTypes = () => {
  return window.fetch(`${api_url}/gameTypes`).then((res) => {
    return res.json();
  });
};

export const getGameType = (id: number) => {
  return window.fetch(`${api_url}/gameTypes/${id}`).then((res) => {
    return res.json();
  });
};
