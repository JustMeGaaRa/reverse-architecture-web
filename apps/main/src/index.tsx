import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@reversearchitecture/theme";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AccountProvider, NavigationProvider } from "./containers";
import { routes } from "./routes";

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <AccountProvider>
            <ChakraProvider resetCSS theme={theme}>
                <NavigationProvider>
                    <RouterProvider router={routes} />
                </NavigationProvider>
            </ChakraProvider>
        </AccountProvider>
    </StrictMode>
);