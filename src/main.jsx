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
import Template7 from "./pages/Template7";
import Template8 from "./pages/Template8";
import Template9 from "./pages/Template9";
import Template10 from "./pages/Template10";
import Template11 from "./pages/Template11";
import Template12 from "./pages/Template12";
import Template13 from "./pages/Template13";
import Template14 from "./pages/Template14";
import Template15 from "./pages/Template15";
import Template16 from "./pages/Template16";
import Template17 from "./pages/Template17";
import Template18 from "./pages/Template18";
import Template19 from "./pages/Template19";

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
      {
        path: "/thietke/source/index.html/7",
        element: <Template7 />,
      },
      {
        path: "/thietke/source/index.html/8",
        element: <Template8 />,
      },
      {
        path: "/thietke/source/index.html/9",
        element: <Template9 />,
      },
      {
        path: "/thietke/source/index.html/10",
        element: <Template10 />,
      },
      {
        path: "/thietke/source/index.html/11",
        element: <Template11 />,
      },
      {
        path: "/thietke/source/index.html/12",
        element: <Template12 />,
      },
      {
        path: "/thietke/source/index.html/13",
        element: <Template13 />,
      },
      {
        path: "/thietke/source/index.html/14",
        element: <Template14 />,
      },
      {
        path: "/thietke/source/index.html/15",
        element: <Template15 />,
      },
      {
        path: "/thietke/source/index.html/16",
        element: <Template16 />,
      },
      {
        path: "/thietke/source/index.html/17",
        element: <Template17 />,
      },
      {
        path: "/thietke/source/index.html/18",
        element: <Template18 />,
      },
      {
        path: "/thietke/source/index.html/19",
        element: <Template19 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
