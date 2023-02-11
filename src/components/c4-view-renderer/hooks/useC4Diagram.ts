import {
    Node,
    Edge,
    FitViewOptions,
    ReactFlowJsonObject,
    useReactFlow
} from "@reactflow/core";
import { useCallback } from "react";
import { ElementNodeWrapperProps } from "../components/Nodes/ElementNode";
import { RelationshipEdgeWrapperProps } from "../components/Edges/RelationshipEdge";
import { useC4BuilderStore } from "../store";
import {
    defaultElementStyle,
    defaultRelationshipStyle,
    View,
    Element,
    Relationship,
    DeploymentNode,
    Identifier,
    Tag,
} from "../store/C4Diagram";

function aggrerateStyles<TStyle, TTagStyles>(style: TStyle, tagStyles: TTagStyles, tags: Tag[]) {
    if (tags?.length > 0) {
        const nextTag = tags.pop();
        const nextStyle = tagStyles[nextTag.name];

        const appliedStyle: TStyle = {
            ...style,
            ...nextStyle
        }

        return nextStyle
            ? aggrerateStyles(appliedStyle, tagStyles, tags)
            : aggrerateStyles(style, tagStyles, tags);
    }

    return style;
}

const getDiagramNodes = (diagram: View) => {
    if (diagram === null) return Array.of<Node<ElementNodeWrapperProps>>();
    
    const fromNode = (
        node: Element,
        parentNode?: string,
        expanded?: boolean
    ): Node<ElementNodeWrapperProps> => {
        return {
            id: node.identifier,
            type: "roundedBox",
            data: {
                element: node,
                style: aggrerateStyles(
                    defaultElementStyle,
                    diagram.style.element,
                    [...node.tags].reverse()
                ),
                width: diagram.layout[node.identifier].width,
                height: diagram.layout[node.identifier].height,
                expanded: expanded,
            },
            position: diagram.layout[node.identifier],
            parentNode: parentNode,
            extent: "parent",
            style: parentNode ? undefined : { zIndex: -1 }
        };
    }

    const findSoftwareSystem = (identifier: Identifier) => {
        return diagram.model.softwareSystems
            .find(x => x.identifier === identifier);
    }

    const findContainer = (identifier: Identifier) => {
        return diagram.model.softwareSystems
            .flatMap(x => x.containers ?? [])
            .find(x => x.identifier === identifier);
    }

    // TODO: fix the issue with instances references only being displayed once
    const flatMapDeploymentNode = (deploymentNode: DeploymentNode, parentNode?: string) => {
        return [
            fromNode(deploymentNode, parentNode, deploymentNode.deploymentNodes?.length > 0),
            ...deploymentNode.deploymentNodes?.flatMap(dn => flatMapDeploymentNode(dn, deploymentNode.identifier)) ?? [],
            ...deploymentNode.softwareSystemInstances?.flatMap(ss => fromNode(findSoftwareSystem(ss.softwareSystemIdentifier), deploymentNode.identifier)) ?? [],
            ...deploymentNode.containerInstances?.flatMap(c => fromNode(findContainer(c.containerIdentifier), deploymentNode.identifier)) ?? [],
        ];
    }
    
    // TODO: map the nodes based on the type of view (SystemContext, Container, Component, Deployment, etc.)
    return [
        ...diagram.model.people.map(person => fromNode(person)),
        ...diagram.model.softwareSystems.flatMap(system => [
            fromNode(system, undefined, system.containers?.length > 0),
            ...system.containers?.flatMap(container => [
                fromNode(container, system.identifier, container.components?.length > 0),
                ...container.components?.map(component => 
                    fromNode(component, container.identifier)) ?? []
            ]) ?? []
        ]),
        ...diagram.model.deploymentEnvironments?.flatMap(deployment => 
            deployment.deploymentNodes.flatMap(dn => flatMapDeploymentNode(dn))
        ) ?? []
    ];
}

const getDiagramEdges = (diagram: View) => {
    if (diagram === null) return Array.of<Edge<RelationshipEdgeWrapperProps>>();

    const fromEdge = (
        edge: Relationship
    ): Edge<RelationshipEdgeWrapperProps> => {
        return {
            id: `${edge.sourceIdentifier}_${edge.targetIdentifier}`,
            type: "default",
            label: edge.description,
            data: {
                relationship: edge,
                style: aggrerateStyles(
                    defaultRelationshipStyle,
                    diagram.style.relationship,
                    [...edge.tags].reverse()
                ),
            },
            source: edge.sourceIdentifier,
            target: edge.targetIdentifier
        };
    }

    return diagram.model.relationships.map(edge => fromEdge(edge));
}

export const useC4Diagram = () => {
    const reactFlow = useReactFlow();
    const c4Diagram = useC4BuilderStore();

    const clearView = useCallback(() => {
        // TODO: clear elements and relationships
        // c4Diagram.setElements(elements);
        // c4Diagram.setRelationships(relationships);
        reactFlow.setNodes([]);
        reactFlow.setEdges([]);
    }, [reactFlow]);

    const fromView = useCallback((
        diagram: View,
        fitViewOptions?: FitViewOptions
    ) => {
        const elements = getDiagramNodes(diagram);
        const relationships = getDiagramEdges(diagram);

        c4Diagram.setTitle(diagram.title);
        // TODO: set elements and relationships
        // c4Diagram.setElements(elements);
        // c4Diagram.setRelationships(relationships);
        reactFlow.setNodes(elements);
        reactFlow.setEdges(relationships);
        reactFlow.fitView(fitViewOptions);
    }, [c4Diagram, reactFlow]);

    const fromObject = useCallback((
        flow: ReactFlowJsonObject,
        fitViewOptions?: FitViewOptions
    ) => {
        reactFlow.setNodes(flow.nodes || []);
        reactFlow.setEdges(flow.edges || []);
        reactFlow.fitView(fitViewOptions);
    }, [reactFlow]);

    return {
        fromView,
        fromObject,
        clearView
    };
}