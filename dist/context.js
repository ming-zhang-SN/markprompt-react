import { createContext, useContext, } from 'react';
import {} from './useMarkprompt.js';
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => { };
const MarkpromptContext = createContext({
    activeView: 'prompt',
    answer: undefined,
    isSearchEnabled: false,
    searchProvider: undefined,
    prompt: '',
    references: [],
    searchQuery: '',
    searchResults: [],
    state: 'indeterminate',
    abort: noop,
    setActiveView: noop,
    setPrompt: noop,
    setSearchQuery: noop,
    submitFeedback: noop,
    submitPrompt: noop,
    submitSearchQuery: noop,
});
function useMarkpromptContext() {
    return useContext(MarkpromptContext);
}
export { MarkpromptContext, useMarkpromptContext };
//# sourceMappingURL=context.js.map