import { Identifier, Workspace } from "@structurizr/dsl";
import { ReactFlowJsonObject } from "@reactflow/core";

export const toReactFlow = (workspaceObject?: Workspace, selectedView?: Identifier): ReactFlowJsonObject => {
    return {
        nodes: [],
        edges: [],
        viewport: {
            x: 0,
            y: 0,
            zoom: 1,
        }
    }
}