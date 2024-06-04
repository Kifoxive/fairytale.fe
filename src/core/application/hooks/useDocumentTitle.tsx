import { useEffect, useRef } from 'react';
import { config } from 'config';

export function useDocumentTitle(title: string, prevailOnUnmount = true) {
    const defaultTitle = useRef(config.app.base_title);

    useEffect(() => {
        document.title = `${title} | ${defaultTitle.current}`;
    }, [title]);

    useEffect(() => () => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current;
        }
    });
}
