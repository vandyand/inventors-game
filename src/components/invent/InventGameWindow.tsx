import React from "react";
// import { connect } from "react-redux";
// import { board, piece } from "../../types/GameComponents";
import Grid from "../grids/Grid";

// type Props = {
//   board: board;
//   pieces: Array<piece>;
// };

const InventGameWindow = (props) => {

  return (
    <div className="InventGameWindow">
      <div className="InventGameWindow__Board">
        This is a board (holder)
        <Grid type={"squares"} rotation={0} />
      </div>
    </div>
  )
}

// const mapStateToProps = (state) => ({
//   board: state.boards[0],
//   pieces: state.pieces,
// })

// export default connect(mapStateToProps)(InventGameWindow);

export default InventGameWindow;