import { IView, ViewPath, Workspace } from "@structurizr/dsl";

export type WorkspaceState = {
    workspace: Workspace;
    selectedView?: IView;
    viewPath: ViewPath;
};
