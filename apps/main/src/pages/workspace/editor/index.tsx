import { Box, Divider, Flex, useToast } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader
} from "@reversearchitecture/ui";
import { WorkspaceEditor } from "@reversearchitecture/workspace-editor";
import {
    useMetadata,
    WorkspaceBreadcrumbs,
    WorkspaceExplorer,
    WorkspaceZoomControls
} from "@reversearchitecture/workspace-viewer";
import {
    IWorkspaceMetadata,
    IViewDefinition,
    Workspace,
    applyMetadata,
    applyTheme,
    IWorkspaceTheme
} from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommunityHubApi } from "../../../services";

export const CodeEditorSheet: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ state, setState ] = useState({
        showPages: false,
        showComments: false,
        showEditor: false,
        showTimer: false
    });
    const [ text, setText ] = useState("");
    const [ workspace, setWorkspace ] = useState(Workspace.Empty);
    const [ selectedView, setSelectedView ] = useState<IViewDefinition>();
    const [ metadata, setMetadata ] = useState<IWorkspaceMetadata>();

    const { applyElementPosition } = useMetadata();
    const parseWorkspace = useStructurizrParser();
    
    const toast = useToast();

    useEffect(() => {
        const fetchWorkspace = async (workspaceId: string) => {
            const api = new CommunityHubApi();
            const workspaceText = await api.getWorkspaceText(workspaceId);
            const workspaceMetadata = await api.getWorkspaceMetadata(workspaceId);
            const theme = await api.getWorkspaceTheme(workspaceId);

            return { text: workspaceText, metadata: workspaceMetadata, theme: theme };
        }
        
        fetchWorkspace(workspaceId)
            .then(({ text, metadata, theme }) => {
                const workspace = parseWorkspace(text);
                setText(text);
                setWorkspace(applyMetadata(applyTheme(workspace, theme), metadata));
                setMetadata(metadata);
                setSelectedView(workspace.views.systemLandscape
                    ?? workspace.views.systemContexts[0]
                    ?? workspace.views.containers[0]
                    ?? workspace.views.components[0]
                    ?? workspace.views.deployments[0]);
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
    }, [workspaceId, toast, parseWorkspace]);

    const handleOnChange = useCallback((value: string) => {
        setText(value);
        setWorkspace(applyMetadata(parseWorkspace(text), metadata));
    }, [parseWorkspace, text, metadata]);

    const handleOnNodeDragStop = useCallback((event: React.MouseEvent, node: any) => {
        const emptyMetadata = {
            name: "",
            lastModifiedDate: new Date(),
            views: {
                systemLandscape: undefined,
                systemContexts: [],
                containers: [],
                components: [],
                deployments: []
            }
        };
        const updatedMetadata = applyElementPosition(
            metadata ?? emptyMetadata,
            selectedView,
            node.data.element.identifier,
            node.position
        );
        setMetadata(updatedMetadata);
    }, [metadata, selectedView, applyElementPosition]);

    return (
        <ContextSheet>
            <Flex
                direction={"row"}
                height={"100%"}
            >
                <Box width={"1200px"}>
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
                        selectedView={selectedView}
                        onNodeDragStop={handleOnNodeDragStop}
                    >
                        {/* <WorkspaceBreadcrumbs /> */}
                        <WorkspaceZoomControls />
                    </WorkspaceExplorer>
                </ContextSheet>
            </Flex>
        </ContextSheet>
    );
};