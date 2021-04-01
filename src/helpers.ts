import { useRef } from "react";

export const useComponentWillMount = (...funcs) => {
  const willMount = useRef(true);
  if (willMount.current) {
    funcs.forEach((func) => func());
  }
  willMount.current = false;
};

export const alphabet: Array<string> = [..."abcdefghijklmnopqrstuvwxyz"];
