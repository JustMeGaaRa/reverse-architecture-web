import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { routes } from "./routes";
import { theme } from "./theme";

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <ChakraProvider resetCSS theme={theme}>
            <RouterProvider router={routes} />
        </ChakraProvider>
    </StrictMode>
);