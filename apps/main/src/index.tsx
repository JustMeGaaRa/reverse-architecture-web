import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@reversearchitecture/theme";
import { PageProvider } from "@reversearchitecture/ui";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AccountProvider } from "./features";
import { routes } from "./routes";

const root = createRoot(document.getElementById("root"));
root.render(
    <AccountProvider>
        <ChakraProvider resetCSS theme={theme}>
            <PageProvider>
                <RouterProvider router={routes} />
            </PageProvider>
        </ChakraProvider>
    </AccountProvider>
);