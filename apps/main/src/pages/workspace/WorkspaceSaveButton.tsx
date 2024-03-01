import {
    Icon,
    IconButton,
} from "@chakra-ui/react"
import { CloudSync } from "iconoir-react";
import { FC, useCallback } from "react"
import {
    IWorkspace,
    IWorkspaceMetadata,
    MetadataExportClient,
    StructurizrExportClient,
    Workspace
} from "structurizr";
import {
    saveWorkspaceContent,
    useSnackbar,
    useWorkspaceExplorer
} from "../../features";

export const WorkspaceSaveButton: FC<{
    workspaceId: string;
    workspace: IWorkspace;
}> = ({
    workspaceId,
    workspace
}) => {
    const { snackbar } = useSnackbar();
    const { workspaces, setWorkspaces } = useWorkspaceExplorer();

    const saveWorkspace = useCallback((workspaceId: string, workspace: Workspace) => {
        saveWorkspaceContent(workspaceId, workspace)
            .then(workspace => {
                const structurizrClient = new StructurizrExportClient();
                const structurizr = structurizrClient.export(workspace);
                const metadataClient = new MetadataExportClient();
                const metadata = metadataClient.export(workspace);

                setWorkspaces(workspaces.map(existing => {
                    return existing.workspaceId !== workspaceId
                        ? existing
                        : { ...existing, content: { structurizr, metadata: JSON.parse(metadata) as IWorkspaceMetadata } }
                }));
            })
            .catch(error => {
                snackbar({
                    title: "Error saving workspace",
                    description: error.message,
                    status: "error"
                })
            });
    }, [workspaces, setWorkspaces, snackbar]);

    const handleOnClickWorkspaceSave = useCallback(() => {
        saveWorkspace(workspaceId, new Workspace(workspace));
    }, [saveWorkspace, workspaceId, workspace]);

    return (
        <IconButton
            aria-label={"save"}
            colorScheme={"gray"}
            icon={<Icon as={CloudSync} boxSize={5} />}
            size={"md"}
            variant={"ghost"}
            onClick={handleOnClickWorkspaceSave}
        />
    )
}