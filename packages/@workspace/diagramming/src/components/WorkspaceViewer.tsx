import { Connection } from "@reactflow/core";
import { ElementType, IElement, IViewDefinition, IWorkspaceSnapshot, Position, ViewType } from "@structurizr/dsl";
import { FC, PropsWithChildren, useCallback } from "react";
import { useWorkspaceToolbarStore } from "../hooks";
import { ComponentView } from "./ComponentView";
import { ContainerView } from "./ContainerView";
import { DeploymentView } from "./DeploymentView";
import { Model } from "./Model";
import { SystemContextView } from "./SystemContextView";
import { SystemLandscapeView } from "./SystemLandscapeView";
import { Views } from "./Views";
import { Workspace } from "./Workspace";

export const WorkspaceViewer: FC<PropsWithChildren<{
    workspace: IWorkspaceSnapshot;
    view: IViewDefinition;
}>> = ({
    children,
    workspace,
    view
}) => {
    const { enabledTool, addingElementType } = useWorkspaceToolbarStore();

    const handleOnElementClick = useCallback((event: React.MouseEvent, element: IElement, relativePosition: Position) => {
        if (view && enabledTool === "adding-element") {
            switch (view?.type) {
                case ViewType.Model:
                    break;
                case ViewType.SystemLandscape:
                    switch (addingElementType) {
                        case ElementType.SoftwareSystem:
                            // addSoftwareSystem(pointRelativeToNode, groupId);
                            break;
                        case ElementType.Person:
                            // addPerson(pointRelativeToNode, groupId);
                            break;
                    }
                    break;
                case ViewType.SystemContext:
                    switch (addingElementType) {
                        case ElementType.SoftwareSystem:
                            // addSoftwareSystem(pointRelativeToNode, node.id)
                            break;
                        case ElementType.Person:
                            // addPerson(pointRelativeToNode, node.id)
                            break;
                    }
                    break;
                case ViewType.Container:
                    switch (addingElementType) {
                        case ElementType.Group:
                            // addGroup(pointRelativeToNode);
                            break;
                        case ElementType.Container:
                            // addContainer(pointRelativeToNode, groupId);
                            break;
                    }
                    break;
                case ViewType.Component:
                    switch (addingElementType) {
                        case ElementType.Group:
                            // addGroup(pointRelativeToNode);
                            break;
                        case ElementType.Component:
                            // addComponent(pointRelativeToNode, groupId);
                            break;
                    }
                    break;
                case ViewType.Deployment:
                    break;
            }
        }
    }, [addingElementType, view, enabledTool]);

    const handleOnViewClick = useCallback((event: React.MouseEvent, relativePosition: Position) => {
        if (view && enabledTool === "adding-element") {
            switch (view?.type) {
                case ViewType.Model:
                    break;
                case ViewType.SystemLandscape:
                    switch (addingElementType) {
                        case ElementType.Group:
                            // addGroup(pointTranslatedFromViewport);
                            break;
                        case ElementType.SoftwareSystem:
                            // addSoftwareSystem(pointTranslatedFromViewport);
                            break;
                        case ElementType.Person:
                            // addPerson(pointTranslatedFromViewport);
                            break;
                    }
                    break;
                case ViewType.SystemContext:
                    switch (addingElementType) {
                        case ElementType.Group:
                            // addGroup(pointTranslatedFromViewport)
                            break;
                        case ElementType.SoftwareSystem:
                            // addSoftwareSystem(pointTranslatedFromViewport)
                            break;
                        case ElementType.Person:
                            // addPerson(pointTranslatedFromViewport)
                            break;
                    }
                    break;
                case ViewType.Container:
                    switch (addingElementType) {
                        case ElementType.SoftwareSystem:
                            // addSoftwareSystem(pointTranslatedFromViewport);
                            break;
                        case ElementType.Person:
                            // addPerson(pointTranslatedFromViewport);
                            break;
                    }
                    break;
                case ViewType.Component:
                    switch (addingElementType) {
                        case ElementType.SoftwareSystem:
                            // addSoftwareSystem(pointTranslatedFromViewport);
                            break;
                        case ElementType.Person:
                            // addPerson(pointTranslatedFromViewport);
                            break;
                        case ElementType.Container:
                            // addContainer(pointTranslatedFromViewport);
                            break;
                    }
                    break;
                case ViewType.Deployment:
                    break;
            }
        }
        
        // TODO: get viewport, translate position and save comment
        // if (isCommentingModeEnabled) {
        //     throw new Error("Not implemented");
        // }
    }, [addingElementType, view, enabledTool]);

    const handleOnElementDragStop = useCallback((event: React.MouseEvent, element: IElement) => {
        if (view) {
            switch (view?.type) {
                case ViewType.Model:
                    break;
                case ViewType.SystemLandscape:
                    // setElementPosition(node.data.element.identifier, node.position)
                    break;
                case ViewType.SystemContext:
                    // setElementPosition(node.data.element.identifier, node.position);
                    break;
                case ViewType.Container:
                    // setElementPosition(node.data.element.identifier, node.position);
                    break;
                case ViewType.Component:
                    // setElementPosition(node.data.element.identifier, node.position);
                    break;
                case ViewType.Deployment:
                    break;
            }
        }
    }, [view]);

    const handleOnElementsConnect = useCallback((connection: Connection) => {
        if (view) {
            switch (view?.type) {
                case ViewType.Model:
                    break;
                case ViewType.SystemLandscape:
                    // addRelationship(connection.source, connection.target);
                    break;
                case ViewType.SystemContext:
                    // addRelationship(connection.source, connection.target);
                    break;
                case ViewType.Container:
                    // addRelationship(connection.source, connection.target);
                    break;
                case ViewType.Component:
                    // addRelationship(connection.source, connection.target);
                    break;
                case ViewType.Deployment:
                    break;
            }
        }
    }, [view]);

    return (
        <Workspace
            workspace={workspace}
            onElementClick={handleOnElementClick}
            onViewClick={handleOnViewClick}
            onElementDragStop={handleOnElementDragStop}
            onElementsConnect={handleOnElementsConnect}
        >
            {view !== undefined && view?.type === ViewType.Model && (
                <Model model={workspace?.model}>

                </Model>
            )}
            <Views>
                {view !== undefined && view.type === ViewType.SystemLandscape && (
                    <SystemLandscapeView
                        key={workspace.views.systemLandscape?.identifier}
                        view={workspace?.views.systemLandscape}
                    />
                )}
                {view !== undefined && view.type === ViewType.SystemContext && (
                    <SystemContextView
                        key={view.identifier}
                        view={workspace.views.systemContexts.find(view => view.identifier === view.identifier)}
                    />
                )}
                {view !== undefined && view.type === ViewType.Container && (
                    <ContainerView
                        key={view.identifier}
                        view={workspace.views.containers.find(view => view.identifier === view.identifier)}
                    />
                )}
                {view !== undefined && view.type === ViewType.Component && (
                    <ComponentView
                        key={view.identifier}
                        view={workspace.views.components.find(view => view.identifier === view?.identifier)}
                    />
                )}
                {view !== undefined && view.type === ViewType.Deployment && (
                    <DeploymentView
                        key={view.identifier}
                        view={workspace.views.deployments.find(view => view.identifier === view?.identifier)}
                    />
                )}
                {children}
            </Views>
        </Workspace>
    )
}