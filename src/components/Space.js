import React from "react";
import { connect } from "react-redux";
import "./Space.scss";

const Space = ({ consoleState, code, color, piece, setCurrentMovePiece }) => {
  const handleMovePiece = () => {
    setCurrentMovePiece(code, piece);
  };

  return (
    <div className={`space ${color}-space`} onClick={handleMovePiece}>
      {piece}
    </div>
  );
};

const mapStateToProps = (state) => ({
  newMove: state.newMove,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentMovePiece: (code, piece) =>
    dispatch({
      type: "SET_CURRENT_MOVE_PIECE",
      payload: { code, piece },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Space);
