export const getBoards = () => {
  return window.fetch("http://localhost:3001/boards").then((res) => {
    return res.json();
  });
};
