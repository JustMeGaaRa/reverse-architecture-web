import { Node } from "@reactflow/core";
import {
    createDefaultComponent,
    createDefaultContainer,
    createDefaultGroup,
    createDefaultPerson,
    createDefaultSoftwareSystem,
    createRelationship,
    ElementType,
    IComponentView,
    IContainerView,
    Identifier,
    IDeploymentView,
    IElement,
    IRelationship,
    ISystemContextView,
    ISystemLandscapeView,
    Position,
    ViewDefinition,
    ViewType
} from "@structurizr/dsl";
import { ActionType } from "@structurizr/react";
import { Dispatch, useCallback } from "react";
import { ActionFlowType, WorkspaceFlowAction } from "../actions";
import {
    useWorkspaceActionsToolbar,
    useWorkspaceNavigation,
    WorkspaceToolName
} from "../hooks";

export const useWorkspaceEditorState = (dispatch: Dispatch<WorkspaceFlowAction>) => {
    const { currentView: view } = useWorkspaceNavigation();
    const { selectedTool, selectedElementType } = useWorkspaceActionsToolbar();

    const addElementToSystemLandscapeView = useCallback((
        view: ISystemLandscapeView,
        elementType: ElementType,
        position: Position
    ) => {
        switch (elementType) {
            case ElementType.Group:
                dispatch({
                    type: ActionType.ADD_MODEL_GROUP,
                    payload: { group: createDefaultGroup() }
                });
                break;
            case ElementType.Person:
                dispatch({
                    type: ActionType.INCLUDE_SYSTEM_LANDSCAPE_VIEW_PERSON,
                    payload: { person: createDefaultPerson(), position }});
                break;
            case ElementType.SoftwareSystem:
                dispatch({
                    type: ActionType.INCLUDE_SYSTEM_LANDSCAPE_VIEW_SOFTWARE_SYSTEM,
                    payload: { softwareSystem: createDefaultSoftwareSystem(), position }
                });
                break;
        }
    }, [dispatch]);

    const addElementToSystemContextView = useCallback((
        view: ISystemContextView,
        elementType: ElementType,
        position: Position
    ) => {
        switch (elementType) {
            case ElementType.Group:
                dispatch({
                    type: ActionType.ADD_MODEL_GROUP,
                    payload: { group: createDefaultGroup() }
                });
                break;
            case ElementType.Person:
                dispatch({
                    type: ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_PERSON,
                    payload: {
                        person: createDefaultPerson(),
                        viewIdentifier: view.identifier,
                        position
                    }
                });
                break;
            case ElementType.SoftwareSystem:
                dispatch({
                    type: ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_SOFTWARE_SYSTEM,
                    payload: { softwareSystem: createDefaultSoftwareSystem(), viewIdentifier: view.identifier, position

                    }
                });
                break;
        }
    }, [dispatch]);
    
    const addElementToContainerView = useCallback((
        view: IContainerView,
        elementType: ElementType,
        position: Position
    ) => {
        switch (elementType) {
            case ElementType.Person:
                dispatch({
                    type: ActionType.INCLUDE_CONTAINER_VIEW_PERSON,
                    payload: {
                        person: createDefaultPerson(),
                        viewIdentifier: view.identifier,
                        position
                    }
                });
                break;
            case ElementType.SoftwareSystem:
                dispatch({
                    type: ActionType.INCLUDE_CONTAINER_VIEW_SOFTWARE_SYSTEM,
                    payload: {
                        softwareSystem: createDefaultSoftwareSystem(),
                        viewIdentifier: view.identifier,
                        position
                    }
                });
                break;
            case ElementType.Container:
                dispatch({
                    type: ActionType.INCLUDE_CONTAINER_VIEW_CONTAINER,
                    payload: {
                        container: createDefaultContainer(),
                        viewIdentifier: view.identifier,
                        softwareSystemIdentifier: view.softwareSystemIdentifier,
                        position
                    }
                });
                break;
        }
    }, [dispatch]);
    
    const addElementToComponentView = useCallback((
        view: IComponentView,
        elementType: ElementType,
        position: Position
    ) => {
        switch (elementType) {
            case ElementType.Person:
                dispatch({
                    type: ActionType.INCLUDE_COMPONENT_VIEW_PERSON,
                    payload: {
                        person: createDefaultPerson(),
                        viewIdentifier: view.identifier,
                        position
                    }
                });
                break;
            case ElementType.SoftwareSystem:
                dispatch({
                    type: ActionType.INCLUDE_COMPONENT_VIEW_SOFTWARE_SYSTEM,
                    payload: {
                        softwareSystem: createDefaultSoftwareSystem(),
                        viewIdentifier: view.identifier,
                        position
                    }
                });
                break;
            case ElementType.Container:
                dispatch({
                    type: ActionType.INCLUDE_COMPONENT_VIEW_CONTAINER,
                    payload: {
                        container: createDefaultContainer(),
                        viewIdentifier: view.identifier,
                        containerIdentifier: view.containerIdentifier,
                        position
                    }
                });
                break;
            case ElementType.Component:
                dispatch({
                    type: ActionType.INCLUDE_COMPONENT_VIEW_COMPONENT,
                    payload: {
                        component: createDefaultComponent(),
                        viewIdentifier: view.identifier,
                        containerIdentifier: view.containerIdentifier,
                        position
                    }
                });
                break;
        }
    }, [dispatch]);
    
    const addElementToDeploymentView = useCallback((
        view: IDeploymentView,
        elementType: ElementType,
        position: Position
    ) => {
        throw new Error("Not implemented");
    }, []);
    
    const addCommentToView = useCallback((
        view: ViewDefinition,
        position: Position,
        elementId?: Identifier
    ) => {
        switch (view.type) {
            case ViewType.Model:
            case ViewType.SystemLandscape:
            case ViewType.SystemContext:
            case ViewType.Container:
            case ViewType.Component:
            case ViewType.Deployment:
            default:
                throw new Error("Not implemented");
        }
    }, []);

    const addElementToView = useCallback((
        view: ViewDefinition,
        elementType: ElementType,
        position: Position,
        groupId?: Identifier
    ) => {
        switch (view.type) {
            case ViewType.Model:
                throw new Error("Not implemented");
                break;
            case ViewType.SystemLandscape:
                addElementToSystemLandscapeView(view, elementType, position);
                break;
            case ViewType.SystemContext:
                addElementToSystemContextView(view, elementType, position);
                break;
            case ViewType.Container:
                addElementToContainerView(view, elementType, position);
                break;
            case ViewType.Component:
                addElementToComponentView(view, elementType, position);
                break;
            case ViewType.Deployment:
                addElementToDeploymentView(view, elementType, position);
                break;
        }
    }, [addElementToComponentView, addElementToContainerView, addElementToDeploymentView, addElementToSystemContextView, addElementToSystemLandscapeView]);

    const setElementPositionInView = useCallback((
        viewType: ViewType,
        viewIdentifier: Identifier,
        elementIdentifier: Identifier,
        position: Position
    ) => {
        switch (viewType) {
            case ViewType.Model:
                throw new Error("Not implemented");
                break;
            case ViewType.SystemLandscape:
                dispatch({
                    type: ActionType.SET_SYSTEM_LANDSCAPE_VIEW_ELEMENT_POSTION,
                    payload: { viewIdentifier, elementIdentifier, position }
                });
                break;
            case ViewType.SystemContext:
                dispatch({
                    type: ActionType.SET_SYSTEM_CONTEXT_VIEW_ELEMENT_POSTION,
                    payload: { viewIdentifier, elementIdentifier, position }
                });
                break;
            case ViewType.Container:
                dispatch({
                    type: ActionType.SET_CONTAINER_VIEW_ELEMENT_POSTION,
                    payload: { viewIdentifier, elementIdentifier, position }
                });
                break;
            case ViewType.Component:
                dispatch({
                    type: ActionType.SET_COMPONENT_VIEW_ELEMENT_POSTION,
                    payload: { viewIdentifier, elementIdentifier, position }
                });
                break;
            case ViewType.Deployment:
                break;
        }
    }, [dispatch]);

    const connectElementOnModelView = useCallback((sourceElement: IElement) => {
        // TODO: add element in position on react flow pane, but not in workspace view
        switch (sourceElement?.type) {
            case "Workspace" as any:
                dispatch({
                    type: ActionType.ADD_MODEL_SOFTWARE_SYSTEM,
                    payload: { softwareSystem: createDefaultSoftwareSystem() }
                });
                break;
            case ElementType.SoftwareSystem:
                dispatch({
                    type: ActionType.ADD_MODEL_CONTAINER,
                    payload: {
                        softwareSystemIdentifier: sourceElement.identifier,
                        container: createDefaultContainer()
                    }
                });
                break;
            case ElementType.Container:
                dispatch({
                    type: ActionType.ADD_MODEL_COMPONENT,
                    payload: {
                        containerIdentifier: sourceElement.identifier,
                        component: createDefaultComponent()
                    }
                });
                break;
        }
    }, [dispatch]);

    const connectElementOnSystemLandscapeView = useCallback((sourceElement: IElement, position: Position) => {
        switch (sourceElement?.type) {
            case ElementType.Person:
                const person = createDefaultPerson();
                dispatch({
                    type: ActionFlowType.CONNECT_PERSON_ON_SYSTEM_LANDSCAPE_VIEW,
                    payload: {
                        person,
                        relationship: createRelationship(sourceElement.identifier, person.identifier),
                        position
                    }
                })
                break;
            case ElementType.SoftwareSystem:
                const softwareSystem = createDefaultSoftwareSystem();
                dispatch({
                    type: ActionFlowType.CONNECT_SOFTWARE_SYSTEM_ON_SYSTEM_LANDSCAPE_VIEW,
                    payload: {
                        softwareSystem,
                        relationship: createRelationship(sourceElement.identifier, softwareSystem.identifier),
                        position
                    }
                })
                break;
            default:
        }
    }, [dispatch]);

    const connectElementOnSystemContextView = useCallback((sourceElement: IElement, position: Position) => {
        switch (sourceElement?.type) {
            case ElementType.Person:
                const person = createDefaultPerson();
                dispatch({
                    type: ActionFlowType.CONNECT_PERSON_ON_SYSTEM_CONTEXT_VIEW,
                    payload: {
                        viewIdentifier: undefined,
                        person,
                        relationship: createRelationship(sourceElement.identifier, person.identifier),
                        position
                    }
                })
                break;
            case ElementType.SoftwareSystem:
                const softwareSystem = createDefaultSoftwareSystem();
                dispatch({
                    type: ActionFlowType.CONNECT_SOFTWARE_SYSTEM_ON_SYSTEM_CONTEXT_VIEW,
                    payload: {
                        viewIdentifier: undefined,
                        softwareSystem,
                        relationship: createRelationship(sourceElement.identifier, softwareSystem.identifier),
                        position
                    }
                })
                break;
        }
    }, [dispatch]);

    const connectElementOnContainerView = useCallback((sourceElement: IElement, position: Position) => {
        switch (sourceElement?.type) {
            case ElementType.Person:
                const person = createDefaultPerson();
                dispatch({
                    type: ActionFlowType.CONNECT_PERSON_ON_CONTAINER_VIEW,
                    payload: {
                        viewIdentifier: undefined,
                        softwareSystemIdentifier: undefined,
                        person,
                        relationship: createRelationship(sourceElement.identifier, person.identifier),
                        position
                    }
                })
                break;
            case ElementType.SoftwareSystem:
                const softwareSystem = createDefaultSoftwareSystem();
                dispatch({
                    type: ActionFlowType.CONNECT_SOFTWARE_SYSTEM_ON_CONTAINER_VIEW,
                    payload: {
                        viewIdentifier: undefined,
                        softwareSystemIdentifier: undefined,
                        softwareSystem,
                        relationship: createRelationship(sourceElement.identifier, softwareSystem.identifier),
                        position
                    }
                })
                break;
            case ElementType.Container:
                const container = createDefaultContainer();
                dispatch({
                    type: ActionFlowType.CONNECT_CONTAINER_ON_CONTAINER_VIEW,
                    payload: {
                        viewIdentifier: undefined,
                        softwareSystemIdentifier: undefined,
                        container,
                        relationship: createRelationship(sourceElement.identifier, container.identifier),
                        position
                    }
                })
                break;
        }
    }, [dispatch]);
    
    const connectElementOnComponentView = useCallback((sourceElement: IElement, position: Position) => {
        switch (sourceElement?.type) {
            case ElementType.Person:
                const person = createDefaultPerson();
                dispatch({
                    type: ActionFlowType.CONNECT_PERSON_ON_COMPONENT_VIEW,
                    payload: {
                        viewIdentifier: undefined,
                        containerIdentifier: undefined,
                        person,
                        relationship: createRelationship(sourceElement.identifier, person.identifier),
                        position
                    }
                })
                break;
            case ElementType.SoftwareSystem:
                const softwareSystem = createDefaultSoftwareSystem();
                dispatch({
                    type: ActionFlowType.CONNECT_SOFTWARE_SYSTEM_ON_COMPONENT_VIEW,
                    payload: {
                        viewIdentifier: undefined,
                        containerIdentifier: undefined,
                        softwareSystem,
                        relationship: createRelationship(sourceElement.identifier, softwareSystem.identifier),
                        position
                    }
                })
                break;
            case ElementType.Container:
                const container = createDefaultContainer();
                dispatch({
                    type: ActionFlowType.CONNECT_CONTAINER_ON_COMPONENT_VIEW,
                    payload: {
                        viewIdentifier: undefined,
                        containerIdentifier: undefined,
                        container,
                        relationship: createRelationship(sourceElement.identifier, container.identifier),
                        position
                    }
                })
                break;
            case ElementType.Component:
                const component = createDefaultComponent();
                dispatch({
                    type: ActionFlowType.CONNECT_COMPONENT_ON_COMPONENT_VIEW,
                    payload: {
                        viewIdentifier: undefined,
                        containerIdentifier: undefined,
                        component,
                        relationship: createRelationship(sourceElement.identifier, component.identifier),
                        position
                    }
                })
                break;
        }
    }, [dispatch]);

    const onElementClick = useCallback((event: React.MouseEvent, element: IElement, relativePosition: Position) => {
        if (view && selectedTool === WorkspaceToolName.ElementDrop) {
            addElementToView(view, selectedElementType, relativePosition, element.identifier);
        }
        
        if (view && selectedTool === WorkspaceToolName.Comment) {
            // TODO: get viewport, translate position and save comment
            addCommentToView(view, relativePosition, element.identifier);
        }
    }, [view, selectedTool, selectedElementType, addElementToView, addCommentToView]);

    const onViewClick = useCallback((event: React.MouseEvent, relativePosition: Position) => {
        if (view && selectedTool === WorkspaceToolName.ElementDrop) {
            addElementToView(view, selectedElementType, relativePosition);
        }
        
        if (view && selectedTool === WorkspaceToolName.Comment) {
            // TODO: get viewport, translate position and save comment
            addCommentToView(view, relativePosition);
        }
    }, [view, selectedTool, selectedElementType, addElementToView, addCommentToView]);

    const onElementDragStart = useCallback((event: React.MouseEvent, element: IElement) => {
    }, []);

    const onElementDrag = useCallback((event: React.MouseEvent, element: IElement) => {
    }, []);

    const onElementDragStop = useCallback((event: React.MouseEvent, element: IElement, position: Position) => {
        if (view) {
            setElementPositionInView(view?.type, view?.identifier, element.identifier, position);
        }
    }, [setElementPositionInView, view]);

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
    
    const onViewFlowClick = useCallback((sourceNode: Node, position: Position) => {
        switch (view?.type) {
            case ViewType.Model:
                connectElementOnModelView(sourceNode.data?.element);
                break;
            case ViewType.SystemLandscape:
                connectElementOnSystemLandscapeView(sourceNode.data?.element, position);
                break;
            case ViewType.SystemContext:
                connectElementOnSystemContextView(sourceNode.data?.element, position);
                break;
            case ViewType.Container:
                connectElementOnContainerView(sourceNode.data?.element, position);
                break;
            case ViewType.Component:
                connectElementOnComponentView(sourceNode.data?.element, position);
                break;
            case ViewType.Deployment:
                break;
        }
    }, [connectElementOnComponentView, connectElementOnContainerView, connectElementOnModelView, connectElementOnSystemContextView, connectElementOnSystemLandscapeView, view?.type]);
    
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