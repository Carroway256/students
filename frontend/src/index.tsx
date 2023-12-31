import * as React from "react";
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/home",
        element: <App />,

      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")as HTMLElement).render(
  <RouterProvider router={router} />
);