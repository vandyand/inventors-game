import React from "react";
import { Field, reduxForm } from "redux-form";

type Props = {
  // onSubmit: () => void;
  handleSubmit;
  state: any;
};

const BoardOptionsSidebar = (props: Props) => {
  return (
    <div style={{ float: "left" }}>
      <h3>Board Options Sidebar here </h3>
      <form onSubmit={props.handleSubmit}>
        <div>
          <label>Grid Type</label>
          <Field name="gridType" component="select" value="square">
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
            <option value="hexagon">Hexagon</option>
          </Field>
        </div>
        <div>
          <label>Rotation</label>
          <Field
            name="rotation"
            component="input"
            type="number"
            placeholder={0}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "invent-board-form",
  initialValues: { gridType: "square" },
})(BoardOptionsSidebar);
