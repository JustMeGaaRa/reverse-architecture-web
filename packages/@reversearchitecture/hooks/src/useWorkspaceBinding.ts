import { Workspace } from "@justmegaara/structurizr-dsl";
import { useWorkspaceStore } from "@justmegaara/workspace-viewer";
import { ReactFlowJsonObject } from "@reactflow/core";
import * as Y from "yjs";
import { useSharedWorkspaceObject } from "./useSharedWorkspaceObject";
import { toReactFlow } from "./utils";

export const useWorkspaceBinding = () => {
    const { sharedWorkspaceObject } = useSharedWorkspaceObject();
    const { selectedView, setWorkspace } = useWorkspaceStore();

    const saveReactFlow = (reactFlowObject: ReactFlowJsonObject): ReactFlowJsonObject => {
        return reactFlowObject;
    }

    const saveWorkspace = (workspaceObject?: Workspace): Workspace | undefined => {
        if (workspaceObject) {
            setWorkspace(workspaceObject);
        }
        
        return workspaceObject;
    }

    const parseYDoc = (sharedWorkspace?: Y.Doc): Workspace | undefined => {
        return undefined;
    }

    [sharedWorkspaceObject]
        .map(workspace => saveWorkspace(parseYDoc(workspace)))
        .map(workspace => saveReactFlow(toReactFlow(workspace, undefined)));
}