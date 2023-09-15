import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {App} from "antd"
import {Login} from "./pages/Login"
import {NotFound} from "./pages/NotFound"
import {Dashboard} from "./pages/Dashboard"

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
       <App>
           <RouterProvider router={router}/>
       </App>
    </React.StrictMode>
);
