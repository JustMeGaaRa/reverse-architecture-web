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
import { IModel, ModelViewStrategy } from "@structurizr/dsl";
import { useAutoLayoutEffect } from "@workspace/core";
import { FC, PropsWithChildren, useMemo } from "react";
import { useModelRenderingEffect } from "../../hooks";
import { EdgeTypes, NodeTypes } from "../../utils";

export const ModelView: FC<PropsWithChildren<{
    model: IModel;
}>> = ({
    children,
    model
}) => {
    const FitViewOptions = useMemo(() => ({
        padding: 0.2,
        duration: 500,
        maxZoom: 5,
        minZoom: 0.1
    }), []);

    const strategy = useMemo(() => new ModelViewStrategy(model), [model]);
    const [ nodes, , onNodesChange ] = useNodesState([]);
    const [ edges, , onEdgesChange ] = useEdgesState([]);

    useAutoLayoutEffect();
    useModelRenderingEffect(strategy);

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