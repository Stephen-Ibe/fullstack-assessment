import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const Home = lazy(() => import("./pages/App"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UserPost = lazy(() => import("./pages/UserPost"));

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { Component: Home, index: true },
      { Component: UserPost, path: "/:userId/posts" },
    ],
    // errorElement: <ErrorElement />,
  },
  { path: "*", Component: NotFound },
]);

export default router;
