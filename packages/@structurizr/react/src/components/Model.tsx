import { useReactFlow } from "@reactflow/core";
import { IModel, IModelMetadata } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState, useEffect } from "react";
import { useWorkspace } from "../hooks";
import { ModelContext } from "../contexts";

export const Model: FC<PropsWithChildren> = ({ children }) => {
    const [ model, setModel ] = useState<IModel>();
    const [ metadata, setMetadata ] = useState<IModelMetadata>();
    const { workspace } = useWorkspace();
    const { setNodes, setEdges } = useReactFlow();

    useEffect(() => {
        if (workspace) {
            // const updateFlow = () => {
            //     const workspaceSnapshot = workspace.toSnapshot();
            //     console.log("model updated", workspaceSnapshot);

            //     const strategy = new ModelViewStrategy(workspaceSnapshot.model);
            //     const reactFlowAuto = { nodes: [], edges: [] };
            //     const metadata = { elements: [], relationships: [] };
                
            //     setMetadata(metadata);
            //     setNodes(reactFlowAuto.nodes);
            //     setEdges(reactFlowAuto.edges);
            // }
    
            // workspace.model.subscribe(updateFlow);
            // updateFlow();
    
            // return () => {
            //     workspace.model.unsubscribe(updateFlow);
            // }
        }
    }, [workspace, setEdges, setNodes]);

    return (
        <ModelContext.Provider value={{ model, metadata, setModel, setMetadata }}>
            {children}
        </ModelContext.Provider>
    )
}