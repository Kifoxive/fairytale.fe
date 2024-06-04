export const config = {
    app: {
        url: 'http://localhost:5173',
        base_title: 'Fairytale',
    },
    api: {
        //     local server
        url: 'http://localhost:3000/api',
        websocketUrl:
            process.env.VITE_MODE === 'main' ? 'wss://api.qapline.k42.app' : 'wss://dev.qapline.api.koala42.com',
        mapboxToken: 'pk.eyJ1IjoiaHVsZGFjeiIsImEiOiJjbGJ6M2l3d2cwd2hyM3FvNXM5M2twb2RlIn0.nVPfoiec06LkIocNYRPoGA',
        endpoints: {
            reservation: '/reservation',
        },
    },
    routes: {
        home: '/',
        reservation: '/reservation',
        delivery: '/delivery',
        privacy: '/privacy',
        contact: '/contact',
        login: '/login',
    },
    nav: {
        home: 'home',
        reservation: 'reservation',
        delivery: 'delivery',
        contact: 'contact',
    },
};
