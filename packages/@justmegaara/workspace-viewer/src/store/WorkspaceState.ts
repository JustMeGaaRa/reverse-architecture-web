import { GenericView, ViewPath, Workspace } from "@justmegaara/structurizr-dsl";

export type WorkspaceState = {
    workspace: Workspace;
    selectedView?: GenericView;
    viewPath: ViewPath;
};
