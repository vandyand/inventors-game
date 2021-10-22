import React from "react";
import { Field, Form, reduxForm } from "redux-form";

const gameTypes = ["chess", "alt-chess", "new weird game"];
const opponents = ["computer", "human"];

type Props = {
  handleSubmit;
  formValues;
};

const PlayForm = (props: Props) => {
  return (
    <div style={{ float: "left" }}>
      <h3>Select game type and opponent type! </h3>
      <Form onSubmit={props.handleSubmit}>
        <Field name="gameType" component="select">
          {gameTypes.map((gameType, ind) => (
            <option key={ind} value={gameType}>
              {gameType}
            </option>
          ))}
        </Field>
        <Field name="opponent" component="select">
          {opponents.map((opponent, ind) => (
            <option key={ind} value={opponent}>
              {opponent}
            </option>
          ))}
        </Field>
        <button type="submit">Play!</button>
      </Form>
    </div>
  );
};

export default reduxForm({
  form: "play_game",
})(PlayForm);
