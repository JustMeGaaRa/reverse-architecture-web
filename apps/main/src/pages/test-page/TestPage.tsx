import { Button, HStack, VStack, Text, ButtonGroup, Box } from "@chakra-ui/react";
import {
    WorkspaceExplorerProvider,
    WorkspaceProvider,
    YjsDocumentProvider,
    YjsWebrtcProviderProvider,
    YjsUndoManagerProvider,
    YjsIndexeddbPersistanceProvider,
    createWorkspaceConnection,
    create,
    createExplorerDocument,
    createExplorerPersistance,
    createWorkspacePersistance,
    remove,
    useWorkspace,
    useYjsCollaborative,
    useWorkspaceExplorer
} from "@structurizr/react";
import { Workspace, WorkspaceInfo } from "@structurizr/y-workspace";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Y from "yjs";
import { WorkspaceRenderer } from "./WorkspaceRenderer";

export const TestWorkspaceInfo: FC<{
    workspaceId: string;
}> = ({
    workspaceId
}) => {
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
        create(document)
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

export const TestWorkspace: FC = () => {
    const { undoManager } = useYjsCollaborative();
    const { workspace } = useWorkspace();

    const handleOnAddSoftwareSystem = useCallback(() => {
        const softwareSystem = workspace.model.addSoftwareSystem();
        const container = softwareSystem.addContainer();
        const component = container.addComponent();
        console.log("add software system", workspace.toSnapshot());
    }, [workspace]);

    return workspace !== undefined && workspace != null && (
        <Box backgroundColor={"black"} height={"100vh"}>
            {/* <HStack>
                <Text>{workspace?.version}</Text>
                <ButtonGroup>
                    <Button isDisabled={!undoManager?.canUndo()} onClick={() => undoManager.undo()}>Undo</Button>
                    <Button isDisabled={!undoManager?.canRedo()} onClick={() => undoManager.redo()}>Redo</Button>
                    <Button onClick={handleOnAddSoftwareSystem}>Add</Button>
                </ButtonGroup>
            </HStack> */}
            <WorkspaceRenderer workspace={workspace} />
        </Box>
    )
}

export const TestWorkspacePage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    
    return (
        <YjsDocumentProvider guid={workspaceId}>
            <YjsWebrtcProviderProvider>
                <YjsUndoManagerProvider>
                    <WorkspaceProvider>
                        <TestWorkspaceLoader workspaceId={workspaceId}>
                            <TestWorkspaceConnector workspaceId={workspaceId}>
                                <TestWorkspaceInitializer />
                            </TestWorkspaceConnector>
                        </TestWorkspaceLoader>

                        <TestWorkspace />
                    </WorkspaceProvider>
                </YjsUndoManagerProvider>
            </YjsWebrtcProviderProvider>
        </YjsDocumentProvider>
    )
}

export const TestWorkspaceLoader: FC<PropsWithChildren<{ workspaceId: string; }>> = ({ children, workspaceId }) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const { document, setPersistance } = useYjsCollaborative();

    useEffect(() => {
        if (workspaceId && document) {
            const [persistance] = createWorkspacePersistance(workspaceId, document);

            persistance.whenSynced.then(persistance => {
                setPersistance(persistance);
                setIsLoading(false)
            });

            return () => {
                persistance.destroy();
            }
        }
    }, [document, setPersistance, workspaceId]);

    return isLoading
        ? (
            <>
                <Text>Loading...</Text>
            </>
        ) : (
            <>
                {children}
            </>
        );
}

export const TestWorkspaceConnector: FC<PropsWithChildren<{ workspaceId: string; }>> = ({ children, workspaceId }) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const { document, setConnection } = useYjsCollaborative();

    useEffect(() => {
        if (workspaceId) {
            const [connection] = createWorkspaceConnection(workspaceId, document);

            setConnection(connection);
            setIsLoading(false);

            return () => {
                connection.destroy();
            }
        }
    }, [document, setConnection, workspaceId]);

    return isLoading
        ? (
            <>
                <Text>Loading...</Text>
            </>
        ) : (
            <>
                {children}
            </>
        );
}

export const TestWorkspaceInitializer: FC<PropsWithChildren<{}>> = ({ children }) => {
    const { setWorkspace } = useWorkspace();
    const { document, setUndoManager } = useYjsCollaborative();
    
    useEffect(() => {
        if (document) {
            const modelMap = document.getMap("model");
            const viewsMap = document.getMap("views");
            const propertiesMap = document.getMap("properties");
    
            const workspace = new Workspace(document);
            console.log("add software system", workspace.toSnapshot());
                        
            const undoManager = new Y.UndoManager([modelMap, viewsMap, propertiesMap]);
            setUndoManager(undoManager);
            setWorkspace(workspace);
            
            const modelObserver = () => { console.log("model changed", workspace.toSnapshot()) };
            const viewsObserver = () => { console.log("views changed", workspace.toSnapshot()) };
            const propertiesObserver = () => { console.log("properties changed", workspace.toSnapshot()) };
    
            modelMap.observeDeep(modelObserver);
            viewsMap.observeDeep(viewsObserver)
            propertiesMap.observeDeep(propertiesObserver);

            return () => {
                modelMap.unobserveDeep(modelObserver);
                viewsMap.unobserveDeep(viewsObserver);
                propertiesMap.unobserveDeep(propertiesObserver);
            }
        }
    }, [document, setUndoManager, setWorkspace]);

    return (
        <>
            {children}
        </>
    )
}

export const TestSharedPage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();

    return (
        <YjsDocumentProvider guid={workspaceId}>
            <YjsWebrtcProviderProvider>
                <YjsUndoManagerProvider>
                    <WorkspaceProvider>
                        <TestWorkspaceConnector workspaceId={workspaceId}>
                            <TestWorkspaceInitializer />
                        </TestWorkspaceConnector>
                        
                        <TestWorkspace />
                    </WorkspaceProvider>
                </YjsUndoManagerProvider>
            </YjsWebrtcProviderProvider>
        </YjsDocumentProvider>
    )
}