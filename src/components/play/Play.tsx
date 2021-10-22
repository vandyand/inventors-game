import React from "react";
import PlayForm from "./PlayForm.container";

type Props = {
  handleSubmit: (values: any) => void;
};

const Play = (props: Props) => {
  return (
    <div className="Play">
      <h1>Select game to play</h1>
      <PlayForm />
    </div>
  );
};

export default Play;
