import { MIN_MULTI_TARGET_SIZE } from "./constants";
import {
  getBodyElementsCached,
  getFrameToken,
  getRectFromDomCached,
} from "./dom";
import { rectsOverlap } from "./geometry";
import { pickMultiTargets, pickPointTarget, pickSingleTarget } from "./targets";

// In the extension context, overlayNode is inside a Shadow DOM.
// document.elementsFromPoint returns the shadow host, not shadow content.
// We need to filter out the shadow host element as well.

export const getTargetElement = (point, overlayNode) => {
  // Get the shadow host if overlayNode is inside one
  const shadowHost = overlayNode?.getRootNode?.()?.host;

  if (overlayNode) {
    // Temporarily hide overlay from hit testing
    const previousOverlay = overlayNode.style.pointerEvents;
    overlayNode.style.pointerEvents = "none";

    // Also hide shadow host so it doesn't appear in elementsFromPoint
    let previousHostPE, previousHostVis;
    if (shadowHost) {
      previousHostPE = shadowHost.style.pointerEvents;
      previousHostVis = shadowHost.style.visibility;
      shadowHost.style.pointerEvents = "none";
      shadowHost.style.visibility = "hidden";
    }

    const elements = document.elementsFromPoint(point.x, point.y);

    overlayNode.style.pointerEvents = previousOverlay;
    if (shadowHost) {
      shadowHost.style.pointerEvents = previousHostPE;
      shadowHost.style.visibility = previousHostVis;
    }

    for (const element of elements) {
      if (!(element instanceof HTMLElement)) continue;
      if (overlayNode.contains(element)) continue;
      if (shadowHost && (element === shadowHost || shadowHost.contains(element))) continue;
      if (element === document.body || element === document.documentElement)
        continue;
      const rect = element.getBoundingClientRect();
      if (rect.width <= 2 || rect.height <= 2) continue;
      return element;
    }
    return null;
  }

  const elements = document.elementsFromPoint(point.x, point.y);
  for (const element of elements) {
    if (!(element instanceof HTMLElement)) continue;
    if (element === document.body || element === document.documentElement)
      continue;
    const rect = element.getBoundingClientRect();
    if (rect.width <= 2 || rect.height <= 2) continue;
    return element;
  }
  return null;
};

export const getShiftClickTarget = (point, overlayNode) => {
  const shadowHost = overlayNode?.getRootNode?.()?.host;
  const elements = document.elementsFromPoint(point.x, point.y);
  for (let i = elements.length - 1; i >= 0; i -= 1) {
    const element = elements[i];
    if (!(element instanceof HTMLElement)) continue;
    if (overlayNode && overlayNode.contains(element)) continue;
    if (shadowHost && (element === shadowHost || shadowHost.contains(element))) continue;
    if (element === document.body || element === document.documentElement)
      continue;
    const rect = element.getBoundingClientRect();
    if (rect.width <= 2 || rect.height <= 2) continue;
    return element;
  }
  return null;
};

export const getSnappedClickTarget = (point, overlayNode, snapEnabled) => {
  if (!snapEnabled) return getTargetElement(point, overlayNode);
  const probeRect = {
    left: point.x - 20,
    top: point.y - 20,
    width: 40,
    height: 40,
  };
  const entries = getSelectionEntries(probeRect, overlayNode);
  return (
    pickPointTarget(point, entries) ??
    pickSingleTarget(probeRect, point, entries) ??
    getTargetElement(point, overlayNode)
  );
};

export const getElementsInRect = (rect, overlayNode) => {
  const entries = getSelectionEntries(rect, overlayNode);
  if (entries.length === 0) return [];
  return pickMultiTargets(rect, entries);
};

let cachedSelectionFrame = -1;
let cachedSelectionKey = "";
let cachedSelectionEntries = [];
let cachedOverlayNode = null;

export const getSelectionEntries = (rect, overlayNode) => {
  const frame = getFrameToken();
  const key = `${Math.round(rect.left)}:${Math.round(rect.top)}:${Math.round(
    rect.width
  )}:${Math.round(rect.height)}`;
  if (
    frame === cachedSelectionFrame &&
    cachedSelectionKey === key &&
    cachedOverlayNode === overlayNode
  ) {
    return cachedSelectionEntries;
  }

  const shadowHost = overlayNode?.getRootNode?.()?.host;
  const minLeft = rect.left - 1;
  const minTop = rect.top - 1;
  const maxRight = rect.left + rect.width + 1;
  const maxBottom = rect.top + rect.height + 1;
  const elements = getBodyElementsCached();
  const entries = elements
    .map((element) => ({ element, rect: getRectFromDomCached(element) }))
    .filter(({ element, rect: elementRect }) => {
      if (overlayNode && overlayNode.contains(element)) return false;
      if (shadowHost && (element === shadowHost || shadowHost.contains(element))) return false;
      if (element === document.body || element === document.documentElement)
        return false;
      if (
        elementRect.width < MIN_MULTI_TARGET_SIZE ||
        elementRect.height < MIN_MULTI_TARGET_SIZE
      ) {
        return false;
      }
      if (elementRect.left > maxRight || elementRect.top > maxBottom)
        return false;
      if (elementRect.left + elementRect.width < minLeft) return false;
      if (elementRect.top + elementRect.height < minTop) return false;
      return rectsOverlap(rect, elementRect);
    });

  cachedSelectionFrame = frame;
  cachedSelectionKey = key;
  cachedOverlayNode = overlayNode;
  cachedSelectionEntries = entries;
  return entries;
};

const getSelectionCacheKey = (rect) =>
  `${Math.round(rect.left)}:${Math.round(rect.top)}:${Math.round(
    rect.width
  )}:${Math.round(rect.height)}`;

export const getSelectionEntriesCached = (rect, overlayNode, cache) => {
  const frame = getFrameToken();
  const key = getSelectionCacheKey(rect);
  if (
    cache.key === key &&
    cache.overlayNode === overlayNode &&
    cache.frame === frame
  ) {
    return cache.entries;
  }
  const entries = getSelectionEntries(rect, overlayNode);
  cache.key = key;
  cache.overlayNode = overlayNode;
  cache.frame = frame;
  cache.entries = entries;
  return entries;
};

export const getElementsInRectCached = (rect, overlayNode, cache) => {
  const entries = getSelectionEntriesCached(rect, overlayNode, cache);
  if (entries.length === 0) return [];
  return pickMultiTargets(rect, entries);
};
