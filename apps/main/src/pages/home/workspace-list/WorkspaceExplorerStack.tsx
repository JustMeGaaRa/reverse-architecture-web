import { FC, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { AppleShortcuts } from "iconoir-react";
import { WorkspaceExplorer, WorkspaceExplorerProvider, WorkspaceSelectionProvider } from "../../../features";
import { WorkspaceStack, WorkspaceStackBody, WorkspaceStackHeader } from "./WorkspaceStack";

export const WorkspaceExplorerStack: FC = () => {
    const [ queryParams, setQueryParam ] = useSearchParams();

    const selectedGroupName = useMemo(() => queryParams.get("group"), [queryParams]);

    const handleOnClickWorkspaceStackClose = useCallback(() => {
        setQueryParam({});
    }, [setQueryParam]);
    
    return (
        <WorkspaceStack
            isOpen={!!selectedGroupName}
            onClose={handleOnClickWorkspaceStackClose}
        >
            <WorkspaceStackHeader
                title={selectedGroupName}
                icon={AppleShortcuts}
            />
            <WorkspaceStackBody>
                <WorkspaceSelectionProvider>
                    <WorkspaceExplorer
                        isActive={!!selectedGroupName}
                        filters={{ group: selectedGroupName, status: "private" }}
                        options={{ view: "card", group: false }}
                    />
                </WorkspaceSelectionProvider>
            </WorkspaceStackBody>
        </WorkspaceStack>
    )
}