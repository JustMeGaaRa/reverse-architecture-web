import { Box, Divider } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    NavigationSource
} from "@reversearchitecture/ui";
import {
    applyMetadata,
    applyTheme,
    Workspace,
    WorkspaceMetadata
} from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { useWorkspaceTheme } from "@workspace/core";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    CommentApi,
    CommentThread,
    CommunityHubApi,
    TemplateOverview,
    WorkspaceInfo
} from "../../../features";

export const CommunityTemplatePage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const navigate = useNavigate();

    // workspace
    const [ info, setInfo ] = useState<WorkspaceInfo>();
    const [ workspace, setWorkspace ] = useState(Workspace.Empty.toObject());
    const [ metadata, setMetadata ] = useState(WorkspaceMetadata.Empty.toObject());
    const { parseStructurizr } = useStructurizrParser();
    const { theme } = useWorkspaceTheme();
    
    useEffect(() => {
        const communityApi = new CommunityHubApi();
        communityApi.getWorkspace(workspaceId)
            .then(info => {
                const builder = parseStructurizr(info.text);
                const workspaceObject = applyMetadata(applyTheme(builder.toObject(), info.theme ?? theme), info.metadata);
                setInfo(info);
                setWorkspace(workspaceObject);
                setMetadata(info.metadata);
            })
            .catch(error => {
                console.error(error);
            })
    }, [workspaceId, theme, parseStructurizr]);

    // comments
    const [ commentThread, setCommentThread ] = useState<CommentThread>();

    useEffect(() => {
        const api = new CommentApi();
        api.getCommentThreadById(workspaceId, "comment-thread-1")
            .then(comments => setCommentThread(comments))
            .catch(error => console.error(error));
    }, [workspaceId]);

    const handleOnClick = useCallback(() => {
        navigate(`/workspaces/${workspaceId}`);
    }, [navigate, workspaceId]);

    return (
        <ContextSheet>
            <NavigationSource />
            
            <ContextSheetHeader>
                <ContextSheetTitle title={"Community"} />
            </ContextSheetHeader>

            <Divider />

            <ContextSheetBody>
                <Box
                    height={"100%"}
                    overflowY={"scroll"}
                    paddingBottom={6}
                >
                    <TemplateOverview
                        information={info}
                        workspace={workspace}
                        metadata={metadata}
                        comments={commentThread}
                        onTryItOutClick={handleOnClick}
                    />
                </Box>
            </ContextSheetBody>
        </ContextSheet>
    )
}