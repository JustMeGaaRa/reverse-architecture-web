import { IViewDefinition, Workspace } from "@structurizr/dsl";
import { WorkspaceViewUpdater } from "@workspace/core";
import { FC, PropsWithChildren } from "react";
import { WorkspaceNavigationWrapper, WorkspaceViewSelector } from "../components";

export const WorkspaceViewer: FC<PropsWithChildren<{
    workspace: Workspace;
    initialView?: IViewDefinition;
    onChange?: (workspace: Workspace) => void;
    onViewChange?: (view: IViewDefinition) => void;
    onViewClick?: (event: React.MouseEvent) => void;
}>> = ({
    children,
    workspace,
    initialView,
    onChange,
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
                onChange={onChange}
                onViewClick={onViewClick}
            >
                {children}
            </WorkspaceViewSelector>
        </WorkspaceNavigationWrapper>
    )
}