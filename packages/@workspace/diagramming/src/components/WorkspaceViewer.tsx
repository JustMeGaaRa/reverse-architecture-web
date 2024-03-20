import { Connection } from "@reactflow/core";
import { ElementType, IElement, IViewDefinition, IWorkspaceSnapshot, Position, ViewType } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useWorkspaceNavigation, useWorkspaceToolbarStore } from "../hooks";
import { ComponentView } from "./ComponentView";
import { ContainerView } from "./ContainerView";
import { DeploymentView } from "./DeploymentView";
import { Model } from "./Model";
import { SystemContextView } from "./SystemContextView";
import { SystemLandscapeView } from "./SystemLandscapeView";
import { Views } from "./Views";
import { Workspace } from "./Workspace";

export const WorkspaceViewer: FC<PropsWithChildren<{
    workspace?: IWorkspaceSnapshot;
    initialView?: IViewDefinition;
}>> = ({
    children,
    workspace: workspaceSnapshot,
    initialView: viewSnapshot
}) => {
    const { workspace, setWorkspace } = useWorkspace();
    const { currentView, setCurrentView } = useWorkspaceNavigation();
    const { enabledTool, addingElementType } = useWorkspaceToolbarStore();

    useEffect(() => { if (workspaceSnapshot) { setWorkspace(workspaceSnapshot) }}, [workspaceSnapshot, setWorkspace]);
    useEffect(() => { if (viewSnapshot) { setCurrentView(viewSnapshot) }}, [viewSnapshot, setCurrentView]);
    
    // const {
    //     addGroup,
    //     addSoftwareSystem,
    //     addPerson,
    //     addRelationship,
    //     setElementPosition
    // } = useSystemLandscapeView();
    
    // const {
    //     addGroup,
    //     addSoftwareSystem,
    //     addPerson,
    //     addRelationship,
    //     setElementPosition
    // } = useSystemContextView(view.identifier);
    
    // const {
    //     addGroup,
    //     addSoftwareSystem,
    //     addPerson,
    //     addContainer,
    //     addRelationship,
    //     setElementPosition
    // } = useContainerView(view.identifier);

    const handleOnElementClick = useCallback((event: React.MouseEvent, element: IElement, relativePosition: Position) => {
        if (currentView && enabledTool === "adding-element") {
            switch (currentView?.type) {
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
    }, [addingElementType, currentView, enabledTool]);

    const handleOnViewClick = useCallback((event: React.MouseEvent, relativePosition: Position) => {
        if (currentView && enabledTool === "adding-element") {
            switch (currentView?.type) {
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
    }, [addingElementType, currentView, enabledTool]);

    const handleOnElementDragStop = useCallback((event: React.MouseEvent, element: IElement) => {
        if (currentView) {
            switch (currentView?.type) {
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
    }, [currentView]);

    const handleOnElementsConnect = useCallback((connection: Connection) => {
        if (currentView) {
            switch (currentView?.type) {
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
    }, [currentView]);

    return (
        <Workspace
            workspace={workspace}
            onElementClick={handleOnElementClick}
            onViewClick={handleOnViewClick}
            onElementDragStop={handleOnElementDragStop}
            onElementsConnect={handleOnElementsConnect}
        >
            {currentView?.type === ViewType.Model && (
                <Model model={workspace?.model}>

                </Model>
            )}
            <Views>
                {workspace.views.systemLandscape?.type === currentView?.type && (
                    <SystemLandscapeView key={workspace.views.systemLandscape?.identifier} view={workspace?.views.systemLandscape}>

                    </SystemLandscapeView>
                )}
                {workspace.views.systemContexts.filter(view => view.type === currentView?.type && view.identifier === currentView?.identifier).map(view => (
                    <SystemContextView key={view.identifier} view={view}>

                    </SystemContextView>
                ))}
                {workspace.views.containers.filter(view => view.type === currentView?.type && view.identifier === currentView?.identifier).map(view => (
                    <ContainerView key={view.identifier} view={view}>

                    </ContainerView>
                ))}
                {workspace.views.components.filter(view => view.type === currentView?.type && view.identifier === currentView?.identifier).map(view => (
                    <ComponentView key={view.identifier} view={view}>

                    </ComponentView>
                ))}
                {workspace.views.deployments.filter(view => view.type === currentView?.type && view.identifier === currentView?.identifier).map(view => (
                    <DeploymentView key={view.identifier} view={view}>

                    </DeploymentView>
                ))}
                {children}
            </Views>
        </Workspace>
    )
}