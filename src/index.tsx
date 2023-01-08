import "reactflow/dist/style.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { routes } from "./routes";
import { theme } from "./theme";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ChakraProvider resetCSS theme={theme}>
            <RouterProvider router={createBrowserRouter(routes)} />
        </ChakraProvider>
    </React.StrictMode>
);
