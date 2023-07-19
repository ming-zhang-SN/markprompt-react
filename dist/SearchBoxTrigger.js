import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import React, { useEffect, } from "react";
import { DEFAULT_MARKPROMPT_OPTIONS } from "./constants.js";
import { ChevronUpIcon, CommandIcon, CornerDownLeftIcon, SearchIcon, } from "./icons.js";
import * as BaseMarkprompt from "./primitives/headless.js";
import {} from "./types.js";
/**
 * A button that can be used to open the Markprompt dialog, styled as a search
 * input, displaying a keyboard shortcut. This trigger is relatively positioned
 * in the container where Markprompt is rendered.
 */
export function SearchBoxTrigger(props) {
    const { trigger, setOpen, open } = props;
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (open)
                return;
            if ((event.key === "Enter" && event.ctrlKey) ||
                (event.key === "Enter" && event.metaKey)) {
                event.preventDefault();
                setOpen(true);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, setOpen]);
    return (React.createElement(BaseMarkprompt.DialogTrigger, { className: "MarkpromptSearchBoxTrigger" },
        React.createElement(AccessibleIcon.Root, { label: trigger?.label !== undefined && trigger?.label != null
                ? trigger?.label
                : DEFAULT_MARKPROMPT_OPTIONS.trigger.label },
            React.createElement("span", { className: "MarkpromptSearchBoxTriggerContent" },
                React.createElement("span", { className: "MarkpromptSearchBoxTriggerText" },
                    React.createElement(SearchIcon, { width: 16, height: 16 }),
                    " ",
                    trigger?.placeholder || "Search",
                    " "),
                React.createElement("kbd", null,
                    navigator.platform.indexOf("Mac") === 0 ||
                        navigator.platform === "iPhone" ? (React.createElement(CommandIcon, { className: "MarkpromptKeyboardKey" })) : (React.createElement(ChevronUpIcon, { className: "MarkpromptKeyboardKey" })),
                    React.createElement(CornerDownLeftIcon, { className: "MarkpromptKeyboardKey" }))))));
}
//# sourceMappingURL=SearchBoxTrigger.js.map