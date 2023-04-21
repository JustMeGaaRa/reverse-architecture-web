import { GenericView, Workspace, WorkspaceLayout } from "@justmegaara/structurizr-dsl";

export type Level = {
    view: GenericView;
}

export type WorkspaceState = {
    workspace: Workspace;
    layout: WorkspaceLayout;
    levels: Array<Level>;
};
