import { type ReactElement } from "react";
import { type MarkpromptOptions } from "./types.js";
interface SearchViewProps {
    search?: MarkpromptOptions["search"];
    close?: MarkpromptOptions["close"];
    handleViewChange?: () => void;
    onDidSelectResult?: () => void;
}
export declare function SearchView(props: SearchViewProps): ReactElement;
export {};
//# sourceMappingURL=SearchView.d.ts.map