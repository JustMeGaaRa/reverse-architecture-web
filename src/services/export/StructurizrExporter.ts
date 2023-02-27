import { Workspace } from "../../dsl";

export const exportToStructurizrDsl = (workspace: Workspace): File => {
    const dsl = workspaceToStructurizrDsl(workspace);
    const filename = workspace.name ?? "Workspace";
    return new File([dsl], `${filename}.dsl`);
};

function workspaceToStructurizrDsl(workspace: Workspace): string {
    throw new Error("Function not implemented.");
}

export const exportToStructurizrJson = (workspace: Workspace): File => {
    const dsl = JSON.stringify(workspace, null, 4);
    const filename = workspace.name ?? "Workspace";
    return new File([dsl], `${filename}.json`);
};
