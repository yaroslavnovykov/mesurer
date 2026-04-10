import { h, render } from "preact";
import { useState, useCallback } from "preact/hooks";
import { MeasurerApp } from "./app";
import styles from "./styles.css";

const CONTAINER_ID = "mesurer-ext-root";

function bootstrap() {
  // Prevent double-init
  if (document.getElementById(CONTAINER_ID)) {
    // Already injected — just toggle
    const existing = document.getElementById(CONTAINER_ID);
    const isVisible = existing.style.display !== "none";
    existing.style.display = isVisible ? "none" : "";
    if (!isVisible) {
      // Send toggle message to re-activate
      existing.__mesurer_toggle?.();
    }
    return;
  }

  // Create host element
  const host = document.createElement("div");
  host.id = CONTAINER_ID;
  host.style.cssText = "all: initial; position: fixed; top: 0; left: 0; width: 0; height: 0; z-index: 2147483647; pointer-events: none;";
  document.documentElement.appendChild(host);

  // Create shadow DOM
  const shadow = host.attachShadow({ mode: "open" });

  // Inject styles
  const styleEl = document.createElement("style");
  styleEl.textContent = styles;
  shadow.appendChild(styleEl);

  // Mount point
  const mountPoint = document.createElement("div");
  shadow.appendChild(mountPoint);

  // Track visibility for toggle
  let visible = true;

  function MeasurerRoot() {
    const [active, setActive] = useState(true);

    const handleToggle = useCallback((forceOff) => {
      if (forceOff === false) {
        setActive(false);
        host.style.display = "none";
        visible = false;
        return;
      }
      setActive((prev) => {
        const next = !prev;
        if (!next) {
          host.style.display = "none";
          visible = false;
        }
        return next;
      });
    }, []);

    // Expose toggle for external calls
    host.__mesurer_toggle = () => {
      if (!visible) {
        host.style.display = "";
        visible = true;
        setActive(true);
      } else {
        handleToggle();
      }
    };

    if (!active) return null;
    return <MeasurerApp onToggle={handleToggle} shadowHost={host} />;
  }

  render(<MeasurerRoot />, mountPoint);
}

// Listen for toggle messages from background
if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "MESURER_TOGGLE") {
      const existing = document.getElementById(CONTAINER_ID);
      if (existing && existing.__mesurer_toggle) {
        existing.__mesurer_toggle();
      } else {
        bootstrap();
      }
    }
  });
}

// Initial injection
bootstrap();
