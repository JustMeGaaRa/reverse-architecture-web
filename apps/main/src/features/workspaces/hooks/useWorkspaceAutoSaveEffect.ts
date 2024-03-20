import { useEffect } from "react";
import { Workspace } from "@structurizr/dsl";
import { useSnackbar } from "../../snackbar";
import { saveWorkspaceContent } from "../services";
import { useWorkspaceExplorer } from "./useWorkspaceExplorer";
import { useWorkspace } from "@structurizr/react";

export type WorkspaceAutoSaveOptions = {
    interval?: number;
}

export const useWorkspaceAutoSaveEffect = (workspaceId: string, options?: WorkspaceAutoSaveOptions) => {
    const { snackbar } = useSnackbar();
    const { workspace } = useWorkspace();
    const { setWorkspaces } = useWorkspaceExplorer();

    useEffect(() => {
        const autoSave = setInterval(() => {
            // TODO: check if workspace has been modified
            // TODO: save workspace structurizr code to local storage
            saveWorkspaceContent(workspaceId, new Workspace(workspace))
                .then(workspace => {
                    // setWorkspaces(workspaces => workspaces.map(existing => {
                    //     return existing.workspaceId !== workspaceId
                    //         ? existing
                    //         : { ...existing, content: { ...existing.content } }
                    // }));
                })
                .catch(error => {
                    snackbar({
                        title: "Error saving workspace",
                        description: error.message,
                        status: "error"
                    })
                });
        }, options?.interval ?? 10000);

        return () => {
            clearInterval(autoSave);
        }
    }, [workspaceId, workspace, setWorkspaces, snackbar, options?.interval]);
}