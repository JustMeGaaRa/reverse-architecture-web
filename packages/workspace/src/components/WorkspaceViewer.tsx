import { IViewDefinition, IWorkspace } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { WorkspaceNavigationWrapper, WorkspaceViewSelector } from "../components";

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
        <WorkspaceNavigationWrapper
            initialView={initialView}
        >
            <WorkspaceViewSelector
                workspace={workspace}
                onViewClick={onViewClick}
            >
                {children}
            </WorkspaceViewSelector>
        </WorkspaceNavigationWrapper>
    )
}