import { IViewDefinition, IWorkspace, ViewKeys, ViewType } from "@structurizr/dsl";

export const getViewDefinition = (workspace: IWorkspace, viewDefinition?: ViewKeys) => {
    const defaultView: IViewDefinition = {
        type: viewDefinition?.type ?? ViewType.SystemLandscape,
        title: viewDefinition?.title ?? viewDefinition?.type ?? ViewType.SystemLandscape,
        identifier: viewDefinition?.identifier ?? "default",
        elements: [],
        relationships: []
    };
    const existingByIdentifier =
        [workspace.views.systemLandscape].find(x => x?.type === viewDefinition?.type)
        ?? workspace.views.systemContexts.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.containers.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.components.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.deployments.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier);
    const existingByType = 
        [workspace.views.systemLandscape].find(x => x?.type === viewDefinition?.type)
        ?? workspace.views.systemContexts.find(x => x.type === viewDefinition?.type)
        ?? workspace.views.containers.find(x => x.type === viewDefinition?.type)
        ?? workspace.views.components.find(x => x.type === viewDefinition?.type)
        ?? workspace.views.deployments.find(x => x.type === viewDefinition?.type);
    
    return existingByIdentifier ?? existingByType ?? defaultView;
}