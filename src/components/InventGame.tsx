import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import SelectBoard from "./select/SelectBoard";
import SelectPieces from "./select/SelectPieces";
import { board } from "./game/Board";
// import { piece } from "../game/Piece";

import "./InventGame.scss";

type Props = {
  boards: Array<board>;
  // pieces: Array<piece>;
};

const InventGameForm = (props: Props) => {
  return (
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
      <SelectPieces title="Select your pieces" />
      <Link to="/Invent/Pieces">Invent new pieces</Link>
    </form>
  );
};

export default reduxForm({
  form: "invent-game-form",
})(InventGameForm);
