import { Workspace } from "@justmegaara/structurizr-dsl";
import { useWorkspaceStore } from "@justmegaara/workspace-viewer";
import { ReactFlowJsonObject } from "@reactflow/core";
import * as Y from "yjs";
import { useSelectedView } from "./useSelectedView";
import { useSharedWorkspaceText } from "./useSharedWorkspaceText";
import { toReactFlow } from "./utils";

const useWorkspaceTextBinding = () => {
    const { selectedView } = useSelectedView();
    const { sharedWorkspaceText } = useSharedWorkspaceText();
    const { setWorkspace } = useWorkspaceStore();

    const saveReactFlow = (reactFlowObject: ReactFlowJsonObject): ReactFlowJsonObject => {
        return reactFlowObject;
    }

    const saveWorkspace = (workspaceObject?: Workspace): Workspace | undefined => {
        if (workspaceObject) {
            setWorkspace(workspaceObject);
        }

        return workspaceObject;
    }

    const parseText = (sharedWorkspaceText?: Y.Text): any => {
        return undefined;
    }

    const parseAst = (workspaceAst: any): Workspace | undefined => {
        return undefined;
    }

    [sharedWorkspaceText]
        .map(workspace => parseText(workspace?.getText("workspace-dsl")))
        .map(workspace => saveWorkspace(parseAst(workspace)))
        .map(workspace => saveReactFlow(toReactFlow(workspace, selectedView)));
}