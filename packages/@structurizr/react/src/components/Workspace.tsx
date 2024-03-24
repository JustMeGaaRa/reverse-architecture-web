import "@reactflow/core/dist/style.css";
import '@reactflow/node-resizer/dist/style.css';

import { Background, BackgroundVariant } from "@reactflow/background";
import { ReactFlow, ConnectionMode, ReactFlowProvider } from "@reactflow/core";
import { FC, PropsWithChildren, useState } from "react";
import { WorkspaceContext } from "../contexts";
import { IWorkspaceSnapshot } from "@structurizr/dsl";

export const Workspace: FC<PropsWithChildren<{ workspace: IWorkspaceSnapshot }>> = ({ children, workspace: workspaceProp }) => {
    const [ workspace, setWorkspace ] = useState<IWorkspaceSnapshot>(workspaceProp);
    
    return (
        <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
            <ReactFlowProvider>
                <ReactFlow
                    connectionMode={ConnectionMode.Loose}
                    fitViewOptions={{
                        padding: 0.3,
                        maxZoom: 5,
                        minZoom: 0.1
                    }}
                    fitView
                    nodeTypes={{}}
                    defaultNodes={[]}
                    nodeDragThreshold={5}
                    edgeTypes={{}}
                    defaultEdges={[]}
                    proOptions={{ hideAttribution: true }}
                    snapGrid={[50, 50]}
                >
                    <Background
                        gap={50}
                        size={2}
                        variant={BackgroundVariant.Dots}
                    />
                    {children}
                </ReactFlow>
            </ReactFlowProvider>
        </WorkspaceContext.Provider>
    )
}