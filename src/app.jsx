import { h } from "preact";
import { useCallback, useEffect, useMemo, useRef, useState } from "preact/hooks";

import { MEASURE_TRANSITION_MS } from "./lib/constants";
import { getDistanceOverlay } from "./lib/distances";
import { getInspectMeasurement, getRectFromDom } from "./lib/dom";
import { getEdgeVisibilityForRects } from "./lib/edge-visibility";
import {
  getRectFromPoints,
  getViewportSize,
  normalizeRect,
  rectAlmostEqual,
} from "./lib/geometry";
import { getGuideRect, getSnapGuidePosition } from "./lib/guides";
import {
  getHoveredGuide,
  getOptionContainerLines,
  getOptionPairOverlay,
  getSelectedGuide,
} from "./lib/option-measurements";
import {
  getElementsInRectCached,
  getSnappedClickTarget,
  getTargetElement,
} from "./lib/selection";
import { getPrimarySelectedMeasurement, getSelectedMeasurementHit } from "./lib/selection-helpers";
import { createId, formatValue } from "./lib/utils";
import { updateDistanceForResize } from "./lib/distances";
import { updateMeasurementForResize } from "./lib/dom";
import { GUIDE_DRAG_HOLD_MS } from "./lib/constants";

import { MeasurerOverlay } from "./render/measurer-overlay";
import { Toolbar } from "./components/toolbar";

