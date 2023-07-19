import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import { clsx } from "clsx";
import Emittery from "emittery";
import React, { useEffect, useState, useMemo } from "react";
import { DEFAULT_MARKPROMPT_OPTIONS } from "./constants.js";
import { useMarkpromptContext } from "./context.js";
import { ChatIcon, SparklesIcon } from "./icons.js";
import * as BaseMarkprompt from "./primitives/headless.js";
import { PromptView } from "./PromptView.js";
import { SearchBoxTrigger } from "./SearchBoxTrigger.js";
import { SearchView } from "./SearchView.js";
import {} from "./types.js";
const emitter = new Emittery();
/**
 * Open Markprompt programmatically. Useful for building a custom trigger
 * or opening the Markprompt dialog in response to other user actions.
 */
function openMarkprompt() {
    emitter.emit("open");
}
function Markprompt(props) {
    const { close, debug, description, display = "dialog", projectKey, prompt, references, search, showBranding, title, trigger, onDidRequestOpenChange, ...dialogProps } = props;
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const onOpen = () => {
            onDidRequestOpenChange?.(true);
            if (display === "dialog") {
                setOpen(true);
            }
        };
        const onClose = () => {
            onDidRequestOpenChange?.(false);
            if (display === "dialog") {
                setOpen(false);
            }
        };
        emitter.on("open", onOpen);
        emitter.on("close", onClose);
        return () => {
            emitter.off("open", onOpen);
            emitter.off("close", onClose);
        };
    }, [trigger?.customElement, display, onDidRequestOpenChange]);
    return (React.createElement(BaseMarkprompt.Root, { projectKey: projectKey, display: display, promptOptions: prompt, searchOptions: search, open: open, onOpenChange: setOpen, debug: debug, ...dialogProps },
        !trigger?.customElement && display === "dialog" && (React.createElement(React.Fragment, null, trigger?.floating !== false ? (React.createElement(BaseMarkprompt.DialogTrigger, { className: "MarkpromptFloatingTrigger" },
            React.createElement(AccessibleIcon.Root, { label: trigger?.label !== undefined && trigger?.label !== null
                    ? trigger?.label
                    : DEFAULT_MARKPROMPT_OPTIONS.trigger.label },
                React.createElement(ChatIcon, { className: "MarkpromptChatIcon", width: "24", height: "24" })))) : (React.createElement(SearchBoxTrigger, { trigger: trigger, setOpen: setOpen, open: open })))),
        display === "dialog" && (React.createElement(React.Fragment, null,
            React.createElement(BaseMarkprompt.Portal, null,
                React.createElement(BaseMarkprompt.Overlay, { className: "MarkpromptOverlay" }),
                React.createElement(BaseMarkprompt.Content, { className: "MarkpromptContentDialog", showBranding: showBranding },
                    React.createElement(BaseMarkprompt.Title, { hide: title?.hide !== undefined && title?.hide != null
                            ? title?.hide
                            : true }, title?.text !== undefined && title?.text != null
                        ? title?.text
                        : DEFAULT_MARKPROMPT_OPTIONS.prompt.label),
                    description?.text && (React.createElement(BaseMarkprompt.Description, { hide: description?.hide !== undefined && description?.hide != null
                            ? description?.hide
                            : true }, description?.text)),
                    React.createElement(MarkpromptContent, { prompt: prompt, references: references, search: search, close: close }))))),
        display === "plain" && (React.createElement(BaseMarkprompt.PlainContent, { className: "MarkpromptContentPlain", showBranding: showBranding },
            React.createElement(MarkpromptContent, { prompt: prompt, search: search, references: references, close: close })))));
}
function MarkpromptContent(props) {
    const { prompt, references, search, close: _close } = props;
    const { abort, activeView, setActiveView } = useMarkpromptContext();
    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.key === "Enter" && event.ctrlKey) ||
                (event.key === "Enter" && event.metaKey)) {
                event.preventDefault();
                if (activeView === "prompt") {
                    setActiveView("search");
                }
                else if (activeView === "search") {
                    setActiveView("prompt");
                }
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeView, setActiveView]);
    const close = useMemo(() => {
        return _close !== undefined && _close != null
            ? _close
            : DEFAULT_MARKPROMPT_OPTIONS.close;
    }, [_close]);
    return (React.createElement("div", { className: "MarkpromptTabsContainer" },
        search?.enabled ? (React.createElement("div", { style: { position: "relative" } },
            React.createElement("div", { className: "MarkpromptTabsList" },
                React.createElement("button", { "aria-label": search.tabLabel, className: "MarkpromptTab", "data-state": activeView === "search" ? "active" : "", onClick: () => {
                        abort();
                        setActiveView("search");
                    } }, search.tabLabel || DEFAULT_MARKPROMPT_OPTIONS.search.tabLabel),
                React.createElement("button", { className: "MarkpromptTab", "data-state": activeView === "prompt" ? "active" : "", onClick: () => {
                        abort();
                        setActiveView("prompt");
                    } },
                    React.createElement(SparklesIcon, { focusable: false, className: clsx("MarkpromptBaseIcon", {
                            MarkpromptPrimaryIcon: activeView === "prompt",
                            MarkpromptHighlightedIcon: activeView === "search",
                        }) }),
                    prompt?.tabLabel || DEFAULT_MARKPROMPT_OPTIONS.prompt.tabLabel)),
            close?.visible !== false && (React.createElement("div", { style: {
                    position: "absolute",
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    right: "0.75rem",
                    top: "0rem",
                    bottom: "0rem",
                } },
                React.createElement(BaseMarkprompt.Close, { className: "MarkpromptClose" },
                    React.createElement(AccessibleIcon.Root, { label: close?.label !== undefined && close?.label != null
                            ? close?.label
                            : DEFAULT_MARKPROMPT_OPTIONS.close.label },
                        React.createElement("kbd", null, "Esc"))))))) : (
        // We still include a div to preserve the grid-template-rows rules
        React.createElement("div", null)),
        React.createElement("div", { className: "MarkpromptViews" },
            React.createElement("div", { style: {
                    position: "absolute",
                    inset: 0,
                    display: activeView === "search" ? "block" : "none",
                } },
                React.createElement(SearchView, { handleViewChange: () => setActiveView("prompt"), search: search, close: !search?.enabled ? close : undefined, onDidSelectResult: () => emitter.emit("close") })),
            React.createElement("div", { style: {
                    position: "absolute",
                    inset: 0,
                    display: activeView === "prompt" ? "block" : "none",
                } },
                React.createElement(PromptView, { prompt: prompt, references: references, close: !search?.enabled ? close : undefined, onDidSelectReference: () => emitter.emit("close") })))));
}
export { Markprompt, openMarkprompt };
//# sourceMappingURL=Markprompt.js.map