import React from "react";
import { connect } from "react-redux";
import Board from "./components/Board";
import Controls from "./components/Controls";
// import Counter from "./components/Counter";
import "./App.scss";

const App = ({ state }) => {
  console.log(state);
  return (
    <div className="app">
      <Board />
      <Controls />
      {/* <Counter /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, null)(App);
