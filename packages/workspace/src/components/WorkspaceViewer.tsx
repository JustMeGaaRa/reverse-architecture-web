import { IViewDefinition, IWorkspace } from "@structurizr/dsl";
import { WorkspaceViewUpdater } from "@workspace/core";
import { FC, PropsWithChildren } from "react";
import { WorkspaceNavigationWrapper, WorkspaceViewSelector, WorkspaceWrapper } from "../components";

export const WorkspaceViewer: FC<PropsWithChildren<{
    workspace: IWorkspace;
    initialView?: IViewDefinition;
    onViewClick?: (event: React.MouseEvent) => void;
}>> = ({
    children,
    workspace,
    initialView,
    onViewClick
}) => {
    return (
        <WorkspaceWrapper initialWorkspace={workspace}>
            <WorkspaceNavigationWrapper>
                <WorkspaceViewUpdater workspace={workspace} currentView={initialView} />
                <WorkspaceViewSelector onViewClick={onViewClick}>
                    {children}
                </WorkspaceViewSelector>
            </WorkspaceNavigationWrapper>
        </WorkspaceWrapper>
    )
}