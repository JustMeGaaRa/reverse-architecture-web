import {
    Background,
    BackgroundVariant
} from "@reactflow/background";
import {
    ConnectionMode,
    ReactFlow,
    useEdgesState,
    useNodesState
} from "@reactflow/core";
import { IModel } from "@structurizr/dsl";
import { FC, PropsWithChildren, useMemo } from "react";
import {
    ElementNode,
    ElementPlaceholderNode
} from "../components";

export const ModelView: FC<PropsWithChildren<{
    model: IModel;
}>> = ({
    children,
    model
}) => {
    const NodeTypes = useMemo(() => ({
        element: ElementNode,
        placeholder: ElementPlaceholderNode,
        // boundary: ReactFlowBoundaryNode,
        // deploymentNode: ReactFlowDeploymentNode,
    }), []);
    
    const EdgeTypes = useMemo(() => ({
        // relationship: ReactFlowBezierEdge,
        // straight: ReactFlowBezierEdge,
        // step: ReactFlowBezierEdge,
        // smoothstep: ReactFlowBezierEdge,
        // simplebezier: ReactFlowBezierEdge
    }), []);

    const FitViewOptions = useMemo(() => ({
        padding: 0.2,
        duration: 500,
        maxZoom: 5,
        minZoom: 0.1
    }), []);

    const [ nodes, setNodes, onNodesChange ] = useNodesState([
        {
            id: "placeholder-1",
            type: "placeholder",
            data: { },
            position: { x: 200, y: 100 },
            connectable: false,
            draggable: false,
        }
    ]);
    const [ edges, setEdges, onEdgesChange ] = useEdgesState([]);

    return (
        <ReactFlow
            connectionMode={ConnectionMode.Strict}
            fitViewOptions={FitViewOptions}
            nodeTypes={NodeTypes}
            nodes={nodes}
            edgeTypes={EdgeTypes}
            edges={edges}
            proOptions={{ hideAttribution: true }}
            snapGrid={[50, 50]}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
        >
            <Background
                gap={50}
                size={2}
                style={{ backgroundColor: "#271F2F" }}
                variant={BackgroundVariant.Dots}
            />
            {children}
        </ReactFlow>
    )
}