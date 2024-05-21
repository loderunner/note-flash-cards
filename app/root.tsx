import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { Provider } from 'react-redux';
import Index from './routes/_index';
import { store } from './store';

import './root.css';

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <Outlet />
        </Provider>
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <Index />
        </Provider>
        <Scripts />
      </body>
    </html>
  );
}
