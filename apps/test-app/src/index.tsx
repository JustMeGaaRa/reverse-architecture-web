import { ChakraProvider } from "@chakra-ui/react";
import { RestructTheme } from "@restruct/theme";
import { WorkspaceNavigationProvider } from "@structurizr/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <ChakraProvider resetCSS theme={RestructTheme}>
            <WorkspaceNavigationProvider>
                <App />
            </WorkspaceNavigationProvider>
        </ChakraProvider>
    </React.StrictMode>
);