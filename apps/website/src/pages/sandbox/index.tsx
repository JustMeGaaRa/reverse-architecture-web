import { Box, useColorModeValue } from "@chakra-ui/react";
import { Panel } from "@reactflow/core";
import {
    useWorkspaceStore,
    WorkspaceExplorer
} from "@reversearchitecture/workspace-viewer";
import { WorkspaceToolbar } from "@reversearchitecture/workspace-toolbar";
import { WorkspaceZoom } from "@reversearchitecture/workspace-zoom";
import { WorkspaceBreadcrumb } from "@reversearchitecture/workspace-breadcrumb";
import { WorkspaceApi } from "@reversearchitecture/services";
import { createYDoc } from "@reversearchitecture/utils";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ActivityPanel, WorkspaceRoomProvider } from "../../containers";
import { createRandomUser } from "../../utils/User";

export const Sandbox: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [store, setStore] = useState(null);
    const [user, setUser] = useState(null);
    const {
        workspace,
        selectedView,
        viewPath,
        setWorkspace,
        setSelectedView
    } = useWorkspaceStore();

    useEffect(() => {
        const store = createYDoc({ documentId: workspaceId });
        const user = createRandomUser();

        setStore(store);
        setUser(user);

        return () => {
            store.document.destroy();
            store.provider.disconnect();
            store.provider.destroy();
        }
    }, [workspaceId]);

    useEffect(() => {
        const api = new WorkspaceApi();
        api.getWorkspace(workspaceId)
            .then(workspace => {
                const initialView = workspace.views.systemLandscape
                    ?? workspace.views.systemContexts[0];
                setWorkspace(workspace);
                setSelectedView(initialView);
            })
            .catch(error => {
                console.error(error);
            });
    }, [workspaceId, setSelectedView, setWorkspace]);

    return (
        <Box
            height={"100vh"}
            background={useColorModeValue("", "#1E1E1E")}
        >
            {store && user && workspace && (
                <WorkspaceRoomProvider {...store} user={user}>
                    <WorkspaceExplorer
                        workspace={workspace}
                        initialView={selectedView}
                    >
                        <Panel position={"top-left"}>
                            <WorkspaceBreadcrumb path={viewPath.path} />
                        </Panel>
                        <Panel position={"bottom-center"}>
                            <WorkspaceToolbar />
                        </Panel>
                        <Panel position={"bottom-right"}>
                            <WorkspaceZoom />
                        </Panel>
                        <Panel position={"top-right"}>
                            <ActivityPanel />
                        </Panel>
                    </WorkspaceExplorer>
                </WorkspaceRoomProvider>
            )}
        </Box>
    );
};
