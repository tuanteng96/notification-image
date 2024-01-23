import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./app/App";
import Home from "./pages/Home";
import Template2 from "./pages/Template2";

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
        element: <Template2 />,
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
