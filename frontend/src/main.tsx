import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router";
import { ReactQueryClient } from "./components";
import "./index.css";
import router from "./route.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ReactQueryClient>
        <MantineProvider>
          <RouterProvider router={router} />
        </MantineProvider>
      </ReactQueryClient>
    </HelmetProvider>
  </StrictMode>
);
