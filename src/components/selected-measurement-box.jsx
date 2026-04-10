import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { MeasureTag } from "./measure-tag";

const formatValue = (value) => Math.round(value);

export function SelectedMeasurementBox({
  measurement,
  transitionMs,
  labelOffset,
  edgeVisibility,
}) {
  const [rect, setRect] = useState(
    measurement.originRect ?? measurement.rect
  );

  useEffect(() => {
    if (!measurement.originRect) return;

    const frame = requestAnimationFrame(() => {
      setRect(measurement.rect);
    });

    return () => cancelAnimationFrame(frame);
  }, [measurement]);

  const edges =
    edgeVisibility ??
    { top: true, right: true, bottom: true, left: true };
  const displayRect = measurement.originRect ? rect : measurement.rect;
  const outlineColor =
    "color-mix(in oklch, oklch(0.62 0.18 255) 80%, transparent)";
  const fillColor = "color-mix(in oklch, oklch(0.62 0.18 255) 8%, transparent)";

  return (
    <div class="pe-none">
      <div
        class="abs"
        style={{
          left: displayRect.left + "px",
          top: displayRect.top + "px",
          width: displayRect.width + "px",
          height: displayRect.height + "px",
          backgroundColor: fillColor,
          transition: measurement.originRect
            ? `left ${transitionMs}ms ease, top ${transitionMs}ms ease, width ${transitionMs}ms ease, height ${transitionMs}ms ease`
            : undefined,
        }}
      >
        {edges.top ? (
          <div class="edge-top" style={{ backgroundColor: outlineColor }} />
        ) : null}
        {edges.right ? (
          <div class="edge-right" style={{ backgroundColor: outlineColor }} />
        ) : null}
        {edges.bottom ? (
          <div class="edge-bottom" style={{ backgroundColor: outlineColor }} />
        ) : null}
        {edges.left ? (
          <div class="edge-left" style={{ backgroundColor: outlineColor }} />
        ) : null}
      </div>
      <MeasureTag
        className="bg-dark translate-x-center"
        style={{
          left: displayRect.left + displayRect.width / 2 + "px",
          top: displayRect.top + displayRect.height + labelOffset + "px",
          transition: measurement.originRect
            ? `left ${transitionMs}ms ease, top ${transitionMs}ms ease`
            : undefined,
        }}
      >
        {formatValue(displayRect.width)} x {formatValue(displayRect.height)}
      </MeasureTag>
    </div>
  );
}
