console.log(process.env);

export const config = {
    app: {
        url: 'http://localhost:5173',
        base_title: 'Fairytale',
    },
    api: {
        //     local server
        url: 'http://localhost:3001/api',
        // production server
        // url: 'https://fairytale-be.netlify.app/api',
        // url: process.env.VITE_MODE === 'main' ? 'https://fairytale-be.netlify.app/api' : 'http://localhost:3001/api',
        // mapboxToken: 'pk.eyJ1IjoiaHVsZGFjeiIsImEiOiJjbGJ6M2l3d2cwd2hyM3FvNXM5M2twb2RlIn0.nVPfoiec06LkIocNYRPoGA',
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
            changeReservationStatus: '/reservation/change-status',
            // meal category
            mealCategory: '/meal-category',
            mealCategoryList: '/meal-category/list',
            // meal
            meal: '/meal',
            mealFile: '/meal/file',
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
        menu: {
            table: '/menu/table',
        },
        meal: { detail: '/meal/:id', new: '/meal/new' },
        mealCategory: { detail: '/meal-category/:id', new: '/meal-category/new' },
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
        menu: {
            table: 'menu.table',
        },
        meal: {
            detail: 'meal.detail',
            new: 'meal.new',
        },
        category: {
            detail: 'mealCategory.detail',
            new: 'mealCategory.new',
        },
        contact: 'contact',
    },
};
