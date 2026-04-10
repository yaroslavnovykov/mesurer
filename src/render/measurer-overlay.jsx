import { h } from "preact";
import { MeasureTag } from "../components/measure-tag";
import { MeasurementBox } from "../components/measurement-box";
import { SelectedMeasurementBox } from "../components/selected-measurement-box";
import {
  GUIDE_HITBOX_SIZE,
  MEASURE_LABEL_OFFSET,
  MEASURE_TRANSITION_MS,
} from "../lib/constants";
import { formatValue } from "../lib/utils";
import { DistanceOverlayItem } from "./distance-overlay-item";

export function MeasurerOverlay({
  enabled,
  toolMode,
  guidesEnabled,
  altPressed,
  isDragging,
  displayedMeasurements,
  measurementEdgeVisibility,
  activeRect,
  activeWidth,
  activeHeight,
  fillColor,
  outlineColor,
  hoverRectToShow,
  hoverEdgeVisibility,
  guidePreview,
  guideColorPreview,
  displayedSelectedMeasurements,
  selectedEdgeVisibility,
  heldDistances,
  optionPairOverlay,
  guideDistanceOverlay,
  optionContainerLines,
  guides,
  hoverGuide,
  draggingGuideId,
  selectedGuideIds,
  guideColorActive,
  guideColorHover,
  guideColorDefault,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
  onRemoveHeldDistance,
  onGuidePointerDown,
  onGuidePointerUp,
  onGuidePointerCancel,
}) {
  const isActive = enabled && toolMode !== "none";
  const cursorClass = guidesEnabled
    ? hoverGuide || draggingGuideId
      ? "cursor-default"
      : "cursor-crosshair"
    : "cursor-default";

  return (
    <div
      class={`overlay-area ${isActive ? `active ${cursorClass}` : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    >
      {!guidesEnabled
        ? displayedMeasurements.map((measurement, index) => (
            <MeasurementBox
              key={measurement.id}
              measurement={measurement}
              transitionMs={MEASURE_TRANSITION_MS}
              labelOffset={MEASURE_LABEL_OFFSET}
              edgeVisibility={measurementEdgeVisibility[index]}
            />
          ))
        : null}

      {!guidesEnabled && activeRect && isDragging ? (
        <>
          <div
            class="pe-none abs"
            style={{
              left: activeRect.left + "px",
              top: activeRect.top + "px",
              width: activeRect.width + "px",
              height: activeRect.height + "px",
              backgroundColor: fillColor,
            }}
          >
            <div class="edge-top" style={{ backgroundColor: outlineColor }} />
            <div class="edge-right" style={{ backgroundColor: outlineColor }} />
            <div class="edge-bottom" style={{ backgroundColor: outlineColor }} />
            <div class="edge-left" style={{ backgroundColor: outlineColor }} />
          </div>
          <MeasureTag
            className="bg-dark translate-x-center"
            style={{
              left: activeRect.left + activeRect.width / 2 + "px",
              top: activeRect.top + activeRect.height + MEASURE_LABEL_OFFSET + "px",
            }}
          >
            {activeWidth} x {activeHeight}
          </MeasureTag>
        </>
      ) : null}

      {!guidesEnabled && hoverRectToShow ? (
        <div
          class="pe-none abs"
          style={{
            left: hoverRectToShow.left + "px",
            top: hoverRectToShow.top + "px",
            width: hoverRectToShow.width + "px",
            height: hoverRectToShow.height + "px",
            backgroundColor: fillColor,
          }}
        >
          {hoverEdgeVisibility?.top ? (
            <div class="edge-top" style={{ backgroundColor: outlineColor }} />
          ) : null}
          {hoverEdgeVisibility?.right ? (
            <div class="edge-right" style={{ backgroundColor: outlineColor }} />
          ) : null}
          {hoverEdgeVisibility?.bottom ? (
            <div class="edge-bottom" style={{ backgroundColor: outlineColor }} />
          ) : null}
          {hoverEdgeVisibility?.left ? (
            <div class="edge-left" style={{ backgroundColor: outlineColor }} />
          ) : null}
        </div>
      ) : null}

      {guidesEnabled && guidePreview ? (
        <div
          class="guide-preview"
          style={
            guidePreview.orientation === "vertical"
              ? {
                  left: guidePreview.position - GUIDE_HITBOX_SIZE / 2 + "px",
                  top: "0",
                  width: GUIDE_HITBOX_SIZE + "px",
                  height: "100%",
                }
              : {
                  top: guidePreview.position - GUIDE_HITBOX_SIZE / 2 + "px",
                  left: "0",
                  height: GUIDE_HITBOX_SIZE + "px",
                  width: "100%",
                }
          }
        >
          <div
            class="guide-preview-stroke"
            style={
              guidePreview.orientation === "vertical"
                ? {
                    left: GUIDE_HITBOX_SIZE / 2 - 1 + "px",
                    top: "0",
                    width: "2px",
                    height: "100%",
                    backgroundColor: guideColorPreview,
                  }
                : {
                    top: GUIDE_HITBOX_SIZE / 2 - 1 + "px",
                    left: "0",
                    height: "2px",
                    width: "100%",
                    backgroundColor: guideColorPreview,
                  }
            }
          />
        </div>
      ) : null}

      {!guidesEnabled
        ? displayedSelectedMeasurements.map((measurement, index) => (
            <SelectedMeasurementBox
              key={measurement.id}
              measurement={measurement}
              transitionMs={MEASURE_TRANSITION_MS}
              labelOffset={MEASURE_LABEL_OFFSET}
              edgeVisibility={selectedEdgeVisibility[index]}
            />
          ))
        : null}

      {heldDistances.map((distance) => (
        <DistanceOverlayItem
          key={`held-${distance.id}`}
          distance={distance}
          labelOffset={MEASURE_LABEL_OFFSET}
          onRemove={onRemoveHeldDistance}
        />
      ))}

      {!guidesEnabled && altPressed && optionPairOverlay ? (
        <DistanceOverlayItem
          key={`option-${optionPairOverlay.id}`}
          distance={optionPairOverlay}
          labelOffset={MEASURE_LABEL_OFFSET}
        />
      ) : null}

      {guidesEnabled && altPressed && guideDistanceOverlay ? (
        <DistanceOverlayItem
          key={`guide-preview-${guideDistanceOverlay.id}`}
          distance={guideDistanceOverlay}
          labelOffset={MEASURE_LABEL_OFFSET}
        />
      ) : null}

      {!guidesEnabled && altPressed && optionContainerLines ? (
        <>
          {optionContainerLines.top.value > 0 ? (
            <>
              <div
                class="container-line-v"
                style={{
                  top: optionContainerLines.top.y1 + "px",
                  height: (optionContainerLines.top.y2 - optionContainerLines.top.y1) + "px",
                  left: optionContainerLines.top.x + "px",
                }}
              />
              <MeasureTag
                className="bg-dark translate-y-center"
                style={{
                  left: optionContainerLines.top.x + MEASURE_LABEL_OFFSET + "px",
                  top: (optionContainerLines.top.y1 + optionContainerLines.top.y2) / 2 + "px",
                }}
              >
                {formatValue(optionContainerLines.top.value)}
              </MeasureTag>
            </>
          ) : null}

          {optionContainerLines.bottom.value > 0 ? (
            <>
              <div
                class="container-line-v"
                style={{
                  top: optionContainerLines.bottom.y1 + "px",
                  height: (optionContainerLines.bottom.y2 - optionContainerLines.bottom.y1) + "px",
                  left: optionContainerLines.bottom.x + "px",
                }}
              />
              <MeasureTag
                className="bg-dark translate-y-center"
                style={{
                  left: optionContainerLines.bottom.x + MEASURE_LABEL_OFFSET + "px",
                  top: (optionContainerLines.bottom.y1 + optionContainerLines.bottom.y2) / 2 + "px",
                }}
              >
                {formatValue(optionContainerLines.bottom.value)}
              </MeasureTag>
            </>
          ) : null}

          {optionContainerLines.left.value > 0 ? (
            <>
              <div
                class="container-line-h"
                style={{
                  left: optionContainerLines.left.x1 + "px",
                  width: (optionContainerLines.left.x2 - optionContainerLines.left.x1) + "px",
                  top: optionContainerLines.left.y + "px",
                }}
              />
              <MeasureTag
                className="bg-dark translate-x-center"
                style={{
                  left: (optionContainerLines.left.x1 + optionContainerLines.left.x2) / 2 + "px",
                  top: optionContainerLines.left.y + MEASURE_LABEL_OFFSET + "px",
                }}
              >
                {formatValue(optionContainerLines.left.value)}
              </MeasureTag>
            </>
          ) : null}

          {optionContainerLines.right.value > 0 ? (
            <>
              <div
                class="container-line-h"
                style={{
                  left: optionContainerLines.right.x1 + "px",
                  width: (optionContainerLines.right.x2 - optionContainerLines.right.x1) + "px",
                  top: optionContainerLines.right.y + "px",
                }}
              />
              <MeasureTag
                className="bg-dark translate-x-center"
                style={{
                  left: (optionContainerLines.right.x1 + optionContainerLines.right.x2) / 2 + "px",
                  top: optionContainerLines.right.y + MEASURE_LABEL_OFFSET + "px",
                }}
              >
                {formatValue(optionContainerLines.right.value)}
              </MeasureTag>
            </>
          ) : null}
        </>
      ) : null}

      {guides.map((guide) => {
        const isSelected = selectedGuideIds.includes(guide.id);
        const isHovered = hoverGuide?.id === guide.id;
        const strokeWidth = isSelected || isHovered ? 2 : 1;
        const strokeColor = isSelected
          ? guideColorActive
          : isHovered
            ? guideColorHover
            : guideColorDefault;

        return (
          <div
            key={guide.id}
            class="guide-hitbox"
            style={
              guide.orientation === "vertical"
                ? {
                    left: guide.position - GUIDE_HITBOX_SIZE / 2 + "px",
                    top: "0",
                    width: GUIDE_HITBOX_SIZE + "px",
                    height: "100%",
                  }
                : {
                    top: guide.position - GUIDE_HITBOX_SIZE / 2 + "px",
                    left: "0",
                    height: GUIDE_HITBOX_SIZE + "px",
                    width: "100%",
                  }
            }
            onPointerDown={(event) => onGuidePointerDown(guide, event)}
            onPointerUp={(event) => onGuidePointerUp(guide, event)}
            onPointerCancel={(event) => onGuidePointerCancel(guide, event)}
          >
            <div
              class="guide-stroke"
              style={
                guide.orientation === "vertical"
                  ? {
                      left: GUIDE_HITBOX_SIZE / 2 - 1 + "px",
                      top: "0",
                      width: strokeWidth + "px",
                      height: "100%",
                      backgroundColor: strokeColor,
                    }
                  : {
                      top: GUIDE_HITBOX_SIZE / 2 - 1 + "px",
                      left: "0",
                      height: strokeWidth + "px",
                      width: "100%",
                      backgroundColor: strokeColor,
                    }
              }
            />
          </div>
        );
      })}
    </div>
  );
}
