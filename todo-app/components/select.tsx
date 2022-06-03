import { ChangeEventHandler } from "react";

interface ISelect {
  change: ChangeEventHandler<HTMLSelectElement>;
  defaultValue: string;
  firstOption: string;
  secondOption: string;
}

export default function Select(props: ISelect) {
  return (
    <select
      name="completed"
      id="completed"
      onChange={props.change}
      defaultValue={props.defaultValue}
    >
      <option value="false">{props.firstOption}</option>
      <option value="true">{props.secondOption}</option>
    </select>
  );
}
