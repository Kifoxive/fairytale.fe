import { useState } from 'react';

export const useAbortController = () => {
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());
    const abort = () => {
        const newAbortController = new AbortController();
        setAbortController((prev) => {
            prev?.abort();
            return newAbortController;
        });
        return newAbortController.signal;
    };

    return { abortController, abort };
};
