import 'core/translation';
import 'styles/_global.scss';

import { Suspense } from 'react';
import { I18nProvider } from 'react-aria';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { config } from 'config';
import { Authenticated, LoginPage, RegisterPage } from 'core/auth';
import { ErrorPage } from 'core/error';
import { Page } from 'modules/layout';
import { ReservationPage, ReservationTablePage } from 'modules/reservations';
import { HomePage } from 'pages';
import { store } from 'store';

import { DeliveryPage } from '../../../../modules/deliveries/components/DeliveryPage/DeliveryPage';
import { ContactPage } from '../../../../pages/ContactPage/ContactSection';
import { DeliveryTablePage } from 'modules/deliveries';

('24h');

const router = createBrowserRouter([
    {
        path: '/',
        element: <Page />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: config.routes.home,
                element: <HomePage />,
                errorElement: <ErrorPage />,
            },
            {
                path: config.routes.reservation.page,
                element: <ReservationPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: config.routes.delivery.page,
                element: <DeliveryPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: config.routes.contact,
                element: <ContactPage />,
                errorElement: <ErrorPage />,
            },
        ],
    },
    {
        path: '/',
        element: <Authenticated />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: config.routes.reservation.table,
                element: <ReservationTablePage />,
                errorElement: <ErrorPage />,
            },
            { path: config.routes.delivery.table, element: <DeliveryTablePage />, errorElement: <ErrorPage /> },
        ],
    },
    {
        path: config.routes.login,
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: config.routes.register,
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
    },
]);

export const Application = () => (
    <Provider store={store}>
        <I18nProvider locale="cs-CZ">
            <Suspense fallback={<div>loading...</div>}>
                <RouterProvider router={router} />
            </Suspense>
        </I18nProvider>
    </Provider>
);
