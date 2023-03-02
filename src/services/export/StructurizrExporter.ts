import { toWorkspaceString, Workspace } from "../../dsl";

export const exportToStructurizrDsl = (workspace: Workspace): File => {
    const dsl = toWorkspaceString(workspace);
    const filename = workspace.name ?? "Workspace";
    return new File([dsl], `${filename}.dsl`);
};

export const exportToStructurizrJson = (workspace: Workspace): File => {
    const dsl = JSON.stringify(workspace, null, 4);
    const filename = workspace.name ?? "Workspace";
    return new File([dsl], `${filename}.json`);
};
