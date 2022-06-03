import { MouseEventHandler } from "react";

interface IButton {
  click?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  type: string;
}

export default function Button(props: IButton) {
  return (
    <button
      type="button"
      className={`btn btn-${props.type}`}
      onClick={props.click}
    >
      {props.text}
    </button>
  );
}
