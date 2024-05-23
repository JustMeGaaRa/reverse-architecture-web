import { ChakraProvider } from "@chakra-ui/react";
import { LocalizationProvider, PageProvider, RestructTheme, ShellProvider } from "@restruct/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AccountProvider, enUSLocale, enUSLocaleStrings } from "./features";
import { routes } from "./routes";

const root = createRoot(document.getElementById("root"));
root.render(
    // <StrictMode>
        <LocalizationProvider defaultLocale={enUSLocale} defaultLocaleStrings={enUSLocaleStrings}>
            <AccountProvider>
                <ChakraProvider resetCSS theme={RestructTheme}>
                    <PageProvider>
                        <ShellProvider>
                            <RouterProvider router={routes} />
                        </ShellProvider>
                    </PageProvider>
                </ChakraProvider>
            </AccountProvider>
        </LocalizationProvider>
    // </StrictMode>
);