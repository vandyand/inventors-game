import React from "react";
import { Field, FieldArray, Form, reduxForm } from "redux-form";
import { board } from "../../types/GameComponents";
import GridField from "../grids/GridField";

type Props = {
  handleSubmit;
  formValues;
};

const InventBoardForm = (props: Props) => {

  const renderSizeInput = ({ fields }) => {
    return fields.map((name) => <Field
      component="input"
      name={name}
      type="number"
      parse={parseInt}
    />
    )
  }

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
          {/* <div>
            <label>Grid Type</label>
            <Field name="gridType" component="select" value="square">
              <option value="squares">Square</option>
              <option value="triangles">Triangle</option>
              <option value="hexagons">Hexagon</option>
            </Field>
          </div> */}
          <div>
            <label>Name</label>
            <Field
              name="name"
              component="input"
              type="text"
            />
          </div>
          <div>
            <label>Description</label>
            <Field
              name="description"
              component="input"
              type="text"
            />
          </div>
          <div>
            <label>Size</label>
            <FieldArray
              name="size"
              component={renderSizeInput}
              type="number"
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
  initialValues: ({ name: "", description: "", grid_type_id: 1, board_shape: "rectangle", size: [8, 8], rotation: "0" } as board),
})(InventBoardForm);
