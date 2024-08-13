import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { Auth0Provider } from "@auth0/auth0-react";
import { auth0Config } from './auth0-config'; // Import your Auth0 configuration

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={auth0Config.domain}
    clientId={auth0Config.clientId}
    redirectUri={auth0Config.redirectUri}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);

reportWebVitals();
