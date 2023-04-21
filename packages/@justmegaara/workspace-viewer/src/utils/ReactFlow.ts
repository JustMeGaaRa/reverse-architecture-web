import {
    defaultElementStyle,
    defaultRelationshipStyle,
    Element,
    Relationship,
    DeploymentNode,
    aggrerateStyles,
    Workspace,
    findSoftwareSystem,
    findContainer,
    DeploymentView,
    Styles,
    Dimension,
} from "@justmegaara/structurizr-dsl";
import { Node, Edge, Viewport, XYPosition } from "@reactflow/core";
import { ElementNodeWrapperProps } from "../components/Nodes/ElementNode";
import { RelationshipEdgeWrapperProps } from "../components/Edges/RelationshipEdge";

export const projectPoint = (viewport: Viewport, point: XYPosition) => {
    return {
        x: (point.x * viewport.zoom) + viewport.x,
        y: (point.y * viewport.zoom) + viewport.y
    };
}
export const normalizePoint = (viewport: Viewport, point: XYPosition) => {
    return {
        x: (point.x - viewport.x) / viewport.zoom,
        y: (point.y - viewport.y) / viewport.zoom
    };
}

export type ElementParams<TElement extends Element = any> = {
    element: TElement;
    parentId?: string;
    expanded?: boolean;
    size: Dimension;
    styles: Styles;
}

export const fromElement = (params: ElementParams): Node<ElementNodeWrapperProps> => {
    const { element, parentId, expanded, size, styles } = params;

    return {
        id: element.identifier,
        type: "element",
        data: {
            element: element,
            style: aggrerateStyles(
                defaultElementStyle,
                styles.element,
                [...element.tags].reverse()
            ),
            width: size.width,
            height: size.height,
            expanded: expanded,
        },
        position: { x: size.x, y: size.y },
        parentNode: parentId,
        extent: parentId ? "parent" : undefined,
        style: parentId ? undefined : { zIndex: -1 }
    }
}

export type RelationshipParams = {
    relationship: Relationship;
    styles: Styles;
}

export const fromRelationship = (params: RelationshipParams): Edge<RelationshipEdgeWrapperProps> => {
    const { relationship, styles } = params;

    return {
        id: `${relationship.sourceIdentifier}_${relationship.targetIdentifier}`,
        type: "relationship",
        label: relationship.description,
        data: {
            relationship: relationship,
            style: aggrerateStyles(
                defaultRelationshipStyle,
                styles.relationship,
                [...relationship.tags].reverse()
            ),
        },
        source: relationship.sourceIdentifier,
        target: relationship.targetIdentifier
    };
}

export const fromDeploymentView = (view: DeploymentView, workspace: Workspace) => {
    const flatMapDeploymentNode = (parentDeploymentNode: DeploymentNode, parentNode?: string) => {
        return [
            fromElement({
                    element: parentDeploymentNode,
                    parentId: parentNode,
                    size: view.layout[parentDeploymentNode.identifier],
                    styles: workspace.views.styles
                },
            ),
            ...parentDeploymentNode.deploymentNodes?.flatMap(childDeploymentNode => flatMapDeploymentNode(
                childDeploymentNode,
                parentDeploymentNode.identifier
            )) ?? [],
            ...parentDeploymentNode.softwareSystemInstances?.flatMap(instance => fromElement({
                element: {
                    ...findSoftwareSystem(workspace, instance.softwareSystemIdentifier),
                    identifier: instance.identifier
                },
                parentId: parentDeploymentNode.identifier,
                size: view.layout[instance.identifier],
                styles: workspace.views.styles
            })) ?? [],
            ...parentDeploymentNode.containerInstances?.flatMap(instance => fromElement({
                element: {
                    ...findContainer(workspace, instance.containerIdentifier),
                    identifier: instance.identifier
                },
                parentId: parentDeploymentNode.identifier,
                size: view.layout[instance.identifier],
                styles: workspace.views.styles
            })) ?? [],
        ];
    }
    
    return view.deploymentNodes.flatMap(dn => flatMapDeploymentNode(dn));
}