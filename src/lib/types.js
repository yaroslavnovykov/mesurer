// Pure type definitions — used as JSDoc references only
// All types are defined via JSDoc in consuming files
// This file exists for documentation purposes

/**
 * @typedef {{ x: number, y: number }} Point
 * @typedef {{ left: number, top: number, width: number, height: number }} Rect
 * @typedef {{ left: number, top: number, width: number, height: number }} NormalizedRect
 * @typedef {{ id: string, rect: Rect, normalizedRect: NormalizedRect, elementRef?: HTMLElement|null, originRect?: Rect, deltaX: number, deltaY: number, snapped?: boolean }} Measurement
 * @typedef {{ top: number, right: number, bottom: number, left: number }} BoxEdges
 * @typedef {{ id: string, rect: Rect, paddingRect: Rect, marginRect: Rect, padding: BoxEdges, margin: BoxEdges, label: string, elementRef?: HTMLElement|null, originRect?: Rect }} InspectMeasurement
 * @typedef {{ id: string, orientation: "vertical"|"horizontal", position: number }} Guide
 * @typedef {{ id: string, rectA: Rect, rectB: Rect, normalizedRectA: NormalizedRect, normalizedRectB: NormalizedRect, elementRefA?: HTMLElement|null, elementRefB?: HTMLElement|null, horizontal: {x1:number,x2:number,y:number,value:number}|null, vertical: {y1:number,y2:number,x:number,value:number}|null, connectors: Array<{x1:number,y1:number,x2:number,y2:number}> }} DistanceOverlay
 * @typedef {{ rect: Rect, element?: HTMLElement|null, guideId?: string }} OptionTarget
 * @typedef {"none"|"select"|"guides"} ToolMode
 */

export {};
