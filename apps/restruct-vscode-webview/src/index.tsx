import { ChakraProvider } from "@chakra-ui/react";
import { RestructTheme } from "@restruct/theme";
import { WorkspaceNavigationProvider } from "@structurizr/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WorkspacePreview } from "./WorkspacePreview";

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <ChakraProvider resetCSS theme={RestructTheme}>
            <WorkspaceNavigationProvider>
                <WorkspacePreview />
            </WorkspaceNavigationProvider>
        </ChakraProvider>
    </StrictMode>
);
