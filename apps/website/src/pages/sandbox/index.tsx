import { Box, useColorModeValue, useToast } from "@chakra-ui/react";
import { WorkspaceExplorer } from "@reversearchitecture/workspace-viewer";
import { WorkspaceToolbar } from "@reversearchitecture/workspace-toolbar";
import { WorkspaceZoom } from "@reversearchitecture/workspace-zoom";
import { WorkspaceBreadcrumb } from "@reversearchitecture/workspace-breadcrumb";
import { createYDoc } from "../../utils/User";
import { applyMetadata, IView, IWorkspaceMetadata, Workspace } from "@structurizr/dsl";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ActivityPanel, WorkspaceRoomProvider } from "../../containers";
import { createRandomUser } from "../../utils/User";

export const Sandbox: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ store, setStore ] = useState(null);
    const [ user, setUser ] = useState(null);
    
    const [ workspace, setWorkspace ] = useState(Workspace.Empty);
    const [ selectedView, setSelectedView ] = useState<IView>();

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

    return (
        <Box
            height={"100vh"}
            background={useColorModeValue("", "#1E1E1E")}
        >
            {store && user && workspace && (
                <WorkspaceRoomProvider {...store} user={user}>
                    <WorkspaceExplorer
                        workspace={workspace}
                        selectedView={selectedView}
                    >
                        <WorkspaceBreadcrumb />
                        <WorkspaceToolbar />
                        <WorkspaceZoom />
                        <ActivityPanel />
                    </WorkspaceExplorer>
                </WorkspaceRoomProvider>
            )}
        </Box>
    );
};
