import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { AppShell, MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { resolver, theme } from './core/utility/constants/core.constant';
import { store } from './store/store';

function App() {
  // const navigate = useNavigate();
  const onRedirectCallback = (appState?: AppState) => {
    console.log(appState);

    // navigate(
    //   appState?.returnTo || window.location.pathname + window.location.search
    // );
  };
  return (
    <Auth0Provider clientId='7r31d0stc7uRmxV4ImSuKhiSdaNWsxFM' domain='dev-vf8j6fx765bq08e6.us.auth0.com' onRedirectCallback={onRedirectCallback} authorizationParams={{ redirect_uri: 'http://localhost:5173/callback' }}>
      <Provider store={store}>
        <BrowserRouter>
          <MantineProvider theme={theme} cssVariablesResolver={resolver}>
            <AppShell />
            <AppRoutes />
          </MantineProvider>
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  );
}

export default App;
