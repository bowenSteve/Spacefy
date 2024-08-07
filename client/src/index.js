import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes"

const router = createBrowserRouter(routes);
=======
import LoginPage from './LoginPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginPage/>
  </React.StrictMode>
);
>>>>>>> de535bb5ad1b1717befd7398981328dc2f21162c

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
reportWebVitals();
