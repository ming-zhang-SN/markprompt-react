import { type ComponentPropsWithoutRef, type ReactElement } from "react";
import * as BaseMarkprompt from "./primitives/headless.js";
import type { MarkpromptOptions } from "./types.js";
interface MarkpromptFormProps {
    label: string;
    placeholder: string;
    inputProps?: ComponentPropsWithoutRef<typeof BaseMarkprompt.Prompt>;
    icon?: "search" | "prompt" | undefined;
    close?: MarkpromptOptions["close"];
}
export declare function MarkpromptForm(props: MarkpromptFormProps): ReactElement;
export {};
//# sourceMappingURL=MarkpromptForm.d.ts.map