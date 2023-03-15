import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactFlowProvider } from "@reactflow/core";
import { ChakraProvider } from "@chakra-ui/react";

import { routes } from "./routes";
import { theme } from "./theme";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ChakraProvider resetCSS theme={theme}>
            <ReactFlowProvider>
                <RouterProvider router={createBrowserRouter(routes)} />
            </ReactFlowProvider>
        </ChakraProvider>
    </React.StrictMode>
);
