import {
    Workspace,
    ViewType,
    ViewKeys,
    IWorkspace,
    IWorkspaceMetadata,
    WorkspaceMetadata,
    IViewDefinition,
} from "@structurizr/dsl";
import { create } from "zustand";

export type WorkspaceStore = {
    workspace: IWorkspace;
    selectedView: IViewDefinition;
    selectedViewPath: Array<ViewKeys>;
};

export const useWorkspaceStore = create<WorkspaceStore>(() => ({
    workspace: Workspace.Empty.toObject(),
    selectedView: {
        type: ViewType.SystemLandscape,
        identifier: "SystemLandscape",
        elements: [],
        relationships: []
    },
    selectedViewPath: [],
}));

export type WorkspaceMetadataStore = {
    metadata: IWorkspaceMetadata;
}

export const useWorkspaceMetadataStore = create<WorkspaceMetadataStore>(() => ({
    metadata: WorkspaceMetadata.Empty.toObject()
}))

export const WorkspaceViewsSelector = (state: WorkspaceStore) => {
    const selectedView = state.selectedView;

    return {
        systemLandscape: [state.workspace.views.systemLandscape]
            .filter(view => view?.identifier === selectedView?.identifier
                && view?.type === selectedView?.type),
        systemContexts: state.workspace.views.systemContexts
            .filter(view => view.type === selectedView?.type
                && view.identifier === selectedView?.identifier),
        containers: state.workspace.views.containers
            .filter(view => view.type === selectedView?.type
                && view.identifier === selectedView?.identifier),
        components: state.workspace.views.components
            .filter(view => view.type === selectedView?.type
                && view.identifier === selectedView?.identifier),
        deployments: state.workspace.views.deployments
            .filter(view => view.type === selectedView?.type
                && view.identifier === selectedView?.identifier
                && view.environment === selectedView?.["environment"]),
    }
}

export type Action<TParam> = (state: WorkspaceStore, param: TParam) => void;

export type Func<TParam, TResult> = (param: TParam) => TResult;