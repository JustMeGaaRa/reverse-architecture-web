import { FC, PropsWithChildren } from "react";
import { HomeNavigationActions } from "../HomeNavigationActions";
import { WorkspaceExplorerHeaderActions } from "./WorkspaceExplorerHeaderActions";
import { WorkspaceExplorerTabs } from "./WorkspaceExplorerTabs";
import { WorkspaceExplorerStack } from "./WorkspaceExplorerStack";
import { WorkspaceExplorerProvider } from "../../../features";
import { YjsDocumentProvider, YjsIndexeddbPersistanceProvider } from "@yjs/react";

export const WorkspaceExplorerPage: FC<PropsWithChildren> = ({ children }) => {
    return (
        <YjsDocumentProvider>
            <YjsIndexeddbPersistanceProvider>
                <WorkspaceExplorerProvider>
                    <HomeNavigationActions />
                    <WorkspaceExplorerHeaderActions />
                    <WorkspaceExplorerTabs />
                    <WorkspaceExplorerStack />
                </WorkspaceExplorerProvider>
            </YjsIndexeddbPersistanceProvider>
        </YjsDocumentProvider>
    )
}