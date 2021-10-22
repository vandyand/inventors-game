import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="Main">
      <h1>Main Menu!</h1>
      <Link to="/Invent">Invent a game</Link>
      <br />
      <Link to="/Play">Play a game</Link>
    </div>
  );
};

export default Main;
