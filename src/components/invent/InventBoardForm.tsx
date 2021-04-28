import React from "react";
import { Field, reduxForm } from "redux-form";
import GridField from "./GridField";

type Props = {
  // onSubmit: () => void;
  cellIds: Array<number>;
  handleSubmit;
};

const InventBoardForm = (props: Props) => {
  return (
    <div style={{ float: "left" }}>
      <h3>Invent your board! </h3>
      <form onSubmit={props.handleSubmit} style={{ display: "flex" }}>
        <div>
          <label>Grid</label>
          <Field name="grid" component={GridField} value="square"/>
        </div>
        <div>
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
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "invent-board-form",
  initialValues: { gridType: "squares" },
})(InventBoardForm);
