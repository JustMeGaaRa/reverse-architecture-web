import { Workspace as WorkspaceType } from "@justmegaara/structurizr-dsl";
import { WorkspaceRenderer } from "@justmegaara/workspace-viewer";
import { WorkspaceApi } from "@reversearchitecture/services";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContextSheet } from "../../../components/ContextSheet";

export const WorkspaceViewerSheet: FC<{

}> = () => {
    const params = useParams<{ workspaceId: string }>();
    const [workspace, setWorkspace] = useState<WorkspaceType>();

    useEffect(() => {
        const api = new WorkspaceApi();
        api.getWorkspace(params.workspaceId)
            .then(workspace => {
                setWorkspace(JSON.parse(JSON.stringify(workspace)));
            })
            .catch(error => {
                console.error(error);
            });
    }, [params.workspaceId]);

    return (
        <ContextSheet>
            <WorkspaceRenderer
                workspace={workspace}
            >

            </WorkspaceRenderer>
        </ContextSheet>
    );
};