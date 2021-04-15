const api_url = "http://localhost:3001";

export const getBoards = async () => {
  return await window.fetch(`${api_url}/boards`).then((res) => {
    return res.json();
  });
};

export const getBoardById = (id: number) => {
  return window.fetch(`${api_url}/boards/${id}`).then((res) => {
    return res.json();
  });
};

export const getAllPieces = () => {
  return window.fetch(`${api_url}/pieces`).then((res) => {
    return res.json();
  });
};

export const getPiecesByIds = (ids) => {
  return window.fetch(`${api_url}/pieces/?ids=${ids.join(",")}`).then((res) => {
    return res.json();
  });
};

export const getPiecesByCodes = (codes) => {
  return window
    .fetch(`${api_url}/pieces/?codes=${codes.join(",")}`)
    .then((res) => {
      return res.json();
    });
};

export const getPieceById = (id: number) => {
  return window.fetch(`${api_url}/pieces/${id}`).then((res) => {
    return res.json();
  });
};

export const getGameTypes = () => {
  return window.fetch(`${api_url}/gameTypes`).then((res) => {
    return res.json();
  });
};

export const getGameTypeById = (id: number) => {
  return window.fetch(`${api_url}/gameTypes/${id}`).then((res) => {
    return res.json();
  });
};
