export const config = {
    app: {
        url: 'http://localhost:5173',
        base_title: 'Fairytale',
    },
    api: {
        //     local server
        url: 'http://localhost:3000/api',
        // websocketUrl:
        //     process.env.VITE_MODE === 'main' ? 'wss://api.qapline.k42.app' : 'wss://dev.qapline.api.koala42.com',
        // mapboxToken: 'pk.eyJ1IjoiaHVsZGFjeiIsImEiOiJjbGJ6M2l3d2cwd2hyM3FvNXM5M2twb2RlIn0.nVPfoiec06LkIocNYRPoGA',
        endpoints: {
            // authentication
            register: '/auth/register',
            login: '/auth/login',
            refresh: '/auth/refresh',
            me: '/auth/me',
            logout: '/auth/logout',
            // reservation
            reservation: '/reservation',
            // user
            emailAvailability: '/user/emailAvailability',
        },
    },
    routes: {
        home: '/',
        reservation: {
            page: '/reservation',
            table: '/reservation/table',
            detail: '/reservation/:id',
        },
        delivery: {
            page: '/delivery',
            table: '/delivery/table',
            detail: '/delivery/:id',
        },
        privacy: '/privacy',
        contact: '/contact',
        login: '/login',
        register: '/register',
        resetPassword: '/resetPassword',
    },
    nav: {
        home: 'home',
        reservation: {
            page: 'reservation.page',
            table: 'reservation.table',
            detail: 'reservation.detail',
        },
        delivery: {
            page: 'delivery.page',
            table: 'delivery.table',
            detail: 'delivery.detail',
        },
        contact: 'contact',
    },
};
