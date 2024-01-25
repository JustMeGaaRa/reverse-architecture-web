import { ChakraProvider } from "@chakra-ui/react";
import { RestructTheme } from "@reversearchitecture/theme";
import { LocalizationProvider, PageProvider } from "@reversearchitecture/ui";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AccountProvider, enUSLocale, enUSLocaleStrings } from "./features";
import { routes } from "./routes";

const root = createRoot(document.getElementById("root"));
root.render(
    <LocalizationProvider defaultLocale={enUSLocale} defaultLocaleStrings={enUSLocaleStrings}>
        <AccountProvider>
            <ChakraProvider resetCSS theme={RestructTheme}>
                <PageProvider>
                    <RouterProvider router={routes} />
                </PageProvider>
            </ChakraProvider>
        </AccountProvider>
    </LocalizationProvider>
);