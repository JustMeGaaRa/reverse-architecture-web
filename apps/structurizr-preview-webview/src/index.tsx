import { ChakraProvider } from "@chakra-ui/react";
import { WorkspaceProvider } from "@structurizr/react";
import { RestructTheme } from "@restruct/theme";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ApplicationContainer } from "./ApplicationContainer";
import { WorkspaceNavigationProvider } from "@restruct/workspace-renderer";

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <ChakraProvider resetCSS theme={RestructTheme}>
            <WorkspaceProvider>
                <WorkspaceNavigationProvider>
                    <ApplicationContainer />
                </WorkspaceNavigationProvider>
            </WorkspaceProvider>
        </ChakraProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
