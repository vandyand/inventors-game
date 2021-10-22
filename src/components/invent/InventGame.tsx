import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { board, piece } from "../../types/GameComponents";
import SelectBoard from "./select/SelectBoard";
import SelectPieces from "./select/SelectPieces";

import "./InventGameStyles.scss";
import InventGameWindow from "./InventGameWindow";

type Props = {
  boards: Array<board>;
  pieces: Array<piece>;
};

const InventGame = (props: Props) => {
  return (
    <>
      <Link to="/">Main Menu</Link>
      <h1>Invent a game here </h1>
      <div className="InventGame">
        <InventGameWindow />
        <form className="InventGame__Form">
          <div className="InventGame__Form__Board">
            <Field
              component={SelectBoard}
              title="Select a board"
              boards={props.boards}
              name="SelectBoard"
            />
            <div className="InventGame__Form__Board__Link">
              <Link to="/Invent/Board">Invent a new board</Link>
            </div>
          </div>
          <div className="InventGame__Form__Piece">
            <Field
              component={SelectPieces}
              title="Select your pieces"
              pieces={props.pieces}
            />
            <div className="InventGame__Form__Piece__Link">
              <Link to="/Invent/Pieces">Invent new pieces</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default reduxForm({
  form: "invent-game",
})(InventGame);
