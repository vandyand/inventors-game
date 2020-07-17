import React from "react";
import { connect } from "react-redux";

const Controls = ({
  currentBoardAndPiecesSeqNum,
  incCurrentBoardAndPiecesNum,
  decCurrentBoardAndPiecesNum,
}) => {
  return (
    <div>
      <button onClick={decCurrentBoardAndPiecesNum}>{"<"}</button>
      <button onClick={incCurrentBoardAndPiecesNum}>{">"}</button>
      {currentBoardAndPiecesSeqNum}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentBoardAndPiecesSeqNum: state.currentBoardAndPiecesSeqNum,
});

const mapDispatchToProps = (dispatch) => ({
  incCurrentBoardAndPiecesNum: () =>
    dispatch({
      type: "INC_CURRENT_BOARD_AND_PIECES_NUM",
    }),
  decCurrentBoardAndPiecesNum: () =>
    dispatch({
      type: "DEC_CURRENT_BOARD_AND_PIECES_NUM",
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
