import React, { useEffect, useCallback, useMemo, useRef, } from "react";
import { DEFAULT_MARKPROMPT_OPTIONS } from "./constants.js";
import { useMarkpromptContext } from "./context.js";
import { MarkpromptForm } from "./MarkpromptForm.js";
import * as BaseMarkprompt from "./primitives/headless.js";
import { SearchResult } from "./SearchResult.js";
import {} from "./types.js";
export function SearchView(props) {
    const { search, close, handleViewChange, onDidSelectResult } = props;
    const [activeSearchResult, setActiveSearchResult] = React.useState();
    const { searchResults, searchQuery } = useMarkpromptContext();
    useEffect(() => {
        // if the search query changes, unset the active search result
        setActiveSearchResult(undefined);
    }, [searchQuery]);
    useEffect(() => {
        // if the search results change, set the active search result to the
        // first result
        if (searchResults.length === 0)
            return;
        setActiveSearchResult({ id: "markprompt-result-0" });
    }, [searchResults]);
    const handleKeyDown = useCallback((event) => {
        switch (event.key) {
            case "ArrowDown": {
                if (!activeSearchResult)
                    return;
                if (activeSearchResult.id?.endsWith(`${searchResults.length - 1}`)) {
                    return;
                }
                event.preventDefault();
                const nextActiveSearchResultId = activeSearchResult.id?.replace(/\d+$/, (match) => String(Number(match) + 1));
                setActiveSearchResult({
                    id: nextActiveSearchResultId,
                    trigger: "keyboard",
                });
                const el = document.querySelector(`#${nextActiveSearchResultId} > a`);
                if (!el)
                    return;
                break;
            }
            case "ArrowUp": {
                if (!activeSearchResult)
                    return;
                if (activeSearchResult.id?.endsWith("-0"))
                    return;
                event.preventDefault();
                const nextActiveSearchResult = activeSearchResult.id?.replace(/\d+$/, (match) => String(Number(match) - 1));
                setActiveSearchResult({
                    id: nextActiveSearchResult,
                    trigger: "keyboard",
                });
                const el = document.querySelector(`#${nextActiveSearchResult} > a`);
                if (!el)
                    return;
                break;
            }
            case "Enter": {
                if (event.ctrlKey || event.metaKey)
                    return;
                if (!activeSearchResult)
                    return;
                event.preventDefault();
                // assumption here is that the search result will always contain an a element
                const el = document.querySelector(`#${activeSearchResult.id} a`);
                // todo: reset search query and result
                if (!el)
                    return;
                el?.click();
                break;
            }
        }
    }, [activeSearchResult, searchResults.length]);
    return (React.createElement("div", { className: "MarkpromptSearchView" },
        React.createElement(MarkpromptForm, { label: search?.label !== undefined && search?.label != null
                ? search?.label
                : DEFAULT_MARKPROMPT_OPTIONS.search.label, placeholder: search?.placeholder !== undefined && search?.placeholder != null
                ? search?.placeholder
                : DEFAULT_MARKPROMPT_OPTIONS.search.placeholder, inputProps: useMemo(() => ({
                onKeyDown: handleKeyDown,
                "aria-controls": "markprompt-search-results",
                "aria-activedescendant": activeSearchResult?.id,
            }), [activeSearchResult, handleKeyDown]), icon: "search", close: close }),
        React.createElement(SearchResultsContainer, { activeSearchResult: activeSearchResult, search: search, handleViewChange: handleViewChange, onDidSelectResult: onDidSelectResult, setActiveSearchResult: setActiveSearchResult })));
}
function SearchResultsContainer(props) {
    const { activeSearchResult, handleViewChange, setActiveSearchResult, onDidSelectResult, search, } = props;
    const onMouseMovedOverSearchResult = useRef(null);
    const { searchQuery, searchResults, state, submitPrompt } = useMarkpromptContext();
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowDown") {
                if (searchResults.length > 0 && activeSearchResult === undefined) {
                    setActiveSearchResult({
                        id: "markprompt-result-0",
                        trigger: "keyboard",
                    });
                    const el = document.querySelector("#markprompt-prompt");
                    if (el instanceof HTMLInputElement)
                        el.focus();
                }
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        activeSearchResult,
        searchResults,
        submitPrompt,
        handleViewChange,
        setActiveSearchResult,
    ]);
    useEffect(() => {
        // Do not scroll into view unless using keyboard navigation.
        // While using the mouse, we don't want movable hit targets.
        if (!activeSearchResult?.id || activeSearchResult.trigger !== "keyboard") {
            return;
        }
        const element = document.getElementById(activeSearchResult.id);
        if (!element) {
            return;
        }
        element.focus();
        element.scrollIntoView({
            block: "nearest",
        });
    }, [activeSearchResult, searchResults]);
    return (React.createElement("div", { className: "MarkpromptSearchResultsContainer" },
        state === "done" &&
            searchResults.length === 0 &&
            searchQuery.trim().length > 0 && (React.createElement("div", { className: "MarkpromptNoSearchResults" },
            React.createElement("p", null,
                "No results for \u201C",
                React.createElement("span", null, searchQuery),
                "\u201D"))),
        searchResults.length > 0 && (React.createElement(BaseMarkprompt.SearchResults, { className: "MarkpromptSearchResults", SearchResultComponent: ({ index, ...rest }) => {
                const id = `markprompt-result-${index}`;
                return (React.createElement(SearchResult, { ...rest, id: id, onMouseMove: () => {
                        // We use a mouse move event, instead of mouse over or
                        // mouse enter. Indeed, onMouseOver and onMouseEnter will
                        // trigger at each rerender. This is a problem when scrolling
                        // the list using the keyboard: it will automatically reselect
                        // the result that the mouse is over.
                        if (onMouseMovedOverSearchResult?.current === id) {
                            return;
                        }
                        onMouseMovedOverSearchResult.current = id;
                        setActiveSearchResult({ id, trigger: "mouse" });
                    }, onClick: onDidSelectResult, "aria-selected": id === activeSearchResult?.id }));
            } }))));
}
//# sourceMappingURL=SearchView.js.map