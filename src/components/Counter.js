import React from "react";
import { connect } from "react-redux";
import {
  incrementActionCreator,
  decrementActionCreator,
  resetActionCreator,
} from "../redux-stuff/actions";

const Counter = ({ count, increment, decrement, reset }) => {
  return (
    <div>
      hello from counter!
      <br />
      <button onClick={increment}>+</button>
      <br />
      <button onClick={decrement}>-</button>
      <br />
      <button onClick={reset}>0</button>
      <br />
      {count}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(incrementActionCreator()),
  decrement: () => dispatch(decrementActionCreator()),
  reset: () => dispatch(resetActionCreator()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
