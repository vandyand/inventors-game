import React from "react";
import { connect } from "react-redux";
// import Game from "./components/game/Game.container";
import { LOAD_GAME, GET_PIECES_STRENGTH } from "./redux/actions/actionTypes";
// import { useComponentWillMount } from "./helpers";
import "./app.scss";

import { Route, BrowserRouter as Router } from "react-router-dom";
import Main from "./components/pages/Main";
import Play from "./components/pages/Play";
import Game from "./components/game/Game";
import InventGame from "./components/pages/InventGame";
import InventBoard from "./components/invent/InventBoard.container";
import Grid from "./components/grids/Grid";
import InventPieces from "./components/invent/Pieces";
import Life from "./components/secret/Life";

const App = ({ onLoadGame, onGetPiecesStrength, state }) => {
  console.log("state:", state);
  return (
    <Router>
      <div>
        <Route path="/" exact component={Main} />
        <Route path="/Play" exact component={Play} />
        <Route path="/Game" exact component={Game} />
        <Route path="/Invent" exact component={InventGame} />
        <Route path="/Invent/Board" exact component={InventBoard} />
        <Route path="/Invent/Grid" exact component={Grid} />
        <Route path="/Invent/Pieces" exact component={InventPieces} />
        <Route path="/Secret/Life" exact component={Life} />
      </div>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onLoadGame: () => dispatch({ type: LOAD_GAME }),
  onGetPiecesStrength: () => dispatch({ type: GET_PIECES_STRENGTH }),
});

export default connect((state) => {
  return { state };
}, mapDispatchToProps)(App);
