import React from "react";
import { Form, Field } from "react-final-form";

type Props = {
  onSubmit: () => void;
  state: any;
};

const BoardOptionsSidebar = ({ onSubmit, state }: Props) => {
  // console.log(props.state);
  return (
    <div style={{ float: "left" }}>
      <h3>Board Options Sidebar here </h3>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, values }) => {
          console.log(values, state);
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Grid Type</label>
                <Field name="grid_type" component="select">
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
          );
        }}
      />
    </div>
  );
};

export default BoardOptionsSidebar;
