import { DependencyList, EffectCallback, useEffect, useState } from 'react';

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * @param {Function} effect
 * @param {Array<any>} deps
 * @param {Array<any>} asyncDeps deps which must not be falsy
 */

export default function useChange(effect: EffectCallback, deps: DependencyList, asyncDeps?: DependencyList) {
    const [value, setValue] = useState<string | null>(null);

    useEffect(() => {
        // sometimes some dependencies are falsy while fetching from BE
        if (asyncDeps?.some((value) => !value)) {
            return;
            // on first render do not update the state
        } else if (value === null) {
            setValue(JSON.stringify(deps));
        } else if (JSON.stringify(deps) !== value) {
            setValue(JSON.stringify(deps));
            return effect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
