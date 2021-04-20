import React from "react";
import { Link } from "react-router-dom";

const InventGame = () => {
  return (
    <div className="InventGame">
      <h1>Invent a game here </h1>
      <Link to="/Invent/Board">Invent a board here</Link>
      <br />
      <Link to="/Invent/Pieces">Invent pieces here</Link>
    </div>
  );
};

export default InventGame;
