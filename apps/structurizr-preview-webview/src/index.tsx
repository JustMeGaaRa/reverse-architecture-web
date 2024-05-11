import { ChakraProvider } from "@chakra-ui/react";
import { WorkspaceProvider } from "@structurizr/react";
import { RestructTheme } from "@restruct/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ApplicationContainer } from "./ApplicationContainer";
import { WorkspaceRenderer } from "./WorkspaceRenderer";
import { WorkspaceNavigationProvider } from "./WorkspaceNavigationProvider";

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <ChakraProvider resetCSS theme={RestructTheme}>
            <WorkspaceProvider>
                <WorkspaceNavigationProvider>
                    <ApplicationContainer>
                        <WorkspaceRenderer />
                    </ApplicationContainer>
                </WorkspaceNavigationProvider>
            </WorkspaceProvider>
        </ChakraProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
