var __HS_PLUGIN__ = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.tsx
  var index_exports = {};
  __export(index_exports, {
    default: () => WebFrame
  });
  var import_react = __toESM(__require("react"));
  function WebFrame({
    config
  }) {
    const {
      url = "",
      refreshInterval = 0,
      showBorder = false,
      backgroundColor = "#111827"
    } = config || {};
    const containerRef = (0, import_react.useRef)(null);
    const [reloadKey, setReloadKey] = (0, import_react.useState)(0);
    const [error, setError] = (0, import_react.useState)("");
    const validUrl = (() => {
      try {
        const parsed = new URL(url);
        return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : "";
      } catch {
        return "";
      }
    })();
    (0, import_react.useEffect)(() => {
      if (!validUrl || refreshInterval <= 0) return;
      const timer = window.setInterval(() => {
        setReloadKey((key) => key + 1);
      }, refreshInterval * 1e3);
      return () => window.clearInterval(timer);
    }, [validUrl, refreshInterval]);
    (0, import_react.useEffect)(() => {
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
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        ref: containerRef,
        style: {
          width: "100%",
          height: "100%",
          minWidth: 0,
          minHeight: 0,
          position: "relative",
          overflow: "hidden",
          background: backgroundColor,
          border: showBorder ? "1px solid rgba(255,255,255,0.25)" : "none",
          borderRadius: showBorder ? "8px" : "0"
        }
      },
      !validUrl ? /* @__PURE__ */ import_react.default.createElement("div", { style: {
        color: "#ffffff",
        padding: "16px",
        fontSize: "14px"
      } }, "Enter a valid HTTP or HTTPS URL in module settings.") : /* @__PURE__ */ import_react.default.createElement(
        "iframe",
        {
          key: reloadKey,
          src: validUrl,
          title: "Web Frame",
          onError: () => setError("Unable to load the website."),
          allow: "fullscreen",
          referrerPolicy: "strict-origin-when-cross-origin",
          style: {
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            background: backgroundColor
          }
        }
      ),
      error && /* @__PURE__ */ import_react.default.createElement("div", { style: {
        position: "absolute",
        bottom: "8px",
        left: "8px",
        right: "8px",
        padding: "8px",
        background: "#991b1b",
        color: "#ffffff",
        fontSize: "12px",
        borderRadius: "5px"
      } }, error),
      /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          type: "button",
          onClick: toggleFullscreen,
          title: "Toggle fullscreen",
          style: {
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
          }
        },
        "\u26F6"
      )
    );
  }
  window.__HS_PLUGIN__ = {
    default: WebFrame
  };
  return __toCommonJS(index_exports);
})();
