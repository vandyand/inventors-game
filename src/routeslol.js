import React from "react";
import "./app.scss";

import { Route, BrowserRouter as Router } from "react-router-dom";
import Main from "./components/MainMenu";
import Play from "./components/play/Play";
import InventGame from "./components/invent/InventGame";
import InventBoard from "./components/invent/InventBoard";
import Grid from "./components/grids/Grid";
import InventPieces from "./components/invent/InventPieces";

const Routes = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Main} />
        <Route path="/Play" exact component={Play} />
        <Route path="/Invent" exact component={InventGame} />
        <Route path="/Invent/Board" exact component={InventBoard} />
        <Route path="/Invent/Grid" exact component={Grid} />
        <Route path="/Invent/Pieces" exact component={InventPieces} />
      </div>
    </Router>
  );
};

export default Routes;
