import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { board, piece } from "../../types/GameComponents";
import SelectBoard from "./select/SelectBoard";
import SelectPieces from "./select/SelectPieces";

import "./InventGame.scss";

type Props = {
  boards: Array<board>;
  pieces: Array<piece>;
};

const InventGame = (props: Props) => {
  return (
    <>
      <Link to="/">Main Menu</Link>
      <form className="InventGame">
        <h1>Invent a game here </h1>
        <div className="InventGame__Board">
          <Field
            component={SelectBoard}
            title="Select a board"
            boards={props.boards}
            name="SelectBoard"
          />
          <Link to="/Invent/Board">Invent a new board</Link>
        </div>
        <div className="InventGame__Piece">
          <Field
            component={SelectPieces}
            title="Select your pieces"
            pieces={props.pieces}
          />
          <Link to="/Invent/Pieces">Invent new pieces</Link>
        </div>
      </form>
    </>
  );
};

export default reduxForm({
  form: "invent-game",
})(InventGame);
