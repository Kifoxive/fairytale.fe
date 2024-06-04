import 'core/translation';
import 'styles/_global.scss';

import { Suspense } from 'react';
import { I18nProvider } from 'react-aria';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { config } from 'config';
import { Authenticated, LoginForm } from 'core/auth';
import { ErrorPage } from 'core/error';
import { HomePage, ReservationPage } from 'pages';
import { store } from 'store';

import { ContactPage } from '../../../../pages/ContactPage/ContactSection';
import { DeliveryPage } from '../../../../pages/DeliveryPage/DeliveryPage';

('4h');

const router = createBrowserRouter([
    {
        path: '/',
        element: <Authenticated />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: config.routes.home,
                element: <HomePage />,
                errorElement: <ErrorPage />,
            },
            {
                path: config.routes.reservation,
                element: <ReservationPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: config.routes.delivery,
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
        path: config.routes.login,
        element: <LoginForm />,
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
