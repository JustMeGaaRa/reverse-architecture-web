import { AddComponentViewAction, IncludeComponentViewComponentAction, IncludeComponentViewContainerAction, IncludeComponentViewPersonAction, IncludeComponentViewSoftwareSystemAction, SetComponentViewElementPositionAction } from "./ActionsComponentView";
import { AddContainerViewAction, IncludeContainerViewContainerAction, IncludeContainerViewPersonAction, IncludeContainerViewSoftwareSystemAction, SetContainerViewElementPositionAction } from "./ActionsContainerView";
import { AddModelComponentAction, AddModelContainerAction, AddModelContainerGroupAction, AddModelContainerInstanceToDeploymentNodeAction, AddModelDeploymentEnvironmentAction, AddModelDeploymentNodeAction, AddModelGroupAction, AddModelInfrastructureNodeToDeploymentNodeAction, AddModelPersonAction, AddModelRelationshipAction, AddModelSoftwareSystemAction, AddModelSoftwareSystemGroupAction, AddModelSoftwareSystemInstanceToDeploymentNodeAction } from "./ActionsModel";
import { AddSystemContextViewAction, IncludeSystemContextViewPersonAction, IncludeSystemContextViewSoftwareSystemAction, SetSystemContextViewElementPositionAction } from "./ActionsSystemContextView";
import { IncludeSystemLandscapeViewPersonAction, IncludeSystemLandscapeViewSoftwareSystemAction, SetSystemLandscapeViewAction, SetSystemLandscapeViewElementPositionAction } from "./ActionsSystemLandscapeView";
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
    | IncludeSystemLandscapeViewPersonAction
    | IncludeSystemLandscapeViewSoftwareSystemAction;

export type SystemContextViewAction =
    | AddSystemContextViewAction
    | SetSystemContextViewElementPositionAction
    | IncludeSystemContextViewPersonAction
    | IncludeSystemContextViewSoftwareSystemAction;

export type ContainerViewAction =
    | AddContainerViewAction
    | SetContainerViewElementPositionAction
    | IncludeContainerViewPersonAction
    | IncludeContainerViewSoftwareSystemAction
    | IncludeContainerViewContainerAction;

export type ComponentViewAction =
    | AddComponentViewAction
    | SetComponentViewElementPositionAction
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