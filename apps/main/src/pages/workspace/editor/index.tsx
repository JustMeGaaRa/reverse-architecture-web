import { Box, Divider, Flex, useToast } from "@chakra-ui/react";
import { CommunityHubApi } from "@reversearchitecture/services";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader
} from "@reversearchitecture/ui";
import { WorkspaceBreadcrumb } from "@reversearchitecture/workspace-breadcrumb";
import { WorkspaceEditor } from "@reversearchitecture/workspace-editor";
import { useMetadata, WorkspaceExplorer } from "@reversearchitecture/workspace-viewer";
import { WorkspaceZoom } from "@reversearchitecture/workspace-zoom";
import { IWorkspaceMetadata, IView, Workspace, applyMetadata, applyTheme } from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    const [ selectedView, setSelectedView ] = useState<IView>();
    const [ metadata, setMetadata ] = useState<IWorkspaceMetadata>();

    const { applyElementPosition } = useMetadata();
    const parseWorkspace = useStructurizrParser();
    
    const toast = useToast();

    const applyWorkspace = useCallback((workspace: Workspace, metadata?: IWorkspaceMetadata) => {
        const updatedWorkspace = metadata
            ? applyMetadata(workspace, metadata)
            : workspace;
        
        setWorkspace(updatedWorkspace);
        setSelectedView(selectedView
            ?? updatedWorkspace.views.systemLandscape
            ?? updatedWorkspace.views.systemContexts[0]
            ?? updatedWorkspace.views.containers[0]
            ?? updatedWorkspace.views.components[0]
            ?? updatedWorkspace.views.deployments[0]);
    }, [selectedView, setSelectedView, setWorkspace]);

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
                setText(text);
                applyWorkspace(applyTheme(parseWorkspace(text), theme), metadata);
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
    }, [workspaceId, toast, setText, applyWorkspace, setMetadata, parseWorkspace]);

    const handleOnChange = useCallback((value: string) => {
        setText(value);
        applyWorkspace(parseWorkspace(value), metadata);
    }, [metadata, setText, applyWorkspace, parseWorkspace]);

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
                        <WorkspaceBreadcrumb />
                        <WorkspaceZoom />
                    </WorkspaceExplorer>
                </ContextSheet>
            </Flex>
        </ContextSheet>
    );
};