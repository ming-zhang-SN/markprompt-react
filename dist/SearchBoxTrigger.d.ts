import { type Dispatch, type ReactElement, type SetStateAction } from "react";
import { type MarkpromptOptions } from "./types.js";
interface SearchBoxTriggerProps {
    trigger: MarkpromptOptions["trigger"];
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
/**
 * A button that can be used to open the Markprompt dialog, styled as a search
 * input, displaying a keyboard shortcut. This trigger is relatively positioned
 * in the container where Markprompt is rendered.
 */
export declare function SearchBoxTrigger(props: SearchBoxTriggerProps): ReactElement;
export {};
//# sourceMappingURL=SearchBoxTrigger.d.ts.map