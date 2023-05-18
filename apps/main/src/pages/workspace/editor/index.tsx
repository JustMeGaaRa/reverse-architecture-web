import { Box, Divider, Flex, useToast } from "@chakra-ui/react";
import { CommunityHubApi } from "@reversearchitecture/services";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader
} from "@reversearchitecture/ui";
import { WorkspaceBreadcrumb } from "@reversearchitecture/workspace-breadcrumb";
import { WorkspaceEditor } from "@reversearchitecture/workspace-editor";
import {
    useMetadataStore,
    useStructurizrStore,
    useWorkspace,
    useWorkspaceStore,
    WorkspaceExplorer
} from "@reversearchitecture/workspace-viewer";
import { WorkspaceZoom } from "@reversearchitecture/workspace-zoom";
import { useStructurizrParser } from "@structurizr/react";
import { FC, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

export const CodeEditorSheet: FC<{

}> = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { text, setText } = useStructurizrStore();
    const { workspace, selectedView } = useWorkspaceStore();
    const { metadata, setMetadata } = useMetadataStore();
    const { setWorkspace } = useWorkspace();
    const parseWorkspace = useStructurizrParser();
    
    const toast = useToast();

    useEffect(() => {
        const fetchWorkspace = async (workspaceId: string) => {
            const api = new CommunityHubApi();
            const workspaceText = await api.getWorkspaceText(workspaceId);
            const workspaceMetadata = await api.getWorkspaceMetadata(workspaceId);

            return { text: workspaceText, metadata: workspaceMetadata };
        }
        
        fetchWorkspace(workspaceId)
            .then(({ text, metadata }) => {
                setText(text);
                setWorkspace(parseWorkspace(text), metadata);
                setMetadata(metadata);
            })
            .catch(error => {
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "bottom-right"
                })
            })
    }, [workspaceId, setText, setWorkspace, setMetadata, parseWorkspace, toast]);

    const handleOnChange = useCallback((value: string) => {
        console.log(metadata)
        setText(value);
        setWorkspace(parseWorkspace(value), metadata);
    }, [setText, setWorkspace, parseWorkspace, metadata]);

    return (
        <ContextSheet>
            <Flex
                direction={"row"}
                height={"100%"}
            >
                <Box width={"2000px"}>
                    <ContextSheetHeader title={"Code Editor"} />
                    <Divider />
                    <ContextSheetContent padding={0}>
                        <WorkspaceEditor
                            value={text}
                            onChange={handleOnChange}
                        />
                    </ContextSheetContent>
                </Box>
                <ContextSheet>
                    <WorkspaceExplorer
                        workspace={workspace}
                        initialView={selectedView}
                    >
                        <WorkspaceBreadcrumb />
                        <WorkspaceZoom />
                    </WorkspaceExplorer>
                </ContextSheet>
            </Flex>
        </ContextSheet>
    );
};