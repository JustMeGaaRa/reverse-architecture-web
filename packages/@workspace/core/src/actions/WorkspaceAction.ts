import { AddComponentViewAction, IncludeComponentViewComponentAction, IncludeComponentViewContainerAction, IncludeComponentViewPersonAction, IncludeComponentViewSoftwareSystemAction, SetComponentViewElementDimensionsAction, SetComponentViewElementPositionAction } from "./ActionsComponentView";
import { AddContainerViewAction, IncludeContainerViewContainerAction, IncludeContainerViewPersonAction, IncludeContainerViewSoftwareSystemAction, SetContainerViewElementDimensionsAction, SetContainerViewElementPositionAction } from "./ActionsContainerView";
import { AddModelComponentAction, AddModelContainerAction, AddModelContainerGroupAction, AddModelContainerInstanceToDeploymentNodeAction, AddModelDeploymentEnvironmentAction, AddModelDeploymentNodeAction, AddModelGroupAction, AddModelInfrastructureNodeToDeploymentNodeAction, AddModelPersonAction, AddModelRelationshipAction, AddModelSoftwareSystemAction, AddModelSoftwareSystemGroupAction, AddModelSoftwareSystemInstanceToDeploymentNodeAction } from "./ActionsModel";
import { AddSystemContextViewAction, IncludeSystemContextViewPersonAction, IncludeSystemContextViewSoftwareSystemAction, SetSystemContextViewElementDimensionsAction, SetSystemContextViewElementPositionAction } from "./ActionsSystemContextView";
import { IncludeSystemLandscapeViewPersonAction, IncludeSystemLandscapeViewSoftwareSystemAction, SetSystemLandscapeViewAction, SetSystemLandscapeViewElementDimensionsAction, SetSystemLandscapeViewElementPositionAction } from "./ActionsSystemLandscapeView";
import { SetWorkspaceAction } from "./ActionsWorkspace";

export type DeploymentEnvironmentAction =
    | AddModelDeploymentNodeAction
    | AddModelInfrastructureNodeToDeploymentNodeAction
    | AddModelSoftwareSystemInstanceToDeploymentNodeAction
    | AddModelContainerInstanceToDeploymentNodeAction;

export type ModelAction = 
    | AddModelGroupAction
    | AddModelPersonAction
    | AddModelSoftwareSystemAction
    | AddModelSoftwareSystemGroupAction
    | AddModelContainerAction
    | AddModelContainerGroupAction
    | AddModelComponentAction
    | AddModelDeploymentEnvironmentAction
    | DeploymentEnvironmentAction
    | AddModelRelationshipAction;

export type SystemLandscapeViewAction =
    | SetSystemLandscapeViewAction
    | SetSystemLandscapeViewElementPositionAction
    | SetSystemLandscapeViewElementDimensionsAction
    | IncludeSystemLandscapeViewPersonAction
    | IncludeSystemLandscapeViewSoftwareSystemAction;

export type SystemContextViewAction =
    | AddSystemContextViewAction
    | SetSystemContextViewElementPositionAction
    | SetSystemContextViewElementDimensionsAction
    | IncludeSystemContextViewPersonAction
    | IncludeSystemContextViewSoftwareSystemAction;

export type ContainerViewAction =
    | AddContainerViewAction
    | SetContainerViewElementPositionAction
    | SetContainerViewElementDimensionsAction
    | IncludeContainerViewPersonAction
    | IncludeContainerViewSoftwareSystemAction
    | IncludeContainerViewContainerAction;

export type ComponentViewAction =
    | AddComponentViewAction
    | SetComponentViewElementPositionAction
    | SetComponentViewElementDimensionsAction
    | IncludeComponentViewPersonAction
    | IncludeComponentViewSoftwareSystemAction
    | IncludeComponentViewContainerAction
    | IncludeComponentViewComponentAction;

export type ViewsAction =
    | SystemLandscapeViewAction
    | SystemContextViewAction
    | ContainerViewAction
    | ComponentViewAction;

export type WorkspaceAction =
    | SetWorkspaceAction
    | ModelAction
    | ViewsAction;