import { ChangeEventHandler } from "react";

interface Iinput {
  name: string;
  value: string;
  change: ChangeEventHandler<HTMLInputElement>;
}

export default function Input(props: Iinput) {
  return (
    <input
      type="text"
      className="form-control"
      aria-label="Text input with dropdown button"
      placeholder="Descreva aqui a tarefa..."
      name={props.name}
      value={props.value}
      onChange={props.change}
    />
  );
}
