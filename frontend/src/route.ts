import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const Home = lazy(() => import("./pages/App"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    children: [{ Component: Home, index: true }],
    hasErrorBoundary: true,
  },
  { path: "*", Component: NotFound },
]);

export default router;
