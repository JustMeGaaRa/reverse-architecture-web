import { Workspace } from "@justmegaara/structurizr-dsl";
import { ReactFlowJsonObject } from "@reactflow/core";

export function exportToJson(workspace: Workspace, flowState: ReactFlowJsonObject): File {
    const json = JSON.stringify(flowState, null, 4);
    const filename = workspace.name ?? "Workspace";
    return new File([json], `${filename}.json`);
}
