import { h } from "preact";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import {
  CaretDownIcon,
  CheckIcon,
  CursorIcon,
  MinusIcon,
  RulerIcon,
} from "./icons";

const TOOLBAR_TOOLTIP_DELAY_MS = 800;
const TOOLBAR_DRAG_SLOP = 6;

function ToolbarButton({
  id,
  active,
  label,
  shortcut,
  onClick,
  tooltipVisible,
  tooltipSide,
  onTooltipEnter,
  onTooltipLeave,
  children,
}) {
  return (
    <div
      class="toolbar-btn-wrap"
      onMouseEnter={() => onTooltipEnter(id)}
      onMouseLeave={() => onTooltipLeave(id)}
    >
      <button
        type="button"
        aria-label={`${label} (${shortcut})`}
        title={`${label} (${shortcut})`}
        class={`toolbar-btn ${active ? "active" : ""}`}
        onClick={onClick}
      >
        {children}
      </button>
      <span
        class={`tooltip ${tooltipSide === "top" ? "side-top" : "side-bottom"} ${tooltipVisible ? "visible" : ""}`}
      >
        {label} <kbd>{shortcut}</kbd>
      </span>
    </div>
  );
}

function useToolbarTooltip() {
  const [visibleTooltipId, setVisibleTooltipId] = useState(null);
  const timerRef = useRef(null);
  const instantRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current === null) return;
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const onTooltipEnter = useCallback(
    (id) => {
      clearTimer();
      if (instantRef.current) {
        setVisibleTooltipId(id);
        return;
      }

      timerRef.current = window.setTimeout(() => {
        setVisibleTooltipId(id);
        instantRef.current = true;
        timerRef.current = null;
      }, TOOLBAR_TOOLTIP_DELAY_MS);
    },
    [clearTimer]
  );

  const onTooltipLeave = useCallback(
    (id) => {
      clearTimer();
      setVisibleTooltipId((prev) => (prev === id ? null : prev));
    },
    [clearTimer]
  );

  const onToolbarLeave = useCallback(() => {
    clearTimer();
    setVisibleTooltipId(null);
    instantRef.current = false;
  }, [clearTimer]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return { visibleTooltipId, onTooltipEnter, onTooltipLeave, onToolbarLeave };
}

function useToolbarDrag(initialPosition) {
  const [position, setPosition] = useState(initialPosition);
  const suppressClickRef = useRef(false);
  const detachListenersRef = useRef(null);
  const dragRef = useRef({
    active: false,
    didDrag: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    width: 0,
    height: 0,
  });

  const onPointerDown = useCallback(
    (event) => {
      if (event.button !== 0) return;

      if (detachListenersRef.current) {
        detachListenersRef.current();
        detachListenersRef.current = null;
      }

      const state = dragRef.current;
      state.active = false;
      state.didDrag = false;
      state.pointerId = event.pointerId;
      state.startX = event.clientX;
      state.startY = event.clientY;
      state.originX = position.x;
      state.originY = position.y;
      const rect = event.currentTarget.getBoundingClientRect();
      state.width = rect.width;
      state.height = rect.height;

      const handlePointerMove = (moveEvent) => {
        const current = dragRef.current;
        if (current.pointerId !== moveEvent.pointerId) return;

        const dx = moveEvent.clientX - current.startX;
        const dy = moveEvent.clientY - current.startY;

        if (!current.active) {
          current.active =
            Math.abs(dx) > TOOLBAR_DRAG_SLOP ||
            Math.abs(dy) > TOOLBAR_DRAG_SLOP;
        }

        if (!current.active) return;

        current.didDrag = true;
        const maxX = Math.max(8, window.innerWidth - current.width - 8);
        const maxY = Math.max(8, window.innerHeight - current.height - 8);
        setPosition({
          x: Math.min(maxX, Math.max(8, current.originX + dx)),
          y: Math.min(maxY, Math.max(8, current.originY + dy)),
        });
      };

      const handlePointerEnd = (endEvent) => {
        const current = dragRef.current;
        if (
          current.pointerId !== endEvent.pointerId &&
          current.pointerId !== -1
        )
          return;
        suppressClickRef.current = current.didDrag;
        current.active = false;
        current.didDrag = false;
        current.pointerId = -1;

        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerEnd);
        window.removeEventListener("pointercancel", handlePointerEnd);
        detachListenersRef.current = null;
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerEnd);
      window.addEventListener("pointercancel", handlePointerEnd);
      detachListenersRef.current = () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerEnd);
        window.removeEventListener("pointercancel", handlePointerEnd);
      };
    },
    [position.x, position.y]
  );

  const onClickCapture = useCallback((event) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  }, []);

  return { position, onPointerDown, onClickCapture };
}

