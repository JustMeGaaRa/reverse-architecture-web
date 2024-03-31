import { Node } from "@reactflow/core";
import {
    ElementType,
    IElement,
    IRelationship,
    IViewDefinition,
    Position,
    ViewType
} from "@structurizr/dsl";
import { useSystemLandscapeView, useWorkspace } from "@structurizr/react";
import { Workspace } from "@structurizr/y-workspace";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { CommentThread } from "../../comments";
import { useWorkspaceActionsToolbar, useWorkspaceNavigation, WorkspaceToolName } from "../hooks";

export const useWorkspaceEditor = () => {
    const [ yworkspace, setYWorkspace ] = useState<Workspace>();
    const { workspace, setWorkspace } = useWorkspace();
    const { currentView: view } = useWorkspaceNavigation();
    const { selectedTool, selectedElementType } = useWorkspaceActionsToolbar();

    // const systemLandscapeView = useSystemLandscapeView();

    const onElementClick = useCallback((event: React.MouseEvent, element: IElement, relativePosition: Position) => {
        if (view && selectedTool === WorkspaceToolName.ElementDrop) {
            switch (view?.type) {
                case ViewType.Model:
                    break;
                case ViewType.SystemLandscape:
                    switch (selectedElementType) {
                        case ElementType.SoftwareSystem:
                            // systemLandscapeView.addSoftwareSystem(relativePosition, element.identifier);
                            break;
                        case ElementType.Person:
                            // systemLandscapeView.addPerson(relativePosition, element.identifier);
                            break;
                    }
                    break;
                case ViewType.SystemContext:
                    switch (selectedElementType) {
                        case ElementType.SoftwareSystem:
                            // addSoftwareSystem(pointRelativeToNode, node.id)
                            break;
                        case ElementType.Person:
                            // addPerson(pointRelativeToNode, node.id)
                            break;
                    }
                    break;
                case ViewType.Container:
                    switch (selectedElementType) {
                        case ElementType.Group:
                            // addGroup(pointRelativeToNode);
                            break;
                        case ElementType.Container:
                            // addContainer(pointRelativeToNode, groupId);
                            break;
                    }
                    break;
                case ViewType.Component:
                    switch (selectedElementType) {
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
    }, [view, selectedTool, selectedElementType]);

    const onViewClick = useCallback((event: React.MouseEvent, relativePosition: Position) => {
        if (view && selectedTool === WorkspaceToolName.ElementDrop) {
            switch (view?.type) {
                case ViewType.Model:
                    break;
                case ViewType.SystemLandscape:
                    switch (selectedElementType) {
                        case ElementType.Group:
                            // systemLandscapeView.addGroup(relativePosition);
                            break;
                        case ElementType.SoftwareSystem:
                            // systemLandscapeView.addSoftwareSystem(relativePosition);
                            break;
                        case ElementType.Person:
                            // systemLandscapeView.addPerson(relativePosition);
                            break;
                    }
                    break;
                case ViewType.SystemContext:
                    switch (selectedElementType) {
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
                    switch (selectedElementType) {
                        case ElementType.SoftwareSystem:
                            // addSoftwareSystem(pointTranslatedFromViewport);
                            break;
                        case ElementType.Person:
                            // addPerson(pointTranslatedFromViewport);
                            break;
                    }
                    break;
                case ViewType.Component:
                    switch (selectedElementType) {
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
    }, [view, selectedTool, selectedElementType]);

    const onElementDragStart = useCallback((event: React.MouseEvent, element: IElement) => {
        console.log("onElementDragStart", event, element);
    }, []);

    const onElementDrag = useCallback((event: React.MouseEvent, element: IElement) => {
        console.log("onElementDrag", event, element);
    }, []);

    const onElementDragStop = useCallback((event: React.MouseEvent, element: IElement, position: Position) => {
        if (view) {
            switch (view?.type) {
                case ViewType.Model:
                    break;
                case ViewType.SystemLandscape:
                    // systemLandscapeView.setElementPosition(element.identifier, position)
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

    const onElementsConnect = useCallback((relationship: IRelationship) => {
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

    // const { addDefaultElement } = useModelFlowBuilder();
    // const { addSoftwareSystem, addPerson, addRelationship } = useSystemLandscapeView();
    // const { addSoftwareSystem, addPerson, addRelationship } = useSystemContextView(view.identifier);
    // const { addSoftwareSystem, addPerson, addContainer, addRelationship } = useContainerView(view.identifier);
    // const { addSoftwareSystem, addPerson, addContainer, addComponent, addRelationship } = useComponentView(view.identifier);
    // const { } = useDeploymentView(view.identifier, view["environment"]);
    
    const onViewFlowClick = useCallback((sourceNode: Node, position: Position) => {
        switch (view?.type) {
            case ViewType.Model:
                // TODO: add element in position on react flow pane, but not in workspace view
                // const element = addDefaultElement(
                //     sourceNode.data.element.type,
                //     position,
                //     sourceNode.data.element.identifier
                // );
                // break;
            case ViewType.SystemLandscape:
                switch (sourceNode.data?.element?.type) {
                    case ElementType.Person:
                        // const person = systemLandscapeView.addPerson(position, sourceNode.parentNode);
                        // const personRelationship = systemLandscapeView.addRelationship(sourceNode.data?.element.identifier, person.identifier);
                    case ElementType.SoftwareSystem:
                        // const softwareSystem = systemLandscapeView.addSoftwareSystem(position, sourceNode.parentNode);
                        // const softwareSystemRelationship = systemLandscapeView.addRelationship(sourceNode.data?.element.identifier, softwareSystem.identifier);
                        break;
                    default:
                }
                break;
            case ViewType.SystemContext:
                // switch (sourceNode.data?.element?.type) {
                //     case ElementType.Person:
                //         const person = addPerson(position, sourceNode.parentNode);
                //         const personRelationship = addRelationship(sourceNode.data?.element.identifier, person.identifier);
                //     case ElementType.SoftwareSystem:
                //         const softwareSystem = addSoftwareSystem(position, sourceNode.parentNode);
                //         const softwareSystemRelationship = addRelationship(sourceNode.data?.element.identifier, softwareSystem.identifier);
                //         break;
                // }
                break;
            case ViewType.Container:
                // switch (sourceNode.data?.element?.type) {
                //     case ElementType.Person:
                //         const person = addPerson(position);
                //         const personRelationship = addRelationship(sourceNode.data?.element.identifier, person.identifier);
                //     case ElementType.SoftwareSystem:
                //         const softwareSystem = addSoftwareSystem(position);
                //         const softwareSystemRelationship = addRelationship(sourceNode.data?.element.identifier, softwareSystem.identifier);
                //         break;
                //     case ElementType.Container:
                //         const container = addContainer(position, sourceNode.parentNode);
                //         const containerRelationship = addRelationship(sourceNode.data?.element.identifier, container.identifier);
                //         break;
                // }
                break;
            case ViewType.Component:
                // switch (sourceNode.data?.element?.type) {
                //     case ElementType.Person:
                //         const person = addPerson(position);
                //         const personRelationship = addRelationship(sourceNode.data?.element.identifier, person.identifier);
                //     case ElementType.SoftwareSystem:
                //         const softwareSystem = addSoftwareSystem(position);
                //         const softwareSystemRelationship = addRelationship(sourceNode.data?.element.identifier, softwareSystem.identifier);
                //         break;
                //     case ElementType.Container:
                //         const container = addContainer(position);
                //         const containerRelationship = addRelationship(sourceNode.data?.element.identifier, container.identifier);
                //         break;
                //     case ElementType.Component:
                //         const component = addComponent(position, sourceNode.parentNode);
                //         const componentRelationship = addRelationship(sourceNode.data?.element.identifier, component.identifier);
                //         break;
                // }
                break;
            case ViewType.Deployment:
                break;
        }
    }, [view]);
    
    return {
        onElementClick,
        onElementDragStart,
        onElementDrag,
        onElementDragStop,
        onElementsConnect,
        onViewClick,
        onViewFlowClick
    }
}