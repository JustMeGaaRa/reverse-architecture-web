import { ChakraProvider } from "@chakra-ui/react";
import { RestructTheme } from "@restruct/theme";
import { WorkspaceNavigationProvider } from "@structurizr/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ApplicationContainer } from "./ApplicationContainer";

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <ChakraProvider resetCSS theme={RestructTheme}>
            <WorkspaceNavigationProvider>
                <ApplicationContainer />
            </WorkspaceNavigationProvider>
        </ChakraProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