export function MeasurerApp({ onToggle }) {
  // Refs
  const overlayRef = useRef(null);
  const selectedElementRef = useRef(null);
  const hoverElementRef = useRef(null);
  const selectionRectRef = useRef(null);
  const toolbarRef = useRef(null);
  const selectionAnimationCleanupTimeoutRef = useRef(null);

  // Toggles
  const [enabled, setEnabled] = useState(true);
  const [altPressed, setAltPressed] = useState(false);
  const [toolMode, setToolMode] = useState("select");
  const holdEnabled = false;
  const multiMeasureEnabled = false;
  const snapGuidesEnabled = true;
  const guidesEnabled = toolMode === "guides";
  const snapEnabled = true;
  const hoverHighlightEnabled = true;
  const highlightColor = "oklch(0.62 0.18 255)";
  const guideColor = "oklch(0.63 0.26 29.23)";

  // Drag state
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Measurement state
  const [activeMeasurement, setActiveMeasurement] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [selectedMeasurement, setSelectedMeasurement] = useState(null);
  const [selectedMeasurements, setSelectedMeasurements] = useState([]);
  const [hoverRect, setHoverRect] = useState(null);
  const [heldDistances, setHeldDistances] = useState([]);

  // Guide state
  const [guides, setGuides] = useState([]);
  const [draggingGuideId, setDraggingGuideId] = useState(null);
  const [selectedGuideIds, setSelectedGuideIds] = useState([]);
  const [toolbarActive, setToolbarActive] = useState(true);
  const [guidePreview, setGuidePreview] = useState(null);
  const [guideOrientation, setGuideOrientation] = useState("vertical");

  // Local state
  const [selectionOriginRect, setSelectionOriginRect] = useState(null);
  const [hoverPointer, setHoverPointer] = useState(null);
  const [hoverElement, setHoverElementState] = useState(null);
  const [selectedElement, setSelectedElementState] = useState(null);

  const setSelectedElement = useCallback((element) => {
    selectedElementRef.current = element;
    setSelectedElementState(element);
  }, []);

  const setHoverElement = useCallback((element) => {
    hoverElementRef.current = element;
    setHoverElementState(element);
  }, []);

  const clearSelectionRect = useCallback(() => {
    selectionRectRef.current = null;
    setSelectionOriginRect(null);
  }, []);

  // Guide drag hold
  const guideDragHoldTimerRef = useRef(null);
  const guideDragHoldGuideIdRef = useRef(null);

  const clearGuideDragHold = useCallback(() => {
    if (guideDragHoldTimerRef.current !== null) {
      window.clearTimeout(guideDragHoldTimerRef.current);
      guideDragHoldTimerRef.current = null;
    }
    guideDragHoldGuideIdRef.current = null;
  }, []);

  const scheduleGuideDragHold = useCallback(
    (id, onHold) => {
      clearGuideDragHold();
      guideDragHoldGuideIdRef.current = id;
      guideDragHoldTimerRef.current = window.setTimeout(() => {
        if (guideDragHoldGuideIdRef.current === id) {
          onHold(id);
        }
      }, GUIDE_DRAG_HOLD_MS);
    },
    [clearGuideDragHold]
  );

  // History
  const historyRef = useRef([]);
  const futureRef = useRef([]);
  const historySignatureRef = useRef(null);
  const HISTORY_LIMIT = 50;

  const captureSnapshot = useCallback(() => {
    return {
      enabled,
      toolMode,
      guideOrientation,
      measurements: [...measurements],
      activeMeasurement,
      selectedMeasurements: [...selectedMeasurements],
      selectedMeasurement,
      heldDistances: [...heldDistances],
      guides: [...guides],
      selectedGuideIds: [...selectedGuideIds],
      draggingGuideId,
    };
  }, [
    activeMeasurement, draggingGuideId, enabled, guideOrientation,
    guides, heldDistances, measurements, selectedGuideIds,
    selectedMeasurement, selectedMeasurements, toolMode,
  ]);

  const getSnapshotSignature = useCallback((snapshot) => {
    const serializeRect = (rect) =>
      `${Math.round(rect.left)}:${Math.round(rect.top)}:${Math.round(rect.width)}:${Math.round(rect.height)}`;
    return [
      snapshot.enabled ? "1" : "0",
      snapshot.toolMode,
      snapshot.guideOrientation,
      snapshot.measurements.map((item) => `${item.id}@${serializeRect(item.rect)}`).join(","),
      snapshot.activeMeasurement
        ? `${snapshot.activeMeasurement.id}@${serializeRect(snapshot.activeMeasurement.rect)}`
        : "",
      snapshot.selectedMeasurements.map((item) => `${item.id}@${serializeRect(item.rect)}`).join(","),
      snapshot.selectedMeasurement
        ? `${snapshot.selectedMeasurement.id}@${serializeRect(snapshot.selectedMeasurement.rect)}`
        : "",
      snapshot.heldDistances.map((item) => item.id).join(","),
      snapshot.guides.map((item) => `${item.id}:${item.position}`).join(","),
      snapshot.selectedGuideIds.join(","),
      snapshot.draggingGuideId ?? "",
    ].join("|");
  }, []);

  const recordSnapshot = useCallback(() => {
    const snapshot = captureSnapshot();
    const signature = getSnapshotSignature(snapshot);
    if (historySignatureRef.current === signature) return;
    historyRef.current.push(snapshot);
    futureRef.current = [];
    historySignatureRef.current = signature;
    if (historyRef.current.length > HISTORY_LIMIT) {
      historyRef.current.shift();
    }
  }, [captureSnapshot, getSnapshotSignature]);

  const restoreSnapshot = useCallback(
    (snapshot) => {
      setEnabled(snapshot.enabled);
      setToolMode(snapshot.toolMode);
      setGuideOrientation(snapshot.guideOrientation);
      setMeasurements(snapshot.measurements);
      setActiveMeasurement(snapshot.activeMeasurement);
      setSelectedMeasurements(snapshot.selectedMeasurements);
      setSelectedMeasurement(snapshot.selectedMeasurement);
      setHeldDistances(snapshot.heldDistances);
      setGuides(snapshot.guides);
      setSelectedGuideIds(snapshot.selectedGuideIds);
      setDraggingGuideId(snapshot.draggingGuideId);
      setStart(null);
      setEnd(null);
      setIsDragging(false);
      setGuidePreview(null);
      setHoverRect(null);
      setHoverElement(null);
      clearSelectionRect();
      const nextSelectedElement =
        snapshot.selectedMeasurement?.elementRef ??
        snapshot.selectedMeasurements[snapshot.selectedMeasurements.length - 1]?.elementRef ??
        null;
      setSelectedElement(nextSelectedElement);
    },
    [clearSelectionRect, setHoverElement, setSelectedElement]
  );

  const undo = useCallback(() => {
    const previousSnapshot = historyRef.current.pop();
    if (!previousSnapshot) return;
    const currentSnapshot = captureSnapshot();
    futureRef.current.push(currentSnapshot);
    if (futureRef.current.length > HISTORY_LIMIT) {
      futureRef.current.shift();
    }
    historySignatureRef.current = null;
    restoreSnapshot(previousSnapshot);
  }, [captureSnapshot, restoreSnapshot]);

  const redo = useCallback(() => {
    const nextSnapshot = futureRef.current.pop();
    if (!nextSnapshot) return;
    historyRef.current.push(captureSnapshot());
    if (historyRef.current.length > HISTORY_LIMIT) {
      historyRef.current.shift();
    }
    historySignatureRef.current = null;
    restoreSnapshot(nextSnapshot);
  }, [captureSnapshot, restoreSnapshot]);

  const setToolModeWithHistory = useCallback(
    (value) => {
      setToolMode((prev) => {
        const next = typeof value === "function" ? value(prev) : value;
        if (next === prev) return prev;
        recordSnapshot();
        return next;
      });
    },
    [recordSnapshot]
  );

  const setGuideOrientationWithHistory = useCallback(
    (value) => {
      setGuideOrientation((prev) => {
        const next = typeof value === "function" ? value(prev) : value;
        if (next === prev) return prev;
        recordSnapshot();
        return next;
      });
    },
    [recordSnapshot]
  );

  const setEnabledWithHistory = useCallback(
    (value) => {
      setEnabled((prev) => {
        const next = typeof value === "function" ? value(prev) : value;
        if (next === prev) return prev;
        recordSnapshot();
        return next;
      });
    },
    [recordSnapshot]
  );

  const createActionCommit = useCallback(() => {
    let committed = false;
    return () => {
      if (committed) return;
      recordSnapshot();
      committed = true;
    };
  }, [recordSnapshot]);

  // Undo/redo keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() !== "z") return;
      if (event.shiftKey) {
        if (futureRef.current.length === 0) return;
        event.preventDefault();
        redo();
        return;
      }
      if (historyRef.current.length === 0) return;
      event.preventDefault();
      undo();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [redo, undo]);

  // Clear all
  const clearAll = useCallback(() => {
    recordSnapshot();
    clearGuideDragHold();
    setStart(null);
    setEnd(null);
    setIsDragging(false);
    setActiveMeasurement(null);
    setMeasurements([]);
    setSelectedMeasurement(null);
    setSelectedMeasurements([]);
    clearSelectionRect();
    setSelectedElement(null);
    setHoverRect(null);
    setHoverElement(null);
    setGuides([]);
    setSelectedGuideIds([]);
    setHeldDistances([]);
  }, [clearGuideDragHold, clearSelectionRect, recordSnapshot, setHoverElement, setSelectedElement]);

  const removeSelectedGuides = useCallback(() => {
    if (selectedGuideIds.length === 0) return false;
    recordSnapshot();
    setGuides((prev) =>
      prev.filter((guide) => !selectedGuideIds.includes(guide.id))
    );
    setSelectedGuideIds([]);
    return true;
  }, [recordSnapshot, selectedGuideIds]);

  // Hotkeys
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        clearAll();
        if (onToggle) onToggle(false);
        return;
      }

      if (event.key.toLowerCase() === "m") {
        setEnabledWithHistory((prev) => !prev);
      }

      const key = event.key.toLowerCase();
      const isOverlayActive = enabled && (toolMode !== "none" || toolbarActive);

      if (isOverlayActive) {
        if (key === "s") {
          setToolModeWithHistory((prev) => (prev === "select" ? "none" : "select"));
          setToolbarActive(true);
        }

        if (key === "g") {
          setToolModeWithHistory((prev) => (prev === "guides" ? "none" : "guides"));
          setToolbarActive(true);
        }

        if (key === "h") {
          setGuideOrientationWithHistory("horizontal");
          setToolbarActive(true);
        }

        if (key === "v") {
          setGuideOrientationWithHistory("vertical");
          setToolbarActive(true);
        }
      }

      if (event.key === "Alt") {
        setAltPressed(true);
      }

      if (event.key === "Backspace" || event.key === "Delete") {
        const removed = removeSelectedGuides();
        if (removed) {
          event.preventDefault();
        }
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Alt") {
        setAltPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [clearAll, enabled, onToggle, removeSelectedGuides, setEnabledWithHistory, setGuideOrientationWithHistory, setToolModeWithHistory, toolMode, toolbarActive]);

  // Resize sync
  useEffect(() => {
    let resizeFrame = null;
    const viewportRef = { current: getViewportSize() };

    const handleResize = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        const viewport = getViewportSize();
        const previousViewport = viewportRef.current;

        setMeasurements((prev) =>
          prev.map((m) => updateMeasurementForResize(m, viewport))
        );
        setActiveMeasurement((prev) =>
          prev ? updateMeasurementForResize(prev, viewport) : prev
        );
        setHeldDistances((prev) =>
          prev.map((d) => updateDistanceForResize(d, viewport))
        );

        if (selectedElementRef.current) {
          setSelectedMeasurement(
            getInspectMeasurement(selectedElementRef.current)
          );
        }

        if (previousViewport.width > 0 && previousViewport.height > 0) {
          const scaleX = viewport.width / previousViewport.width;
          const scaleY = viewport.height / previousViewport.height;
          setGuides((prev) =>
            prev.map((guide) =>
              guide.orientation === "vertical"
                ? { ...guide, position: guide.position * scaleX }
                : { ...guide, position: guide.position * scaleY }
            )
          );
        }

        viewportRef.current = viewport;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Live element tracking
  useEffect(() => {
    if (!enabled) return;
    let frameId = null;

    const tick = () => {
      setMeasurements((prev) =>
        prev.map((measurement) => {
          if (!measurement.elementRef || !document.contains(measurement.elementRef)) return measurement;
          const rect = getRectFromDom(measurement.elementRef);
          if (rectAlmostEqual(rect, measurement.rect)) return measurement;
          return { ...measurement, rect, normalizedRect: normalizeRect(rect), originRect: undefined };
        })
      );

      setActiveMeasurement((prev) => {
        if (!prev?.elementRef || !document.contains(prev.elementRef)) return prev;
        const rect = getRectFromDom(prev.elementRef);
        if (rectAlmostEqual(rect, prev.rect)) return prev;
        return { ...prev, rect, normalizedRect: normalizeRect(rect), originRect: undefined };
      });

      setHeldDistances((prev) =>
        prev.map((distance) => {
          const canTrackA = distance.elementRefA && document.contains(distance.elementRefA);
          const canTrackB = distance.elementRefB && document.contains(distance.elementRefB);
          if (!canTrackA && !canTrackB) return distance;
          const rectA = canTrackA ? getRectFromDom(distance.elementRefA) : distance.rectA;
          const rectB = canTrackB ? getRectFromDom(distance.elementRefB) : distance.rectB;
          if (rectAlmostEqual(rectA, distance.rectA) && rectAlmostEqual(rectB, distance.rectB)) return distance;
          const updated = getDistanceOverlay(rectA, rectB, distance.elementRefA, distance.elementRefB);
          return { ...updated, id: distance.id };
        })
      );

      const selected = selectedElementRef.current;
      if (selected && document.contains(selected)) {
        setSelectedMeasurement((prev) => {
          const next = getInspectMeasurement(selected);
          if (prev && rectAlmostEqual(prev.rect, next.rect)) return prev;
          return next;
        });
      }

      setSelectedMeasurements((prev) =>
        prev.map((measurement) => {
          if (!measurement.elementRef || !document.contains(measurement.elementRef)) return measurement;
          const next = getInspectMeasurement(measurement.elementRef);
          if (rectAlmostEqual(next.rect, measurement.rect)) return measurement;
          return { ...next, id: measurement.id };
        })
      );

      const hover = hoverElementRef.current;
      if (hover && document.contains(hover)) {
        const rect = getRectFromDom(hover);
        setHoverRect((prev) => (prev && rectAlmostEqual(prev, rect) ? prev : rect));
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [enabled]);

  // Toolbar outside click
  useEffect(() => {
    if (!toolbarActive || toolMode !== "none") return;

    const handlePointerDown = (event) => {
      const toolbarNode = toolbarRef.current;
      if (toolbarNode && toolbarNode.contains(event.target)) return;
      setToolbarActive(false);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [toolbarActive, toolMode]);

  // Selection animation cleanup
  useEffect(() => {
    const hasSelectionAnimationState =
      !!selectionOriginRect ||
      !!selectedMeasurement?.originRect ||
      selectedMeasurements.some((m) => !!m.originRect);

    if (!hasSelectionAnimationState) {
      if (selectionAnimationCleanupTimeoutRef.current !== null) {
        window.clearTimeout(selectionAnimationCleanupTimeoutRef.current);
        selectionAnimationCleanupTimeoutRef.current = null;
      }
      return;
    }

    if (selectionAnimationCleanupTimeoutRef.current !== null) return;

    selectionAnimationCleanupTimeoutRef.current = window.setTimeout(() => {
      selectionAnimationCleanupTimeoutRef.current = null;

      setSelectionOriginRect((prev) => (prev ? null : prev));

      setSelectedMeasurement((prev) => {
        if (!prev?.originRect) return prev;
        const { originRect: _o, ...next } = prev;
        return next;
      });

      setSelectedMeasurements((prev) => {
        let changed = false;
        const next = prev.map((m) => {
          if (!m.originRect) return m;
          changed = true;
          const { originRect: _o, ...rest } = m;
          return rest;
        });
        return changed ? next : prev;
      });
    }, MEASURE_TRANSITION_MS);
  }, [selectionOriginRect, selectedMeasurement, selectedMeasurements]);

  useEffect(() => {
    return () => {
      if (selectionAnimationCleanupTimeoutRef.current !== null) {
        window.clearTimeout(selectionAnimationCleanupTimeoutRef.current);
      }
    };
  }, []);

  // Displayed measurements
  const displayedMeasurements = holdEnabled
    ? measurements
    : multiMeasureEnabled && measurements.length > 0
      ? measurements
      : activeMeasurement
        ? [activeMeasurement]
        : [];

  // Derived values
  const activeRect = useMemo(() => {
    if (!start || !end) return null;
    return {
      left: Math.min(start.x, end.x),
      top: Math.min(start.y, end.y),
      width: Math.abs(end.x - start.x),
      height: Math.abs(end.y - start.y),
    };
  }, [end, start]);

  const activeWidth = activeRect ? formatValue(activeRect.width) : 0;
  const activeHeight = activeRect ? formatValue(activeRect.height) : 0;

  const groupedSelection = useMemo(() => {
    if (selectedMeasurements.length <= 1) return null;
    const rects = selectedMeasurements.map((m) => m.rect);
    let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
    rects.forEach((rect) => {
      l = Math.min(l, rect.left);
      t = Math.min(t, rect.top);
      r = Math.max(r, rect.left + rect.width);
      b = Math.max(b, rect.top + rect.height);
    });
    const unionRect = { left: l, top: t, width: r - l, height: b - t };
    const base = selectedMeasurements[selectedMeasurements.length - 1];
    return {
      ...base,
      id: `group-${selectedMeasurements.map((m) => m.id).join("|")}`,
      rect: unionRect,
      paddingRect: unionRect,
      marginRect: unionRect,
      originRect: selectionOriginRect ?? undefined,
    };
  }, [selectedMeasurements, selectionOriginRect]);

  const displayedSelectedMeasurements = useMemo(
    () =>
      groupedSelection
        ? [groupedSelection]
        : selectedMeasurements.length > 0
          ? selectedMeasurements
          : selectedMeasurement
            ? [selectedMeasurement]
            : [],
    [groupedSelection, selectedMeasurement, selectedMeasurements]
  );

  const selectedGuide = useMemo(
    () => getSelectedGuide(guides, selectedGuideIds),
    [guides, selectedGuideIds]
  );

  const hoverGuide = useMemo(
    () => getHoveredGuide(hoverPointer, guides),
    [guides, hoverPointer]
  );

  const primarySelectedMeasurement = useMemo(
    () => getPrimarySelectedMeasurement(selectedMeasurements, selectedMeasurement),
    [selectedMeasurement, selectedMeasurements]
  );
  const effectivePrimarySelected = groupedSelection ?? primarySelectedMeasurement;

  const optionPairOverlay = useMemo(() => {
    return getOptionPairOverlay({
      altPressed,
      primarySelectedMeasurement: effectivePrimarySelected,
      selectedGuide,
      hoverGuide,
      hoverElement,
      selectedElementRef: selectedElement,
    });
  }, [altPressed, effectivePrimarySelected, hoverElement, hoverGuide, selectedElement, selectedGuide]);

  const optionContainerLines = useMemo(() => {
    return getOptionContainerLines({
      altPressed,
      primarySelectedMeasurement: effectivePrimarySelected,
      optionPairOverlay,
      selectedGuideIds,
      selectedElement,
      hoverElement,
    });
  }, [altPressed, effectivePrimarySelected, hoverElement, optionPairOverlay, selectedElement, selectedGuideIds]);

  const guideDistanceOverlay = useMemo(() => {
    if (!altPressed || !guidesEnabled || !guidePreview) return null;
    const previewGuide = {
      id: "preview",
      orientation: guidePreview.orientation,
      position: guidePreview.position,
    };
    const sameOrientation = guides.filter(
      (g) => g.orientation === guidePreview.orientation
    );
    if (sameOrientation.length === 0) return null;
    const nearest = sameOrientation.reduce((closest, g) => {
      const distance = Math.abs(g.position - previewGuide.position);
      if (!closest) return { guide: g, distance };
      return distance < closest.distance ? { guide: g, distance } : closest;
    }, null);
    if (!nearest) return null;
    return getDistanceOverlay(getGuideRect(previewGuide), getGuideRect(nearest.guide));
  }, [altPressed, guidePreview, guides, guidesEnabled]);

  const {
    outlineColor, fillColor, guideColorActive, guideColorHover,
    guideColorDefault, guideColorPreview,
  } = useMemo(
    () => ({
      outlineColor: `color-mix(in oklch, ${highlightColor} 80%, transparent)`,
      fillColor: `color-mix(in oklch, ${highlightColor} 8%, transparent)`,
      guideColorActive: `color-mix(in oklch, ${guideColor} 100%, transparent)`,
      guideColorHover: `color-mix(in oklch, ${guideColor} 90%, transparent)`,
      guideColorDefault: `color-mix(in oklch, ${guideColor} 70%, transparent)`,
      guideColorPreview: `color-mix(in oklch, ${guideColor} 50%, transparent)`,
    }),
    [guideColor, highlightColor]
  );

  const selectedRects = useMemo(
    () => displayedSelectedMeasurements.map((m) => m.rect),
    [displayedSelectedMeasurements]
  );

  const hoverRectToShow =
    hoverHighlightEnabled && hoverRect && selectedMeasurements.length <= 1
      ? hoverRect
      : null;

  const selectionEdgeVisibility = useMemo(
    () => getEdgeVisibilityForRects(selectedRects),
    [selectedRects]
  );

  const selectedEdgeVisibility = selectionEdgeVisibility.slice(0, selectedRects.length);

  const hoverEdgeVisibility = hoverRectToShow
    ? { top: true, right: true, bottom: true, left: true }
    : null;

  const measurementEdgeVisibility = useMemo(
    () => getEdgeVisibilityForRects(displayedMeasurements.map((m) => m.rect)),
    [displayedMeasurements]
  );

  // Pointer handlers
  const hoverFrameRef = useRef(null);
  const hoverPointRef = useRef(null);
  const selectionCacheRef = useRef({
    key: "",
    entries: [],
    overlayNode: null,
    frame: -1,
  });
  const shiftDragRef = useRef(false);
  const shiftToggleElementRef = useRef(null);
  const guidesEnabledRef = useRef(guidesEnabled);
  const guidesRef = useRef(guides);
  const snapGuidesEnabledRef = useRef(snapGuidesEnabled);
  const draggingGuideIdRef = useRef(draggingGuideId);
  const guideOrientationRef = useRef(guideOrientation);

  useEffect(() => { guidesEnabledRef.current = guidesEnabled; }, [guidesEnabled]);
  useEffect(() => { guidesRef.current = guides; }, [guides]);
  useEffect(() => { snapGuidesEnabledRef.current = snapGuidesEnabled; }, [snapGuidesEnabled]);
  useEffect(() => { guideOrientationRef.current = guideOrientation; }, [guideOrientation]);
  useEffect(() => { draggingGuideIdRef.current = draggingGuideId; }, [draggingGuideId]);

  useEffect(() => {
    return () => {
      if (hoverFrameRef.current) cancelAnimationFrame(hoverFrameRef.current);
    };
  }, []);

  const updateHoverTarget = useCallback(
    (point) => {
      const target = getTargetElement(point, overlayRef.current);
      if (target) {
        const rect = target.getBoundingClientRect();
        setHoverRect({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
        setHoverElement(target);
      } else {
        setHoverRect(null);
        setHoverElement(null);
      }
    },
    [setHoverElement]
  );

  const updateHoverElement = useCallback(
    (point) => {
      const target = getTargetElement(point, overlayRef.current);
      setHoverElement(target);
    },
    [setHoverElement]
  );

  const handlePointerDown = useCallback(
    (event) => {
      const commit = createActionCommit();
      const toolbarNode = toolbarRef.current;
      if (toolbarNode && toolbarNode.contains(event.target)) return;
      if (!enabled || event.button !== 0) return;
      if (toolMode === "none") return;
      clearSelectionRect();
      const point = { x: event.clientX, y: event.clientY };
      shiftDragRef.current = event.shiftKey;
      shiftToggleElementRef.current = event.shiftKey
        ? (getSelectedMeasurementHit({
            point,
            selectedMeasurements,
            overlayNode: overlayRef.current,
          })?.elementRef ?? null)
        : null;
      selectionCacheRef.current.key = "";

      if (altPressed && optionPairOverlay) {
        commit();
        setHeldDistances((prev) => [...prev, { ...optionPairOverlay, id: createId() }]);
        return;
      }

      if (guidesEnabled) {
        commit();
        const position = getSnapGuidePosition({
          orientation: guideOrientation,
          point,
          snapGuidesEnabled,
          overlayNode: overlayRef.current,
          guides,
          draggingGuideId,
        });
        const id = createId();
        setSelectedGuideIds([]);
        setGuides((prev) => [...prev, { id, orientation: guideOrientation, position }]);
        setSelectedGuideIds([id]);
        scheduleGuideDragHold(id, setDraggingGuideId);
        event.currentTarget.setPointerCapture(event.pointerId);
        return;
      }

      if (selectedGuideIds.length > 0) {
        commit();
        setSelectedGuideIds([]);
      }

      setStart(point);
      setEnd(point);
      setIsDragging(false);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [
      altPressed, clearSelectionRect, createActionCommit, draggingGuideId,
      enabled, guideOrientation, guides, guidesEnabled, optionPairOverlay,
      scheduleGuideDragHold, selectedGuideIds.length, selectedMeasurements,
      snapGuidesEnabled, toolMode,
    ]
  );

  const handlePointerMove = useCallback(
    (event) => {
      const toolbarNode = toolbarRef.current;
      if (toolbarNode && toolbarNode.contains(event.target)) return;
      if (!enabled) return;
      if (toolMode === "none") {
        if (hoverHighlightEnabled) {
          setHoverRect(null);
          setHoverElement(null);
        }
        setHoverPointer(null);
        setGuidePreview(null);
        return;
      }

      const point = { x: event.clientX, y: event.clientY };
      if (event.altKey !== altPressed) {
        setAltPressed(event.altKey);
      }

      hoverPointRef.current = point;
      if (!hoverFrameRef.current) {
        hoverFrameRef.current = requestAnimationFrame(() => {
          const latest = hoverPointRef.current;
          if (latest && !draggingGuideIdRef.current) {
            if (hoverHighlightEnabled) {
              updateHoverTarget(latest);
            } else {
              updateHoverElement(latest);
            }
          }
          if (latest && guidesRef.current.length > 0) {
            setHoverPointer(latest);
          } else {
            setHoverPointer(null);
          }
          if (guidesEnabledRef.current && latest && !draggingGuideIdRef.current) {
            const position = getSnapGuidePosition({
              orientation: guideOrientationRef.current,
              point: latest,
              snapGuidesEnabled: snapGuidesEnabledRef.current,
              overlayNode: overlayRef.current,
              guides: guidesRef.current,
              draggingGuideId: draggingGuideIdRef.current,
            });
            setGuidePreview({ orientation: guideOrientationRef.current, position });
          } else {
            setGuidePreview(null);
          }
          hoverFrameRef.current = null;
        });
      }

      if (draggingGuideId) {
        setGuides((prev) =>
          prev.map((guide) =>
            guide.id === draggingGuideId
              ? {
                  ...guide,
                  position: getSnapGuidePosition({
                    orientation: guide.orientation,
                    point,
                    snapGuidesEnabled: snapGuidesEnabledRef.current,
                    overlayNode: overlayRef.current,
                    guides: guidesRef.current,
                    draggingGuideId: draggingGuideIdRef.current,
                  }),
                }
              : guide
          )
        );
      }

      if (!start) return;
      setEnd(point);

      if (!isDragging) {
        const dx = Math.abs(point.x - start.x);
        const dy = Math.abs(point.y - start.y);
        const threshold = shiftDragRef.current ? 12 : 4;
        if (dx > threshold || dy > threshold) {
          setIsDragging(true);
        }
      }
    },
    [
      altPressed, draggingGuideId, enabled, hoverHighlightEnabled,
      isDragging, setHoverElement, start, toolMode, updateHoverElement, updateHoverTarget,
    ]
  );

  const handlePointerUp = useCallback(
    (event) => {
      const commit = createActionCommit();
      const toolbarNode = toolbarRef.current;
      if (toolbarNode && toolbarNode.contains(event.target)) return;
      if (!enabled) return;
      clearGuideDragHold();
      if (toolMode === "none") {
        setStart(null);
        setEnd(null);
        setIsDragging(false);
        return;
      }
      const point = { x: event.clientX, y: event.clientY };

      const resetDragState = () => {
        setStart(null);
        setEnd(null);
        setIsDragging(false);
        shiftDragRef.current = false;
        shiftToggleElementRef.current = null;
      };

      const clearTransientMeasurements = () => {
        setActiveMeasurement(null);
        setMeasurements([]);
      };

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      if (draggingGuideId) {
        setDraggingGuideId(null);
      }

      if (!start || !end) {
        resetDragState();
        return;
      }

      const dragDx = Math.abs(point.x - start.x);
      const dragDy = Math.abs(point.y - start.y);
      const shiftThreshold = 12;
      const isShiftClick =
        event.shiftKey && dragDx <= shiftThreshold && dragDy <= shiftThreshold;

      if (isDragging && !isShiftClick) {
        const selectionRect = getRectFromPoints(start, point);
        selectionRectRef.current = selectionRect;
        setSelectionOriginRect(selectionRect);
        const elements = getElementsInRectCached(
          selectionRect,
          overlayRef.current,
          selectionCacheRef.current
        );
        const hasSameSelection =
          elements.length === selectedMeasurements.length &&
          elements.every((el, idx) => selectedMeasurements[idx]?.elementRef === el);
        const lastElement = elements[elements.length - 1] ?? null;
        const lastChanged = (selectedMeasurement?.elementRef ?? null) !== lastElement;
        if (elements.length > 0) {
          if (!hasSameSelection) {
            commit();
            const nextMeasurements = elements.map((el) => ({
              ...getInspectMeasurement(el),
              originRect: selectionRect,
            }));
            setSelectedMeasurements(nextMeasurements);
            setSelectedElement(lastElement);
            setSelectedMeasurement(nextMeasurements[nextMeasurements.length - 1]);
          } else if (lastChanged) {
            commit();
            setSelectedElement(lastElement);
            const lastMeasurement = selectedMeasurements.find((m) => m.elementRef === lastElement);
            if (lastMeasurement) setSelectedMeasurement(lastMeasurement);
          }
        } else if (selectedMeasurements.length > 0 || selectedMeasurement) {
          commit();
          setSelectedElement(null);
          setSelectedMeasurement(null);
          setSelectedMeasurements([]);
          clearSelectionRect();
        }

        clearTransientMeasurements();
        resetDragState();
        return;
      }

      const selectedHit = shiftToggleElementRef.current
        ? (selectedMeasurements.find(
            (m) => m.elementRef === shiftToggleElementRef.current
          ) ?? null)
        : getSelectedMeasurementHit({
            point,
            selectedMeasurements,
            overlayNode: overlayRef.current,
          });

      if (event.shiftKey && selectedHit) {
        commit();
        const nextSelected = selectedMeasurements.filter(
          (m) => m.elementRef !== selectedHit.elementRef
        );
        setSelectedMeasurements(nextSelected);
        clearSelectionRect();
        const nextPrimary = nextSelected.length > 0 ? nextSelected[nextSelected.length - 1] : null;
        setSelectedElement(nextPrimary?.elementRef ?? null);
        setSelectedMeasurement(nextPrimary);
        clearTransientMeasurements();
        resetDragState();
        return;
      }

      if (!hoverHighlightEnabled && !event.shiftKey && selectedHit) {
        commit();
        const nextSelected = selectedMeasurements.filter(
          (m) => m.elementRef !== selectedHit.elementRef
        );
        setSelectedMeasurements(nextSelected);
        clearSelectionRect();
        const nextPrimary = nextSelected.length > 0 ? nextSelected[nextSelected.length - 1] : null;
        setSelectedElement(nextPrimary?.elementRef ?? null);
        setSelectedMeasurement(nextPrimary);
        clearTransientMeasurements();
        resetDragState();
        return;
      }

      const target = event.shiftKey
        ? (getTargetElement(point, overlayRef.current) ??
          getSnappedClickTarget(point, overlayRef.current, snapEnabled))
        : getSnappedClickTarget(point, overlayRef.current, snapEnabled);

      if (target) {
        const inspectMeasurement = getInspectMeasurement(target);
        clearTransientMeasurements();

        if (event.shiftKey) {
          const alreadySelected = selectedMeasurements.some((m) => m.elementRef === target);
          if (alreadySelected) {
            commit();
            const nextSelected = selectedMeasurements.filter((m) => m.elementRef !== target);
            setSelectedMeasurements(nextSelected);
            clearSelectionRect();
            const nextPrimary = nextSelected.length > 0 ? nextSelected[nextSelected.length - 1] : null;
            setSelectedElement(nextPrimary?.elementRef ?? null);
            setSelectedMeasurement(nextPrimary);
          } else {
            commit();
            setSelectedMeasurements((prev) => [...prev, inspectMeasurement]);
            setSelectedElement(target);
            setSelectedMeasurement(inspectMeasurement);
            clearSelectionRect();
          }
          clearTransientMeasurements();
          resetDragState();
          return;
        }

        setSelectedElement(target);
        commit();
        setSelectedMeasurements([inspectMeasurement]);
        setSelectedMeasurement(inspectMeasurement);
        clearSelectionRect();
      } else {
        if (event.shiftKey) {
          clearTransientMeasurements();
          resetDragState();
          return;
        }
        commit();
        setSelectedElement(null);
        setSelectedMeasurement(null);
        setSelectedMeasurements([]);
        clearSelectionRect();
      }

      resetDragState();
    },
    [
      clearGuideDragHold, clearSelectionRect, createActionCommit,
      draggingGuideId, enabled, end, hoverHighlightEnabled, isDragging,
      selectedMeasurement, selectedMeasurements, setHoverElement,
      setSelectedElement, snapEnabled, start, toolMode,
    ]
  );

  const handlePointerLeave = useCallback(() => {
    clearGuideDragHold();
    setStart(null);
    setEnd(null);
    setIsDragging(false);
    setDraggingGuideId(null);
    setGuidePreview(null);
  }, [clearGuideDragHold]);

  const removeHeldDistance = useCallback(
    (id) => {
      recordSnapshot();
      setHeldDistances((prev) => prev.filter((d) => d.id !== id));
    },
    [recordSnapshot]
  );

  const handleGuidePointerDown = useCallback(
    (guide, event) => {
      const commit = createActionCommit();
      if (!enabled) return;
      event.stopPropagation();
      if (event.shiftKey) {
        commit();
        setSelectedGuideIds((prev) =>
          prev.includes(guide.id)
            ? prev.filter((id) => id !== guide.id)
            : [...prev, guide.id]
        );
        return;
      }
      commit();
      setSelectedGuideIds([guide.id]);
      scheduleGuideDragHold(guide.id, setDraggingGuideId);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [createActionCommit, enabled, scheduleGuideDragHold]
  );

  const handleGuidePointerUp = useCallback(
    (guide, event) => {
      event.stopPropagation();
      clearGuideDragHold();
      setDraggingGuideId((prev) => (prev === guide.id ? null : prev));
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [clearGuideDragHold]
  );

  // Listen for toggle messages from background script
  useEffect(() => {
    const handler = (message) => {
      if (message.type === "MESURER_TOGGLE") {
        if (onToggle) onToggle();
      }
    };
    if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener(handler);
      return () => chrome.runtime.onMessage.removeListener(handler);
    }
  }, [onToggle]);

  return (
    <div ref={overlayRef} class="mesurer-root">
      <MeasurerOverlay
        enabled={enabled}
        toolMode={toolMode}
        guidesEnabled={guidesEnabled}
        altPressed={altPressed}
        isDragging={isDragging}
        displayedMeasurements={displayedMeasurements}
        measurementEdgeVisibility={measurementEdgeVisibility}
        activeRect={activeRect}
        activeWidth={activeWidth}
        activeHeight={activeHeight}
        fillColor={fillColor}
        outlineColor={outlineColor}
        hoverRectToShow={hoverRectToShow}
        hoverEdgeVisibility={hoverEdgeVisibility}
        guidePreview={guidePreview}
        guideColorPreview={guideColorPreview}
        displayedSelectedMeasurements={displayedSelectedMeasurements}
        selectedEdgeVisibility={selectedEdgeVisibility}
        heldDistances={heldDistances}
        optionPairOverlay={optionPairOverlay}
        guideDistanceOverlay={guideDistanceOverlay}
        optionContainerLines={optionContainerLines}
        guides={guides}
        hoverGuide={hoverGuide}
        draggingGuideId={draggingGuideId}
        selectedGuideIds={selectedGuideIds}
        guideColorActive={guideColorActive}
        guideColorHover={guideColorHover}
        guideColorDefault={guideColorDefault}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onRemoveHeldDistance={removeHeldDistance}
        onGuidePointerDown={handleGuidePointerDown}
        onGuidePointerUp={handleGuidePointerUp}
        onGuidePointerCancel={handleGuidePointerUp}
      />

      <Toolbar
        toolbarRef={toolbarRef}
        toolMode={toolMode}
        setEnabled={setEnabledWithHistory}
        setToolMode={setToolModeWithHistory}
        guideOrientation={guideOrientation}
        setGuideOrientation={setGuideOrientationWithHistory}
        onInteract={() => setToolbarActive(true)}
      />
    </div>
  );
}
