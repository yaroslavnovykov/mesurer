import { h } from "preact";

export function MeasureTag({ children, className = "", style }) {
  return (
    <div
      class={`measure-tag ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
