import { Outlet } from 'react-router-dom';
import { Toast } from 'modules/ui';

import { Page } from '../Page';

export interface AuthenticatedLayoutProps {}

export const AuthenticatedLayout = ({}: AuthenticatedLayoutProps) => {
    return (
        <>
            <Page>
                <Outlet />
            </Page>
            <Toast />
        </>
    );
};
