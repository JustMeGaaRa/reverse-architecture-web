import { Button, HStack, VStack, Text, ButtonGroup, Box } from "@chakra-ui/react";
import { useWorkspace, WorkspaceProvider } from "@structurizr/react";
import { WorkspaceInfo } from "@structurizr/y-workspace";
import { WorkspaceRoom } from "@structurizr/live";
import { useYjsCollaborative, YjsDocumentProvider, YjsIndexeddbPersistanceProvider, YjsUndoManagerProvider, YjsWebrtcProviderProvider } from "@yjs/react";
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Y from "yjs";
import { create, createExplorerDocument, createExplorerPersistance, remove, useWorkspaceExplorer, WorkspaceExplorerProvider, WorkspaceRenderer } from "../../features";
import { WorkspaceIndexeddbLoader, WorkspaceInitializer, WorkspaceWebrtcConnector } from "../workspace";

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

export const TestWorkspacePage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    
    return (
        <YjsDocumentProvider guid={workspaceId}>
            <YjsWebrtcProviderProvider>
                <YjsUndoManagerProvider>

                    <Box backgroundColor={"black"} height={"100vh"}>
                        
                        <WorkspaceIndexeddbLoader workspaceId={workspaceId}>
                            <WorkspaceRoom options={{ roomId: workspaceId }}>
                                <WorkspaceProvider>
                                    <WorkspaceRenderer workspace={undefined} view={undefined}>
                                    </WorkspaceRenderer>
                                </WorkspaceProvider>
                            </WorkspaceRoom>
                        </WorkspaceIndexeddbLoader>

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

                        <WorkspaceProvider>
                            <WorkspaceRenderer workspace={undefined} view={undefined}>
                            </WorkspaceRenderer>
                        </WorkspaceProvider>

                    </Box>

                </YjsUndoManagerProvider>
            </YjsWebrtcProviderProvider>
        </YjsDocumentProvider>
    )
}