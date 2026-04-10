import { h } from "preact";
import { MeasureTag } from "../components/measure-tag";
import { formatValue } from "../lib/utils";

export function DistanceOverlayItem({ distance, labelOffset, onRemove }) {
  return (
    <div
      class={onRemove ? "pe-auto" : "pe-none"}
      onClick={
        onRemove
          ? (event) => {
              event.stopPropagation();
              onRemove(distance.id);
            }
          : undefined
      }
    >
      <div
        class="distance-rect"
        style={{
          left: distance.rectA.left + "px",
          top: distance.rectA.top + "px",
          width: distance.rectA.width + "px",
          height: distance.rectA.height + "px",
        }}
      />
      <div
        class="distance-rect"
        style={{
          left: distance.rectB.left + "px",
          top: distance.rectB.top + "px",
          width: distance.rectB.width + "px",
          height: distance.rectB.height + "px",
        }}
      />
      {distance.connectors.map((connector, index) =>
        Math.abs(connector.x1 - connector.x2) < 1 ? (
          <div
            key={`${distance.id}-connector-${index}`}
            class="distance-connector-v"
            style={{
              left: connector.x1 + "px",
              top: Math.min(connector.y1, connector.y2) + "px",
              height: Math.abs(connector.y2 - connector.y1) + "px",
            }}
          />
        ) : (
          <div
            key={`${distance.id}-connector-${index}`}
            class="distance-connector-h"
            style={{
              left: Math.min(connector.x1, connector.x2) + "px",
              top: connector.y1 + "px",
              width: Math.abs(connector.x2 - connector.x1) + "px",
            }}
          />
        )
      )}
      {distance.horizontal && distance.horizontal.value > 0 ? (
        <>
          <div
            class="distance-line-h"
            style={{
              left: Math.min(distance.horizontal.x1, distance.horizontal.x2) + "px",
              width: Math.abs(distance.horizontal.x2 - distance.horizontal.x1) + "px",
              top: distance.horizontal.y + "px",
            }}
          />
          <MeasureTag
            className="bg-dark translate-x-center"
            style={{
              left: (distance.horizontal.x1 + distance.horizontal.x2) / 2 + "px",
              top: distance.horizontal.y + labelOffset + "px",
            }}
          >
            {formatValue(distance.horizontal.value)}
          </MeasureTag>
        </>
      ) : null}
      {distance.vertical && distance.vertical.value > 0 ? (
        <>
          <div
            class="distance-line-v"
            style={{
              top: Math.min(distance.vertical.y1, distance.vertical.y2) + "px",
              height: Math.abs(distance.vertical.y2 - distance.vertical.y1) + "px",
              left: distance.vertical.x + "px",
            }}
          />
          <MeasureTag
            className="bg-dark translate-y-center"
            style={{
              left: distance.vertical.x + labelOffset + "px",
              top: (distance.vertical.y1 + distance.vertical.y2) / 2 + "px",
            }}
          >
            {formatValue(distance.vertical.value)}
          </MeasureTag>
        </>
      ) : null}
    </div>
  );
}
