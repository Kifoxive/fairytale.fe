import { useRouteError } from 'react-router-dom';

import styles from './ErrorPage.module.scss';

interface Error {
    statusText?: string;
    message?: string;
}

export const ErrorPage = () => {
    const error = useRouteError() as Error;
    console.error(error);

    return (
        <div className={styles.container}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <code>{error.statusText || error.message}</code>
        </div>
    );
};
