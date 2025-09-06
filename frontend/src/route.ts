import { createBrowserRouter } from "react-router";
import { App } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    index: true,
  },
]);

export default router;
