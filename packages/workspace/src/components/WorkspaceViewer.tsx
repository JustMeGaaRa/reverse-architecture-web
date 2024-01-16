import { IViewDefinition, IWorkspace } from "@structurizr/dsl";
import { WorkspaceViewUpdater } from "@workspace/core";
import { FC, PropsWithChildren } from "react";
import { WorkspaceNavigationWrapper, WorkspaceViewSelector } from "../components";

export const WorkspaceViewer: FC<PropsWithChildren<{
    workspace: IWorkspace;
    initialView?: IViewDefinition;
    onViewChange?: (view: IViewDefinition) => void;
    onViewClick?: (event: React.MouseEvent) => void;
}>> = ({
    children,
    workspace,
    initialView,
    onViewChange,
    onViewClick
}) => {
    return (
        <WorkspaceNavigationWrapper
            onViewChange={onViewChange}
        >
            <WorkspaceViewUpdater
                workspace={workspace}
                currentView={initialView}
            />
            <WorkspaceViewSelector
                workspace={workspace}
                onViewClick={onViewClick}
            >
                {children}
            </WorkspaceViewSelector>
        </WorkspaceNavigationWrapper>
    )
}