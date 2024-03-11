import { Node, useEdgesState, useNodesState } from "@reactflow/core";
import { IWorkspaceSnapshot, ModelViewStrategy, Position, Workspace } from "@structurizr/dsl";
import { WorkspaceViewRenderer } from "@workspace/core";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useMemo,
    useRef
} from "react";
import {
    ReactFlowModelEdgeTypes,
    ElementCollapseControlsBackground,
    ReactFlowModelNodeTypes,
    ElementModelFlowControls
} from "../../components";
import {
    useModelFlowBuilder,
    useModelRenderingEffect,
    useModelView
} from "../../hooks";

export const ModelView: FC<PropsWithChildren<{
    workspace: IWorkspaceSnapshot;
    onWorkspaceViewClick?: (event: React.MouseEvent) => void;
}>> = ({
    children,
    workspace,
    onWorkspaceViewClick
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
    const {
        addDefaultElement
    } = useModelFlowBuilder();
    const reactFlowRef = useRef(null);
    const strategy = useMemo(() => new ModelViewStrategy(workspace.model), [workspace]);

    useModelRenderingEffect(workspace, strategy);

    // TODO: add element in position on react flow pane, but not in workspace view
    const handleOnFlowClick = useCallback((sourceNode: Node, position: Position) => {
        const element = addDefaultElement(
            sourceNode.data.element.type,
            position,
            sourceNode.data.element.identifier
        );
    }, [addDefaultElement]);

    return (
        <WorkspaceViewRenderer
            ref={reactFlowRef}
            nodes={nodes}
            nodeTypes={ReactFlowModelNodeTypes}
            edges={edges}
            edgeTypes={ReactFlowModelEdgeTypes}
            isReadonly={true}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onPaneClick={onWorkspaceViewClick}
        >
            <ElementModelFlowControls
                workspace={workspace}
                onHandleClick={handleOnFlowClick}
            />
            <ElementCollapseControlsBackground />
            {children}
        </WorkspaceViewRenderer>
    )
}