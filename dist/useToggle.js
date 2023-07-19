import { useMemo, useState } from 'react';
export function useToggle(initial) {
    const [on, set] = useState(initial);
    return useMemo(() => [on, () => set((prev) => !prev)], [on]);
}
//# sourceMappingURL=useToggle.js.map