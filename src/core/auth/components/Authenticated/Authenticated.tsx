import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { config } from 'config';
import { useRefreshTokenMutation } from 'core/api';
import { setToken } from 'core/auth/services';
import { useAppDispatch } from 'hooks';
import { AuthenticatedLayout } from 'modules/layout';
import { Spinner } from 'modules/ui';

import { useAuth } from '../../hooks';

export const Authenticated = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAuth();

    const location = useLocation();

    const [refreshToken] = useRefreshTokenMutation();
    useEffect(() => {
        if (!isAuthenticated) {
            refreshToken({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    if (isAuthenticated === null) {
        const token = localStorage.getItem('accessToken');
        if (token) {
            dispatch(setToken(token));
            return <Spinner fullScreen />;
        }
        return <Navigate to={config.routes.login} replace={true} />;
    }

    if (isAuthenticated === false) {
        return <Navigate to={config.routes.login} replace={true} />;
    }

    return <AuthenticatedLayout />;
};
