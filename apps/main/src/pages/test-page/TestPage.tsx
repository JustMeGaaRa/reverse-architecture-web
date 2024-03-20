import { Button, HStack, VStack, Text, ButtonGroup, Box } from "@chakra-ui/react";
import { useWorkspace } from "@structurizr/react";
import { WorkspaceInfo } from "@structurizr/y-workspace";
import { useYjsCollaborative, YjsDocumentProvider, YjsIndexeddbPersistanceProvider, YjsUndoManagerProvider, YjsWebrtcProviderProvider } from "@yjs/react";
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Y from "yjs";
import { create, createExplorerDocument, createExplorerPersistance, remove, useWorkspaceExplorer, WorkspaceExplorerProvider } from "../../features";
import { WorkspaceIndexeddbLoader, WorkspaceInitializer, WorkspaceWebrtcConnector } from "../workspace";
import { WorkspaceRenderer } from "./WorkspaceRenderer";

export const TestWorkspaceInfo: FC<{ workspaceId: string; }> = ({ workspaceId }) => {
    const navigate = useNavigate();
    const { document } = useYjsCollaborative();
    const { setWorkspaces } = useWorkspaceExplorer();

    const handleOnOpen = useCallback(() => {
        navigate(`/test/${workspaceId}`);
    }, [navigate, workspaceId]);

    const handleOnRemove = useCallback(() => {
        remove(document, workspaceId)
            .then(() => {
                setWorkspaces(workspaces => workspaces.filter(workspace => workspace.workspaceId !== workspaceId));
            });
    }, [document, setWorkspaces, workspaceId]);

    return (
        <HStack key={workspaceId}>
            <Text>{workspaceId}</Text>
            <ButtonGroup>
                <Button onClick={handleOnOpen}>Open</Button>
                <Button onClick={handleOnRemove}>Remove</Button>
            </ButtonGroup>
        </HStack>
    )
}

export const TestWorkspaceCollection: FC = () => {
    const { document, setDocument, setPersistance } = useYjsCollaborative();
    const { workspaces, setWorkspaces } = useWorkspaceExplorer();

    useEffect(() => {
        const [document] = createExplorerDocument();
        const [persitance] = createExplorerPersistance(document);

        persitance.whenSynced.then(persistance => {
            const workspacesMap = document.getMap("workspaces");

            const workspaces = Array
                .from<Y.Map<unknown>>(workspacesMap.values())
                .map(workspaceInfoMap => new WorkspaceInfo(workspaceInfoMap));
            
            setDocument(document);
            setPersistance(persitance);
            setWorkspaces(workspaces);
        });
        
        return () => {
            persitance.destroy();
        }
    }, [setDocument, setPersistance, setWorkspaces]);

    const handleOnCreate = useCallback(() => {
        create(document, "anonymous")
            .then(workspaceInfo => {;
                setWorkspaces(workspaces => [ ...workspaces, workspaceInfo ]);
            });
    }, [document, setWorkspaces]);

    return (
        <Box backgroundColor={"black"} height={"100vh"}>
            <VStack>
                <Button onClick={handleOnCreate}>Create</Button>
                <VStack>
                    {workspaces.map(workspace => (
                        <TestWorkspaceInfo
                            key={workspace.workspaceId}
                            workspaceId={workspace.workspaceId}
                        />
                    ))}
                </VStack>
            </VStack>
        </Box>
    )
}

export const TestWorkspaceExplorerPage: FC = () => {
    return (
        <YjsDocumentProvider>
            <YjsIndexeddbPersistanceProvider>
                <WorkspaceExplorerProvider>
                    <TestWorkspaceCollection />
                </WorkspaceExplorerProvider>
            </YjsIndexeddbPersistanceProvider>
        </YjsDocumentProvider>
    )
}

export const WorkspaceControls: FC<PropsWithChildren> = ({ children }) => {
    const { undoManager } = useYjsCollaborative();
    const { workspace } = useWorkspace();

    const handleOnAddSoftwareSystem = useCallback(() => {
        // const softwareSystem = workspace.model.addSoftwareSystem();
        // const container = softwareSystem.addContainer();
        // const component = container.addComponent();
    }, [workspace]);

    return (
        <HStack position={"absolute"} padding={4} right={0} zIndex={1000}>
            <ButtonGroup>
                <Button onClick={handleOnAddSoftwareSystem}>Add</Button>
                <Button isDisabled={!undoManager?.canUndo()} onClick={() => undoManager.undo()}>Undo</Button>
                <Button isDisabled={!undoManager?.canRedo()} onClick={() => undoManager.redo()}>Redo</Button>
            </ButtonGroup>
        </HStack>
    )
}

export const TestWorkspacePage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    
    return (
        <YjsDocumentProvider guid={workspaceId}>
            <YjsWebrtcProviderProvider>
                <YjsUndoManagerProvider>

                    <Box backgroundColor={"black"} height={"100vh"}>
                        
                        <WorkspaceRenderer>
                            <WorkspaceIndexeddbLoader workspaceId={workspaceId}>
                                <WorkspaceWebrtcConnector workspaceId={workspaceId}>
                                    <WorkspaceInitializer />
                                </WorkspaceWebrtcConnector>
                            </WorkspaceIndexeddbLoader>
                            <WorkspaceControls />
                        </WorkspaceRenderer>

                    </Box>

                </YjsUndoManagerProvider>
            </YjsWebrtcProviderProvider>
        </YjsDocumentProvider>
    )
}

export const TestSharedPage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();

    return (
        <YjsDocumentProvider guid={workspaceId}>
            <YjsWebrtcProviderProvider>
                <YjsUndoManagerProvider>

                    <Box backgroundColor={"black"} height={"100vh"}>

                        <WorkspaceRenderer>
                            <WorkspaceWebrtcConnector workspaceId={workspaceId}>
                                <WorkspaceInitializer />
                            </WorkspaceWebrtcConnector>
                            <WorkspaceControls />
                        </WorkspaceRenderer>

                    </Box>

                </YjsUndoManagerProvider>
            </YjsWebrtcProviderProvider>
        </YjsDocumentProvider>
    )
}