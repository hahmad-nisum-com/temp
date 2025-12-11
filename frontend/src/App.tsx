import { BrowserRouter } from 'react-router-dom';
import { Router } from '@/router/component';
import { useEnv } from './hooks/use-env';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './providers/theme-provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConditionalWrapper } from '@/modules/shared/components/wrappers';
import { RouterListener } from './router/component/RouterListener';

function App() {
  const env = useEnv();

  useEffect(() => {
    console.log('Current Environment:', env.APP_ENV);
    console.log('API URL:', env.API_URL);
    console.log('App Title:', env.APP_TITLE);
  }, [env]);

  return (
    <Provider store={store}>
      <ConditionalWrapper
        condition={!!env.GOOGLE_AUTH_ENABLED}
        wrapperProps={{ clientId: env.GOOGLE_CLIENT_ID || '' }}
        wrapper={(children, props) => (
          <GoogleOAuthProvider {...props} clientId={env.GOOGLE_CLIENT_ID || ''}>
            {children}
          </GoogleOAuthProvider>
        )}
      >
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          <BrowserRouter>
            <Router />
            <RouterListener />
          </BrowserRouter>
        </ThemeProvider>
      </ConditionalWrapper>
    </Provider>
  );
}

export default App;
