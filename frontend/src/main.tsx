import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router";
import { ErrorBoundary, ReactQueryClient } from "./components";
import "./index.css";
import router from "./route.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ReactQueryClient>
          <MantineProvider>
            <RouterProvider router={router} />
          </MantineProvider>
        </ReactQueryClient>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);
