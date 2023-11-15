import { Box, Divider } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    HeaderContentSource
} from "@reversearchitecture/ui";
import {
    applyMetadata,
    applyTheme,
    Workspace,
    WorkspaceMetadata
} from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { useWorkspaceTheme } from "@workspace/core";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    CommentApi,
    CommentThread,
    TemplateOverview,
    WorkspaceApi,
    WorkspaceInfo
} from "../../../features";

export const CommunityTemplatePage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const navigate = useNavigate();

    // workspace
    const { workspaceApi } = useMemo(() => ({ workspaceApi: new WorkspaceApi() }), []);
    const [ info, setInfo ] = useState<WorkspaceInfo>();
    const [ workspace, setWorkspace ] = useState(Workspace.Empty.toObject());
    const [ metadata, setMetadata ] = useState(WorkspaceMetadata.Empty.toObject());
    const { parseStructurizr } = useStructurizrParser();
    const { theme } = useWorkspaceTheme();
    
    useEffect(() => {
        workspaceApi.getWorkspaceById(workspaceId)
            .then(info => {
                const builder = parseStructurizr(info.content?.text);
                const workspaceObject = applyMetadata(applyTheme(builder.toObject(), info.content?.theme ?? theme), info.content?.metadata);
                setInfo(info);
                setWorkspace(workspaceObject);
                setMetadata(info.content?.metadata);
            })
            .catch(error => {
                console.error(error);
            })
    }, [workspaceApi, workspaceId, theme, parseStructurizr]);

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
            <HeaderContentSource section={"right"} />
            
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