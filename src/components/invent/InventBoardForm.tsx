import React from "react";
import { Field, Form, reduxForm } from "redux-form";
// import { Link } from "react-router-dom";
import GridField from "../grids/GridField";

type Props = {
  handleSubmit;
  formValues;
};

const InventBoardForm = (props: Props) => {
  return (
    <div style={{ float: "left" }}>
      <h3>Invent your board! </h3>
      <Form onSubmit={props.handleSubmit} style={{ display: "flex" }}>
        <div>
          <label>Grid</label>
          <Field
            name="selectedCells"
            component={GridField}
            gridType={props.formValues ? props.formValues.gridType : "squares"}
            rotation={props.formValues ? props.formValues.rotation : 0}
          />
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
          <button type="submit">
            Submit
            {/* <Link to="./">Submit</Link> */}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default reduxForm({
  form: "invent-board-form",
  initialValues: { gridType: "squares", rotation: 0 },
})(InventBoardForm);
