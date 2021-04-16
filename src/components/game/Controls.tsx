import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UPDATE_CURRENT_ARRANGEMENT_SEQ_NUM } from "../../redux/actions/actionTypes";

type Controls = {
  currentArrangementSeqNum: number;
  updateCurrentArrangementSeqNum: (seqNum: number) => void;
};

const Controls: React.FC<Controls> = ({
  currentArrangementSeqNum,
  updateCurrentArrangementSeqNum,
}) => {
  return (
    <div>
      <button onClick={() => updateCurrentArrangementSeqNum(-1)}>{"<"}</button>
      <button onClick={() => updateCurrentArrangementSeqNum(1)}>{">"}</button>
      {currentArrangementSeqNum}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentArrangementSeqNum: state.currentGame.currentArrangementSeqNum,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateCurrentArrangementSeqNum: (seqNum: number) => {
    return dispatch({
      type: UPDATE_CURRENT_ARRANGEMENT_SEQ_NUM,
      seqNum,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
