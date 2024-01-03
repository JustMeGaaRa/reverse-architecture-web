import { useEdgesState, useNodesState } from "@reactflow/core";
import { ModelViewStrategy, Workspace } from "@structurizr/dsl";
import { WorkspaceViewRenderer } from "@workspace/core";
import {
    FC,
    PropsWithChildren,
    useMemo,
    useRef
} from "react";
import {
    ReactFlowEdgeTypes,
    ElementCollapseControlsBackground,
    ReactFlowNodeTypes,
    ElementFlowControls
} from "../../components";
import { useModelRenderingEffect, useModelView } from "../../hooks";

export const ModelView: FC<PropsWithChildren<{
    workspace: Workspace;
    onWorkspaceChange?: (workspace: Workspace) => void;
}>> = ({
    children,
    workspace,
    onWorkspaceChange
}) => {
    const [ nodes, , onNodesChange ] = useNodesState([]);
    const [ edges, , onEdgesChange ] = useEdgesState([]);
    const {
        addPerson,
        addSoftwareSystem,
        addContainer,
        addComponent,
        addDeploymentNode,
        addInfrastructureNode
    } = useModelView();
    const reactFlowRef = useRef(null);
    const strategy = useMemo(() => new ModelViewStrategy(workspace.model), [workspace]);

    useModelRenderingEffect(workspace, strategy);

    return (
        <WorkspaceViewRenderer
            ref={reactFlowRef}
            nodes={nodes}
            nodeTypes={ReactFlowNodeTypes}
            edges={edges}
            edgeTypes={ReactFlowEdgeTypes}
            isReadonly={true}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
        >
            <ElementFlowControls workspace={workspace} />
            <ElementCollapseControlsBackground />
            {children}
        </WorkspaceViewRenderer>
    )
}