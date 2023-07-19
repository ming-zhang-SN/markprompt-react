import type { FileSectionReference } from '@markprompt/core';
import { type SetStateAction, type Dispatch } from 'react';
import type { SearchResultComponentProps } from './types.js';
import { type LoadingState, type View } from './useMarkprompt.js';
type State = {
    activeView: View;
    answer: string | undefined;
    isSearchEnabled: boolean;
    searchProvider: string | undefined;
    prompt: string;
    references: FileSectionReference[];
    searchQuery: string;
    searchResults: SearchResultComponentProps[];
    state: LoadingState;
};
type Actions = {
    abort: () => void;
    setActiveView: Dispatch<SetStateAction<View>>;
    setPrompt: Dispatch<SetStateAction<string>>;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    submitFeedback: (helpful: boolean) => void;
    submitPrompt: () => void;
    submitSearchQuery: (searchQuery: string) => void;
};
export declare const noop: () => void;
declare const MarkpromptContext: import("react").Context<State & Actions>;
declare function useMarkpromptContext(): State & Actions;
export { MarkpromptContext, useMarkpromptContext };
//# sourceMappingURL=context.d.ts.map