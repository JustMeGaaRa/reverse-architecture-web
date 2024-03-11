import { IViewDefinition, IWorkspaceSnapshot } from "@structurizr/dsl";
import { WorkspaceUpdater, WorkspaceViewUpdater } from "@workspace/core";
import { FC, PropsWithChildren } from "react";
import { WorkspaceNavigationWrapper, WorkspaceViewSelector, WorkspaceWrapper } from "../components";

export const WorkspaceViewer: FC<PropsWithChildren<{
    workspace: IWorkspaceSnapshot;
    initialView?: IViewDefinition;
    onViewClick?: (event: React.MouseEvent) => void;
}>> = ({
    children,
    workspace,
    initialView,
    onViewClick
}) => {
    return (
        <WorkspaceWrapper>
            <WorkspaceNavigationWrapper>
                <WorkspaceUpdater workspace={workspace} />
                <WorkspaceViewUpdater workspace={workspace} currentView={initialView} />
                <WorkspaceViewSelector onViewClick={onViewClick}>
                    {children}
                </WorkspaceViewSelector>
            </WorkspaceNavigationWrapper>
        </WorkspaceWrapper>
    )
}