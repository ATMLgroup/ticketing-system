import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Provider} from "react-redux"
import {App} from "antd"
import store from "./services/redux/store"
import {Login} from "./pages/Login"
import {NotFound} from "./pages/NotFound"
import {Dashboard} from "./pages/Dashboard"
import {Index} from "./pages/Index";

const router = createBrowserRouter([
    {
      path:"/",
      element:  <Index/>
    },
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
       <Provider store={store}>
           <App>
               <RouterProvider router={router}/>
           </App>
       </Provider>
    </React.StrictMode>
);
