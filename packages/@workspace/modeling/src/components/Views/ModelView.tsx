import {
    Background,
    BackgroundVariant
} from "@reactflow/background";
import {
    useEdgesState,
    useNodesState,
    useReactFlow
} from "@reactflow/core";
import {
    IModel,
    IWorkspace,
    ModelViewStrategy
} from "@structurizr/dsl";
import {
    WorkspaceViewRenderer,
    useAutoLayoutEffect,
    getAbsolutePoint
} from "@workspace/core";
import {
    FC,
    PropsWithChildren,
    useMemo,
    useRef
} from "react";
import { EdgeTypes, NodeTypes } from "../../components";
import { useModelRenderingEffect, useModelView } from "../../hooks";

export const ModelView: FC<PropsWithChildren<{
    model: IModel;
    onWorkspaceChange?: (workspace: IWorkspace) => void;
}>> = ({
    children,
    model,
    onWorkspaceChange
}) => {
    const [ nodes, , onNodesChange ] = useNodesState([]);
    const [ edges, , onEdgesChange ] = useEdgesState([]);
    const reactFlowRef = useRef(null);
    const strategy = useMemo(() => new ModelViewStrategy(model), [model]);
    const {
        addPerson,
        addSoftwareSystem,
        addContainer,
        addComponent,
        addDeploymentNode,
        addInfrastructureNode
    } = useModelView();
    const { getViewport } = useReactFlow();

    useAutoLayoutEffect();
    useModelRenderingEffect(strategy);

    return (
        <WorkspaceViewRenderer
            ref={reactFlowRef}
            nodeTypes={NodeTypes}
            nodes={nodes}
            edgeTypes={EdgeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
        >
            {children}
        </WorkspaceViewRenderer>
    )
}