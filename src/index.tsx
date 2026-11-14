
import React, { useEffect, useRef, useState } from "react";

type Config = {
  url?: string;
  refreshInterval?: number;
  showBorder?: boolean;
  backgroundColor?: string;
};

export default function WebFrame({
  config
}: {
  config: Config;
}) {
  const {
    url = "",
    refreshInterval = 0,
    showBorder = false,
    backgroundColor = "#111827"
  } = config || {};

  const containerRef = useRef<HTMLDivElement>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [error, setError] = useState("");

  const validUrl = (() => {
    try {
      const parsed = new URL(url);
      return ["http:", "https:"].includes(parsed.protocol)
        ? parsed.href
        : "";
    } catch {
      return "";
    }
  })();

  // Automatic iframe refresh
  useEffect(() => {
    if (!validUrl || refreshInterval <= 0) return;

    const timer = window.setInterval(() => {
      setReloadKey((key) => key + 1);
    }, refreshInterval * 1000);

    return () => window.clearInterval(timer);
  }, [validUrl, refreshInterval]);

  // Reset error when URL changes
  useEffect(() => {
    setError("");
  }, [validUrl]);

  const toggleFullscreen = async () => {
    const element = containerRef.current;
    if (!element) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await element.requestFullscreen();
      }
    } catch {
      setError("Fullscreen is not supported.");
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
        position: "relative",
        overflow: "hidden",
        background: backgroundColor,
        border: showBorder
          ? "1px solid rgba(255,255,255,0.25)"
          : "none",
        borderRadius: showBorder ? "8px" : "0"
      }}
    >
      {!validUrl ? (
        <div style={{
          color: "#ffffff",
          padding: "16px",
          fontSize: "14px"
        }}>
          Enter a valid HTTP or HTTPS URL in module settings.
        </div>
      ) : (
        <iframe
          key={reloadKey}
          src={validUrl}
          title="Web Frame"
          onError={() => setError("Unable to load the website.")}
          allow="fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            background: backgroundColor
          }}
        />
      )}

      {error && (
        <div style={{
          position: "absolute",
          bottom: "8px",
          left: "8px",
          right: "8px",
          padding: "8px",
          background: "#991b1b",
          color: "#ffffff",
          fontSize: "12px",
          borderRadius: "5px"
        }}>
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={toggleFullscreen}
        title="Toggle fullscreen"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          zIndex: 10,
          border: 0,
          borderRadius: "6px",
          padding: "7px 10px",
          background: "rgba(0,0,0,0.65)",
          color: "#ffffff",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        ⛶
      </button>
    </div>
  );
}

