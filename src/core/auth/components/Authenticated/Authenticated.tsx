import { Navigate } from 'react-router-dom';
import { config } from 'config';
import { useGetMeQuery } from 'core/api';
import { Page } from 'modules/layout';
import { Spinner } from 'modules/ui';

import { useAuth } from '../../hooks';

export const Authenticated = () => {
    // const dispatch = useAppDispatch();
    const { isAuthenticated } = useAuth();

    // useGetMeQuery(null);
    // useSetLanguage();

    if (isAuthenticated === null) {
        return <Spinner fullScreen />;
    } else if (isAuthenticated === false) {
        return <Navigate to={config.routes.login} replace={true} />;
    }

    return <Page />;
};
