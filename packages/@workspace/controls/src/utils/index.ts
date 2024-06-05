import { Node, Position, Viewport } from "@reactflow/core";
import { ElementType, IContainer, IDeploymentNode, IElement, ISoftwareSystem, Tag } from "@structurizr/dsl";
import { ReactFlowNodeTypeNames } from "@workspace/core";

export const getViewElementHandleOffset = (position: Position) => {
    switch (position) {
        case Position.Left:
            return { x: -400, y: 0 };
        case Position.Right:
            return { x: 400, y: 0 };
        case Position.Top:
            return { x: 0, y: -400 };
        case Position.Bottom:
            return { x: 0, y: 400 };
    }
}

export const getModelElementHandleOffset = (position: Position) => {
    switch (position) {
        case Position.Bottom:
            return { x: - 150, y: 64 };
        default:
            return { x: 0, y: 0 };
    }
}

export const canZoomIntoElement = (element: IElement) => {
    return element.type === ElementType.SoftwareSystem
        || element.type === ElementType.Container
        || element.tags.some(tag => tag.name === Tag.SoftwareSystem.name)
        || element.tags.some(tag => tag.name === Tag.Container.name);
}

export const canElementHaveChildren = (element: IElement) => {
    return element.type === ElementType.SoftwareSystem
        || element.type === ElementType.Container
        || element.type === ElementType.DeploymentNode
        || element.tags.some(x => x.name === Tag.SoftwareSystem.name)
        || element.tags.some(x => x.name === Tag.Container.name)
        || element.tags.some(x => x.name === Tag.DeploymentNode.name);
}

export const doesElementHaveChildren = (element: IElement) => {
    switch (element.type) {
        case ElementType.SoftwareSystem:
            return (element as ISoftwareSystem).containers.length > 0;
        case ElementType.Container:
            return (element as IContainer).components.length > 0;
        case ElementType.DeploymentNode:
            return (element as IDeploymentNode).deploymentNodes.length > 0
                || (element as IDeploymentNode).softwareSystemInstances.length > 0
                || (element as IDeploymentNode).containerInstances.length > 0;
        default:
            return false;
    }
}

export const isViewportZoomVisible = (viewport: Viewport) => {
    return viewport.zoom >= 0.5;
}

export const isNodeElement = (node: Node) => {
    return node?.type !== ReactFlowNodeTypeNames.ViewElementBoundary
        && node?.type !== ReactFlowNodeTypeNames.ViewElementGroup;
}

export const isBoundaryElement = (node: Node) => {
    return node?.type === ReactFlowNodeTypeNames.ViewElementBoundary
        || node?.type === ReactFlowNodeTypeNames.ViewElementGroup;
}

export const getSelectedNodesBorderRadius = (selectedNodes: Node[], viewport: Viewport) => {
    const elementNodeBorderRadius = 17;
    const elementGroupBorderRadius = 33;
    const elementMixedBorderRadius = 0;

    const elementSelectionBorderRadius = selectedNodes.every(isBoundaryElement)
        ? elementGroupBorderRadius * viewport.zoom
        : selectedNodes.every(isNodeElement)
            ? elementNodeBorderRadius * viewport.zoom
            : elementMixedBorderRadius;

    return elementSelectionBorderRadius;
}