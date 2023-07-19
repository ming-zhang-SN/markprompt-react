import { type RefObject } from 'react';
interface ElementSize {
    width: number;
    height: number;
}
declare function useElementSize<T extends Element>(): [RefObject<T>, ElementSize];
export { useElementSize };
//# sourceMappingURL=useElementSize.d.ts.map