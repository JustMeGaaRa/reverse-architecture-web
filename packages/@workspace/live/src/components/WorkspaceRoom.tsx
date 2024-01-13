import { Workspace } from "@structurizr/dsl";
import { useWorkspace, WorkspaceProvider, WorkspaceUser } from "@workspace/core";
import { FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { WorkspaceRoomContext } from "../contexts";
import { PresentationOptions } from "../types";
import { useWorkspaceRoom } from "../hooks";

export const workspaceDocument = new Y.Doc();

export const WorkspaceRoom: FC<PropsWithChildren<{
    workspace?: Workspace;
    options?: {
        roomId: string;
        password?: string;
    }
}>> = ({
    children,
    workspace,
    options
}) => {
    const [ connectionProvider, setConnectionProvider ] = useState<WebrtcProvider>();
    const [ currentUser, setCurrentUser ] = useState<WorkspaceUser>({
        info: {
            username: "jonathan.joestar",
            fullname: "Jonathan Joestar",
            color: "green",
        }
    });
    const [ collaboratingUsers, setCollaboratingUsers ] = useState<Array<WorkspaceUser>>([]);
    const [ presentation, setPresentationOptions ] = useState<PresentationOptions>({
        presentationEnabled: false,
        presenterInfo: undefined,
    });

    useEffect(() => {
        let webRtcProvider: WebrtcProvider = new WebrtcProvider(
            `restruct-room__${options.roomId}`,
            workspaceDocument,
            {
                signaling: [
                    "wss://restruct-webrtc-signaling-7452bb784b0b.herokuapp.com"
                ],
            }
        );

        const onAwarenessChange = () => {
            const collaboratingUsers = Array
                .from(webRtcProvider.awareness.getStates() ?? [])
                .filter(([key, ]) => key !== webRtcProvider.awareness.clientID)
                .map(([, value]) => value as WorkspaceUser)
                .filter(user => user !== null && user !== undefined)
            
            setCollaboratingUsers(collaboratingUsers);
        }

        webRtcProvider.awareness?.on("change", onAwarenessChange);
        webRtcProvider.awareness?.on("update", onAwarenessChange);
        
        setConnectionProvider(webRtcProvider);

        return () => {
            webRtcProvider.awareness?.off("change", onAwarenessChange);
            webRtcProvider.awareness?.off("update", onAwarenessChange);
            webRtcProvider?.disconnect();
            webRtcProvider?.destroy();
        }
    }, [options.roomId]);

    return (
        <WorkspaceRoomContext.Provider
            value={{
                workspaceDocument,
                connectionProvider,
                currentUser,
                collaboratingUsers,
                presentation,
                setCurrentUser,
                setPresentationOptions
            }}
        >
            <WorkspaceRemoteObserver
                initialWorkspace={workspace ?? Workspace.Empty}
            >
                {children}
            </WorkspaceRemoteObserver>
        </WorkspaceRoomContext.Provider>
    )
}

export const WorkspaceRemoteObserver: FC<PropsWithChildren<{
    initialWorkspace?: Workspace;
}>> = ({
    children,
    initialWorkspace
}) => {
    const [ workspace, setWorkspace ] = useState<Workspace>(Workspace.Empty);
    const { workspaceDocument } = useWorkspaceRoom();

    useEffect(() => {
        setWorkspace(initialWorkspace ?? Workspace.Empty);
    }, [initialWorkspace]);

    useEffect(() => {
        const onWorkspaceSyncLocal = () => {
            const workspaceJson = workspaceMap.get("workspace") as string;
            const structurizrText = workspaceMap.get("structurizr") as string;

            setWorkspace(new Workspace(JSON.parse(workspaceJson)));
            // setStructurizrText(structurizrText);
            console.log(workspaceJson)
            console.log(structurizrText);
        }

        const workspaceMap = workspaceDocument.getMap("workspace");
        workspaceMap.observe(onWorkspaceSyncLocal);

        return () => {
            workspaceMap.unobserve(onWorkspaceSyncLocal);
        }
    }, [setWorkspace, workspaceDocument]);

    const onWorkspaceSyncRemote = useCallback((workspace: Workspace) => {
        const workspaceMap = workspaceDocument.getMap("workspace");
        workspaceMap.set("workspace", JSON.stringify(workspace.toObject()));
        
        setWorkspace(workspace);
    }, [setWorkspace, workspaceDocument]);

    return (
        <WorkspaceProvider
            workspace={workspace}
            onChange={onWorkspaceSyncRemote}
        >
            {children}
        </WorkspaceProvider>
    );
}