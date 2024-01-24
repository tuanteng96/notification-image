import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./app/App";
import Home from "./pages/Home";
import Template2 from "./pages/Template2";
import Template3 from "./pages/Template3";
import Template4 from "./pages/Template4";
import Template5 from "./pages/Template5";
import Template6 from "./pages/Template6";

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
        path: "/thietke/source/index.html/3",
        element: <Template3 />,
      },
      {
        path: "/thietke/source/index.html/4",
        element: <Template4 />,
      },
      {
        path: "/thietke/source/index.html/5",
        element: <Template5 />,
      },
      {
        path: "/thietke/source/index.html/6",
        element: <Template6 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
