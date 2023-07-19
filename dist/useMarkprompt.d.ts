import { type SubmitPromptOptions, type FileSectionReference } from "@markprompt/core";
import { type Dispatch, type SetStateAction } from "react";
import type { MarkpromptOptions, SearchResultComponentProps } from "./types.js";
export type LoadingState = "indeterminate" | "preload" | "streaming-answer" | "done";
export type View = "prompt" | "search";
export interface UseMarkpromptOptions {
    /** Render in a dialog or plain? */
    display?: MarkpromptOptions["display"];
    /** Display debug info */
    debug?: boolean;
    /** Project key, required */
    projectKey: string;
    /** Enable and configure prompt functionality */
    promptOptions?: Omit<SubmitPromptOptions, "signal">;
    /** Enable and configure search functionality */
    searchOptions?: MarkpromptOptions["search"];
}
export type UseMarkpromptResult = {
    /** The currently active view */
    activeView: View;
    /** The most recent answer */
    answer: string | undefined;
    /** Enable search functionality */
    isSearchEnabled: boolean;
    /** Custom search provider, e.g. 'algolia' */
    searchProvider: string | undefined;
    /** The current prompt */
    prompt: string;
    /** The references that belong to the latest answer */
    references: FileSectionReference[];
    /** Search results */
    searchResults: SearchResultComponentProps[];
    /** The current search query */
    searchQuery: string;
    /** The current state of request(s) */
    state: LoadingState;
    /** Abort a pending request */
    abort: () => void;
    /** Switch the active view between search and prompt */
    setActiveView: Dispatch<SetStateAction<View>>;
    /** Set a new value for the prompt */
    setPrompt: Dispatch<SetStateAction<string>>;
    /** Set a new value for the search query */
    setSearchQuery: Dispatch<SetStateAction<string>>;
    /** Submit user feedback */
    submitFeedback: (helpful: boolean) => Promise<void>;
    /** Submit the prompt */
    submitPrompt: () => Promise<void>;
    /** Submit search query */
    submitSearchQuery: (query: string) => void;
};
/**
 * A React hook with all the functionality you need to create an interactive
 * stateful Markprompt prompt with search and a prompt.
 */
export declare function useMarkprompt({ projectKey, searchOptions, promptOptions, debug, }: UseMarkpromptOptions): UseMarkpromptResult;
//# sourceMappingURL=useMarkprompt.d.ts.map