import { submitFeedback as submitFeedbackToMarkprompt, submitPrompt as submitPromptToMarkprompt, submitSearchQuery as submitSearchQueryToMarkprompt, submitAlgoliaDocsearchQuery, } from "@markprompt/core";
import { useCallback, useEffect, useMemo, useRef, useState, } from "react";
import { DEFAULT_MARKPROMPT_OPTIONS } from "./constants.js";
/**
 * A React hook with all the functionality you need to create an interactive
 * stateful Markprompt prompt with search and a prompt.
 */
export function useMarkprompt({ projectKey, searchOptions, promptOptions, debug, }) {
    if (!projectKey) {
        throw new Error("Markprompt: a project key is required. Make sure to pass the projectKey to useMarkprompt.");
    }
    const [activeView, setActiveView] = useState(searchOptions?.enabled ? "search" : "prompt");
    const [state, setState] = useState("indeterminate");
    const [searchResults, setSearchResults] = useState([]);
    const [answer, setAnswer] = useState("");
    const [references, setReferences] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [promptId, setPromptId] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const controllerRef = useRef();
    const abort = useCallback(() => {
        if (controllerRef.current) {
            controllerRef.current.abort();
            controllerRef.current = undefined;
        }
    }, []);
    // Abort ongoing fetch requests on unmount
    useEffect(() => {
        return () => abort();
    }, [abort]);
    const submitFeedback = useCallback(async (helpful) => {
        abort();
        // only submit feedback when we are done loading the answer
        if (state !== "done")
            return;
        // we need to be able to associate the feedback to a prompt
        if (!promptId)
            return;
        const controller = new AbortController();
        controllerRef.current = controller;
        const promise = submitFeedbackToMarkprompt(projectKey, { helpful, promptId }, { signal: controller.signal });
        promise.catch(() => {
            // ignore submitFeedback errors
        });
        promise.finally(() => {
            if (controllerRef.current === controller) {
                controllerRef.current = undefined;
            }
        });
    }, [abort, projectKey, promptId, state]);
    const submitPrompt = useCallback(async () => {
        abort();
        if (state === "preload" || state === "streaming-answer") {
            // If state is loading and fetch was aborted, wait a short delay
            // so that the original fetch request aborts and resets the state.
            // Otherwise, the new fetch starts (and state becomes 'preload'),
            // and after that, the state becomes 'done', which is the wrong
            // order.
            await new Promise((resolve) => setTimeout(resolve, 200));
        }
        if (!prompt || prompt === "") {
            return;
        }
        setAnswer("");
        setReferences([]);
        setState("preload");
        const controller = new AbortController();
        controllerRef.current = controller;
        const promise = submitPromptToMarkprompt(prompt, projectKey, (chunk) => {
            setState("streaming-answer");
            setAnswer((prev) => prev + chunk);
            return true;
        }, (refs) => setReferences(refs), (error) => {
            if (error instanceof Error &&
                typeof error.cause === "object" &&
                error.cause !== null &&
                "name" in error.cause &&
                error.cause?.name === "AbortError") {
                // Ignore abort errors
                return;
            }
            // todo: surface errors to the user
            // eslint-disable-next-line no-console
            console.error(error);
        }, {
            ...promptOptions,
            signal: controller.signal,
        }, debug);
        promise.then(() => {
            if (controller.signal.aborted)
                return;
            setState("done");
        });
        promise.finally(() => {
            if (controllerRef.current === controller) {
                controllerRef.current = undefined;
            }
        });
    }, [abort, debug, projectKey, prompt, promptOptions, state]);
    const submitSearchQuery = useCallback((searchQuery) => {
        if (!searchOptions?.enabled)
            return;
        abort();
        // reset state if the query was set (back) to empty
        if (searchQuery === "") {
            if (controllerRef.current)
                controllerRef.current.abort();
            setSearchResults([]);
            setState("indeterminate");
            return;
        }
        setState("preload");
        const controller = new AbortController();
        controllerRef.current = controller;
        let promise;
        if (searchOptions.provider?.name === "algolia") {
            promise = submitAlgoliaDocsearchQuery(searchQuery, {
                ...searchOptions,
                signal: controller.signal,
            }).then((result) => result?.hits || []);
        }
        else {
            promise = submitSearchQueryToMarkprompt(searchQuery, projectKey, {
                ...searchOptions,
                signal: controller.signal,
            }).then((result) => {
                if (debug) {
                    // Show debug info return from Markprompt search API
                    // eslint-disable-next-line no-console
                    console.debug(JSON.stringify(result?.debug, null, 2));
                }
                return result?.data || [];
            });
        }
        promise.then((searchResults) => {
            if (controller.signal.aborted)
                return;
            if (!searchResults)
                return;
            var componentProps = searchResultsToSearchComponentProps(searchQuery, searchResults, searchOptions);
            setSearchResults(componentProps !== undefined && componentProps != null
                ? componentProps
                : []);
            // initially focus the first result
            setState("done");
        });
        promise?.catch((error) => {
            if (error.cause?.name !== "AbortError") {
                // todo: surface errors to the user
                // eslint-disable-next-line no-console
                console.error(error);
            }
        });
        promise?.finally(() => {
            if (controllerRef.current === controller) {
                controllerRef.current = undefined;
            }
        });
    }, [abort, projectKey, searchOptions, debug]);
    return useMemo(() => ({
        answer,
        isSearchEnabled: !!searchOptions?.enabled,
        searchProvider: searchOptions?.provider?.name,
        activeView,
        prompt,
        references,
        searchQuery,
        searchResults,
        state,
        abort,
        setActiveView,
        setPrompt,
        setSearchQuery,
        submitFeedback,
        submitPrompt,
        submitSearchQuery,
    }), [
        activeView,
        answer,
        prompt,
        references,
        searchOptions?.enabled,
        searchQuery,
        searchResults,
        state,
        abort,
        submitFeedback,
        submitPrompt,
        submitSearchQuery,
    ]);
}
function searchResultsToSearchComponentProps(query, searchResults, searchOptions) {
    return searchResults.map((result) => {
        return {
            href: (searchOptions?.getHref || DEFAULT_MARKPROMPT_OPTIONS.search.getHref)?.(result),
            heading: (searchOptions?.getHeading ||
                DEFAULT_MARKPROMPT_OPTIONS.search.getHeading)?.(result, query),
            title: (searchOptions?.getTitle || DEFAULT_MARKPROMPT_OPTIONS.search.getTitle)?.(result, query),
            subtitle: (searchOptions?.getSubtitle ||
                DEFAULT_MARKPROMPT_OPTIONS.search.getSubtitle)?.(result, query),
        };
    });
}
//# sourceMappingURL=useMarkprompt.js.map