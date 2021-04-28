import React from "react";
import { Field, reduxForm } from "redux-form";

type Props = {
  // onSubmit: () => void;
  cellIds: Array<number>;
  handleSubmit;
};

const BoardOptionsSidebar = (props: Props) => {
  return (
    <div style={{ float: "left" }}>
      <h3>Board Options Sidebar here </h3>
      <form onSubmit={props.handleSubmit}>
        <div>
          <label>Grid Type</label>
          <Field name="gridType" component="select" value="square">
            <option value="squares">Square</option>
            <option value="triangles">Triangle</option>
            <option value="hexagons">Hexagon</option>
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
        <div>
          <label>cell ids</label>
          <Field name="cell_ids" component="textarea" value={props.cellIds} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "invent-board-form",
  initialValues: { gridType: "squares" },
})(BoardOptionsSidebar);
