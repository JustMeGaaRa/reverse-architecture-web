import { ReactFlowJsonObject } from "@reactflow/core";
import { Workspace } from "../../dsl";

export function exportToJson(workspace: Workspace, flowState: ReactFlowJsonObject): File {
    const json = JSON.stringify(flowState, null, 4);
    const filename = workspace.name ?? "Workspace";
    return new File([json], `${filename}.json`);
}
