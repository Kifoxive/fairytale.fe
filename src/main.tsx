import '@styles/_global.scss';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { Application } from 'core/application';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Application />
    </React.StrictMode>,
);
