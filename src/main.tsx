import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from './AppRoutes.tsx';
import { resolver, theme } from './core/utility/constants/core.constant.ts';
// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Provider } from 'react-redux';
import AppShell from './AppShell.tsx';
import './index.css';
import { store } from './store/store.ts';
import { Auth0Provider } from '@auth0/auth0-react'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Auth0Provider clientId='7r31d0stc7uRmxV4ImSuKhiSdaNWsxFM' domain='dev-vf8j6fx765bq08e6.us.auth0.com' authorizationParams={{ redirect_uri: 'http://localhost:5173/callback' }}>
        <Provider store={store}>
            <MantineProvider theme={theme} cssVariablesResolver={resolver}>
                <AppShell />
                <AppRoutes />
            </MantineProvider>
        </Provider>
    </Auth0Provider>
);
