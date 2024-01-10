import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./app/App";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/thietke/source/index.html/1",
        element: <Home />,
      },
      {
        path: "/thietke/source/index.html/2",
        element: <div>Template 2</div>,
      },
      {
        path: "1",
        element: <Home />,
      },
      {
        path: "2",
        element: <div>2</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
