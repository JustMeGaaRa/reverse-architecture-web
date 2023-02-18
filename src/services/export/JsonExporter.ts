import { Workspace } from "../../dsl";

export function exportToJson(workspace: Workspace): File {
    const json = JSON.stringify(workspace);
    const filename = workspace.name ?? "Workspace";
    return new File([json], `${filename}.json`);
}
