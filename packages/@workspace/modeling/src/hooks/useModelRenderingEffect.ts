import { useReactFlow } from "@reactflow/core";
import { IModel, ISupportVisitor } from "@structurizr/dsl";
import { useWorkspaceStore } from "@workspace/core";
import { useEffect } from "react";

export const useModelRenderingEffect = (strategy: ISupportVisitor) => {
    const { workspace } = useWorkspaceStore();
    const { setNodes, setEdges } = useReactFlow();
    
    // TODO: move this algorithm to the strategy class
    const getReactFlowObject = (model: IModel) => {
        const workspaceNode = ({
            id: "workspace",
            type: "element",
            data: {
                element: {
                    name: "Workspace",
                    description: "",
                    tags: [{ name: "Element" }, { name: "Workspace" }]
                }
            },
            position: { x: 0, y: -300 },
            draggable: true,
            connectable: true,
        })

        const workspaceReactFlow = {
            nodes: [workspaceNode],
            edges: []
        }

        const softwareSystemReactFlow = model.groups
            .flatMap(group => group.softwareSystems)
            .concat(model.softwareSystems)
            .flatMap((softwareSystem, index) => {
                const containerReactFlow = softwareSystem.groups
                    .flatMap(group => group.containers)
                    .concat(softwareSystem.containers)
                    .map((container, index) => {
                        const componentReactFlow = container.groups
                            .flatMap(group => group.components)
                            .concat(container.components)
                            .map((component, index) => {
                                const componentNode = ({
                                    id: component.identifier,
                                    type: "element",
                                    data: {
                                        element: component
                                    },
                                    position: { x: index * 300, y: 600 },
                                    draggable: true,
                                    connectable: true,
                                })
                                const componentEdge = ({
                                    id: `${container.identifier}-${component.identifier}`,
                                    type: "smoothstep",
                                    source: container.identifier,
                                    target: component.identifier,
                                })

                                return {
                                    nodes: [componentNode],
                                    edges: [componentEdge]
                                }
                            })
                            .reduce((reactFlow, current) => {
                                return {
                                    nodes: [...reactFlow.nodes, ...current.nodes],
                                    edges: [...reactFlow.edges, ...current.edges]
                                }
                            }, { nodes: [], edges: [] });
                        
                        const containerNode: any = ({
                            id: container.identifier,
                            type: "element",
                            data: {
                                element: container
                            },
                            position: { x: index * 300, y: 300 },
                            draggable: true,
                            connectable: true,
                        })
                        const containerEdge: any = ({
                            id: `${softwareSystem.identifier}-${container.identifier}`,
                            type: "smoothstep",
                            source: softwareSystem.identifier,
                            target: container.identifier,
                        })
                        
                        return {
                            nodes: [...componentReactFlow.nodes, containerNode],
                            edges: [...componentReactFlow.edges, containerEdge]
                        };
                    })
                    .reduce((reactFlow, current) => {
                        return {
                            nodes: [...reactFlow.nodes, ...current.nodes],
                            edges: [...reactFlow.edges, ...current.edges]
                        }
                    }, { nodes: [], edges: [] })
                
                const softwareSystemNode: any = ({
                    id: softwareSystem.identifier,
                    type: "element",
                    data: {
                        element: softwareSystem
                    },
                    position: { x: index * 300, y: 0 },
                    draggable: true,
                    connectable: true,
                })

                const softwareSystemEdge = ({
                    id: `workspace-${softwareSystem.identifier}`,
                    type: "smoothstep",
                    source: "workspace",
                    target: softwareSystem.identifier,
                
                })

                return {
                    nodes: [...containerReactFlow.nodes, softwareSystemNode],
                    edges: [...containerReactFlow.edges, softwareSystemEdge]
                }
            })
            .reduce((reactFlow, current) => {
                return {
                    nodes: [...reactFlow.nodes, ...current.nodes],
                    edges: [...reactFlow.edges, ...current.edges]
                }
            }, workspaceReactFlow);

        const peropleReactFlow = model.people.map((person, index) => {
            const personNode = ({
                id: person.identifier,
                type: "element",
                data: {
                    element: person
                },
                position: { x: (index + 1) * -300, y: 0 },
                draggable: true,
                connectable: true,
            })

            const personEdge = ({
                id: `workspace-${person.identifier}`,
                type: "smoothstep",
                source: "workspace",
                target: person.identifier,
            
            })

            return {
                nodes: [personNode],
                edges: [personEdge]
            }
        })
        .reduce((reactFlow, current) => {
            return {
                nodes: [...reactFlow.nodes, ...current.nodes],
                edges: [...reactFlow.edges, ...current.edges]
            }
        }, softwareSystemReactFlow);
        
        return peropleReactFlow;
    }
    
    useEffect(() => {
        const { nodes, edges } = getReactFlowObject(workspace.model);
        setNodes(nodes);
        setEdges(edges);
    }, [workspace.model, setEdges, setNodes]);
}