import {
    useEdgesState,
    useNodesState,
    useReactFlow
} from "@reactflow/core";
import { ModelViewStrategy, Workspace } from "@structurizr/dsl";
import { WorkspaceViewRenderer, useWorkspace } from "@workspace/core";
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
    const { getViewport } = useReactFlow();
    const reactFlowRef = useRef(null);
    const store = useWorkspace();
    const strategy = useMemo(() => new ModelViewStrategy(workspace.model), [workspace]);

    useModelRenderingEffect(workspace, strategy);
    // TODO: always use autolayout in model view
    // useAutoLayoutEffect();

    return (
        <WorkspaceViewRenderer
            ref={reactFlowRef}
            nodes={nodes}
            nodeTypes={ReactFlowNodeTypes}
            edges={edges}
            edgeTypes={ReactFlowEdgeTypes}
            isReadonly={store.workspace === null || store.workspace === undefined}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
        >
            <ElementFlowControls workspace={workspace} />
            <ElementCollapseControlsBackground />
            {children}
        </WorkspaceViewRenderer>
    )
}