import { type ReactElement } from "react";
import * as BaseMarkprompt from "./primitives/headless.js";
import { type MarkpromptOptions } from "./types.js";
type MarkpromptProps = MarkpromptOptions & Omit<BaseMarkprompt.RootProps, "activeView" | "children" | "open" | "onOpenChange" | "promptOptions" | "searchOptions"> & {
    projectKey: string;
    onDidRequestOpenChange?: (open: boolean) => void;
};
/**
 * Open Markprompt programmatically. Useful for building a custom trigger
 * or opening the Markprompt dialog in response to other user actions.
 */
declare function openMarkprompt(): void;
declare function Markprompt(props: MarkpromptProps): ReactElement;
export { Markprompt, openMarkprompt, type MarkpromptProps };
//# sourceMappingURL=Markprompt.d.ts.map