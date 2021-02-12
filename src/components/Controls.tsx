import React from "react";
import { connect } from "react-redux";

const Controls = ({
  currentArrangementSeqNum,
  updateCurrentArrangementSeqNum,
}) => {
  // const updateCurrentArrangementHelper = (incOrDec) => {
  //   updateCurrentArrangementSeqNum(incOrDec);
  // };

  return (
    <div>
      <button onClick={() => updateCurrentArrangementSeqNum(-1)}>{"<"}</button>
      <button onClick={() => updateCurrentArrangementSeqNum(1)}>{">"}</button>
      {currentArrangementSeqNum}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentArrangementSeqNum: state.currentGame.currentArrangementSeqNum,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrentArrangementSeqNum: (payload) => {
    return dispatch({
      type: "UPDATE_CURRENT_ARRANGEMENT_SEQ_NUM",
      payload,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