export function Toolbar({
  toolbarRef,
  toolMode,
  setEnabled,
  setToolMode,
  guideOrientation,
  setGuideOrientation,
  onInteract,
}) {
  const { position, onPointerDown, onClickCapture } = useToolbarDrag({
    x: 16,
    y: 16,
  });
  const { visibleTooltipId, onTooltipEnter, onTooltipLeave, onToolbarLeave } =
    useToolbarTooltip();
  const [guideMenuOpen, setGuideMenuOpen] = useState(false);
  const guideMenuRef = useRef(null);
  const guideMenuPanelRef = useRef(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [menuAlign, setMenuAlign] = useState("right");

  const viewportHeight =
    typeof window === "undefined" ? 0 : window.innerHeight || 0;
  const nearTop = position.y < 56;
  const nearBottom = viewportHeight > 0 && position.y > viewportHeight - 56;
  const tooltipSide = nearTop && !nearBottom ? "bottom" : "top";
  const menuSide = nearBottom ? "top" : "bottom";

  const selectMode = useCallback(() => {
    setEnabled(true);
    setToolMode((prev) => (prev === "select" ? "none" : "select"));
    onInteract();
  }, [onInteract, setEnabled, setToolMode]);

  const guidesMode = useCallback(() => {
    setEnabled(true);
    setToolMode((prev) => (prev === "guides" ? "none" : "guides"));
    onInteract();
  }, [onInteract, setEnabled, setToolMode]);

  const selectGuideOrientation = useCallback(
    (orientation) => {
      setEnabled(true);
      setToolMode("guides");
      setGuideOrientation(orientation);
      onInteract();
      setGuideMenuOpen(false);
    },
    [onInteract, setEnabled, setGuideOrientation, setToolMode]
  );

  useLayoutEffect(() => {
    if (!guideMenuOpen) return;

    const frame = requestAnimationFrame(() => {
      const menu = guideMenuRef.current?.querySelector("[role='menu']");
      if (menu) menu.focus();
      const panel = guideMenuPanelRef.current;
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      if (rect.left < 8) {
        setMenuAlign("left");
        return;
      }
      if (rect.right > window.innerWidth - 8) {
        setMenuAlign("right");
      }
    });

    const handlePointerDown = (event) => {
      if (!guideMenuRef.current) return;
      if (guideMenuRef.current.contains(event.target)) return;
      setGuideMenuOpen(false);
    };

    const handleResize = () => {
      const panel = guideMenuPanelRef.current;
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      if (rect.left < 8) {
        setMenuAlign("left");
        return;
      }
      if (rect.right > window.innerWidth - 8) {
        setMenuAlign("right");
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [guideMenuOpen, guideOrientation]);

  return (
    <div
      ref={toolbarRef}
      class="toolbar"
      style={{ left: position.x + "px", top: position.y + "px" }}
      onPointerDown={(event) => {
        onInteract();
        onPointerDown(event);
      }}
      onClickCapture={onClickCapture}
      onMouseLeave={onToolbarLeave}
    >
      <ToolbarButton
        id="select"
        active={toolMode === "select"}
        label="Select"
        shortcut="S"
        onClick={selectMode}
        tooltipVisible={visibleTooltipId === "select"}
        tooltipSide={tooltipSide}
        onTooltipEnter={onTooltipEnter}
        onTooltipLeave={onTooltipLeave}
      >
        <CursorIcon size={20} />
      </ToolbarButton>
      <ToolbarButton
        id="guides"
        active={toolMode === "guides"}
        label="Guides"
        shortcut="G"
        onClick={guidesMode}
        tooltipVisible={visibleTooltipId === "guides"}
        tooltipSide={tooltipSide}
        onTooltipEnter={onTooltipEnter}
        onTooltipLeave={onTooltipLeave}
      >
        <RulerIcon
          size={20}
          className={
            guideOrientation === "vertical" ? "rotate-135" : "rotate-45"
          }
        />
      </ToolbarButton>
      <div
        class="guide-menu-wrap"
        ref={guideMenuRef}
        onMouseEnter={() => onTooltipEnter("guide-menu")}
        onMouseLeave={() => onTooltipLeave("guide-menu")}
      >
        <button
          type="button"
          aria-label="Guide orientation menu"
          title="Guide orientation"
          class={`guide-caret-btn ${guideMenuOpen ? "open" : ""}`}
          onClick={() => {
            onInteract();
            setGuideMenuOpen((prev) => {
              if (!prev) {
                setActiveMenuIndex(guideOrientation === "horizontal" ? 0 : 1);
              }
              return !prev;
            });
          }}
        >
          <CaretDownIcon size={8} />
        </button>
        <span
          class={`tooltip ${tooltipSide === "top" ? "side-top" : "side-bottom"} ${
            visibleTooltipId === "guide-menu" && !guideMenuOpen
              ? "visible"
              : ""
          }`}
        >
          Orientation Guide
        </span>
        {guideMenuOpen ? (
          <div
            class={`guide-menu-panel ${menuSide === "bottom" ? "side-bottom" : "side-top"} ${
              menuAlign === "left" ? "align-left" : "align-right"
            }`}
            ref={guideMenuPanelRef}
            role="menu"
            tabIndex={0}
            onKeyDown={(event) => {
              const key = event.key.toLowerCase();
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActiveMenuIndex((prev) => (prev + 1) % 2);
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActiveMenuIndex((prev) => (prev + 1) % 2);
              }
              if (event.key === "Enter") {
                event.preventDefault();
                selectGuideOrientation(
                  activeMenuIndex === 0 ? "horizontal" : "vertical"
                );
              }
              if (key === "h") {
                event.preventDefault();
                selectGuideOrientation("horizontal");
              }
              if (key === "v") {
                event.preventDefault();
                selectGuideOrientation("vertical");
              }
              if (event.key === "Escape") {
                event.preventDefault();
                setGuideMenuOpen(false);
              }
            }}
          >
            <button
              type="button"
              class={`guide-menu-item ${
                activeMenuIndex === 0 || guideOrientation === "horizontal"
                  ? "active"
                  : ""
              }`}
              onClick={() => selectGuideOrientation("horizontal")}
            >
              <CheckIcon
                size={12}
                className={`check ${guideOrientation === "horizontal" ? "visible" : ""}`}
              />
              <MinusIcon size={12} />
              <span class="flex-1">Horizontal</span>
              <span>H</span>
            </button>
            <button
              type="button"
              class={`guide-menu-item ${
                activeMenuIndex === 1 || guideOrientation === "vertical"
                  ? "active"
                  : ""
              }`}
              onClick={() => selectGuideOrientation("vertical")}
            >
              <CheckIcon
                size={12}
                className={`check ${guideOrientation === "vertical" ? "visible" : ""}`}
              />
              <MinusIcon size={12} className="rotate-90" />
              <span class="flex-1">Vertical</span>
              <span>V</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
