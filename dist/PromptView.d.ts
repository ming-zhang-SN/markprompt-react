import { type ReactElement } from "react";
import { type MarkpromptOptions } from "./types.js";
interface PromptViewProps {
    prompt: MarkpromptOptions["prompt"];
    references: MarkpromptOptions["references"];
    close?: MarkpromptOptions["close"];
    onDidSelectReference?: () => void;
}
export declare function PromptView(props: PromptViewProps): ReactElement;
export {};
//# sourceMappingURL=PromptView.d.ts.map