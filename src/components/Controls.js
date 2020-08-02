import React from "react";
import { connect } from "react-redux";

const Controls = ({
  currentArrangementSeqNum,
  incCurrentArrangementNum,
  decCurrentArrangementNum,
}) => {
  return (
    <div>
      <button onClick={decCurrentArrangementNum}>{"<"}</button>
      <button onClick={incCurrentArrangementNum}>{">"}</button>
      {currentArrangementSeqNum}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentArrangementSeqNum: state.currentGame.currentArrangementSeqNum,
});

const mapDispatchToProps = (dispatch) => ({
  incCurrentArrangementNum: () =>
    dispatch({
      type: "INC_CURRENT_ARRANGEMENT_NUM",
    }),
  decCurrentArrangementNum: () =>
    dispatch({
      type: "DEC_CURRENT_ARRANGEMENT_NUM",
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
