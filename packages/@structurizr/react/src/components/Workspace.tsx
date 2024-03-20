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
                    
                    {/* <svg width="100%" height="100%">
                        <defs>
                            <pattern id="smallGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="gray" strokeWidth="0.5"/>
                            </pattern>
                            <pattern id="grid" width="500" height="500" patternUnits="userSpaceOnUse">
                                <rect width="500" height="500" fill="url(#smallGrid)"/>
                                <path d="M 500 0 L 0 0 0 500" fill="none" stroke="gray" strokeWidth="1"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg> */}
                    {children}
                </ReactFlow>
            </ReactFlowProvider>
        </WorkspaceContext.Provider>
    )
}

export const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ workspace, setWorkspace ] = useState<IWorkspaceSnapshot>({
        name: "",
        description: "",
        version: 0,
        lastModifiedDate: new Date(),
        model: {
            groups: [],
            people: [],
            softwareSystems: [],
            deploymentEnvironments: [],
            relationships: []
        },
        views: {
            systemContexts: [],
            containers: [],
            components: [],
            deployments: [],
            configuration: {
                themes: [],
                styles: {
                    elements: [],
                    relationships: []
                }
            }
        }
    });

    return (
        <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
            {children}
        </WorkspaceContext.Provider>
    )
}