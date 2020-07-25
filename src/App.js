import React, { useRef } from "react";
import { connect } from "react-redux";
import Board from "./components/Board";
import Controls from "./components/Controls";
// import Counter from "./components/Counter";
import "./App.scss";

const useComponentWillMount = (func) => {
  const willMount = useRef(true);
  if (willMount.current) {
    func();
  }
  willMount.current = false;
};

const App = ({ startUpLoadGame, state }) => {
  useComponentWillMount(startUpLoadGame);

  console.log(state);
  return (
    <div className="app">
      <Board />
      <Controls />
      {state.currentWinner && `Team ${state.currentWinner} wins!`}
      {/* <Counter /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  startUpLoadGame: () => dispatch({ type: "STARTUP_LOAD_GAME" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
