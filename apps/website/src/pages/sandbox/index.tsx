import { Box, useColorModeValue } from "@chakra-ui/react";
import { createYDoc } from "@reversearchitecture/utils";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
    ActivityPanel,
    ToolbarPanel,
    TemplateSelectorModal,
    WorkspacePanel,
    WorkspaceRenderer,
    WorkspaceRoomProvider
} from "../../containers";
import { templates } from "./Templates";
import { createRandomUser } from "../../utils/User";

export const Sandbox: FC = () => {
    const { workspaceId } = useParams();
    const [store, setStore] = useState(null);
    const [user, setUser] = useState(null);

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
            {store && user && (
                <WorkspaceRoomProvider {...store} user={user}>

                    <WorkspaceRenderer>
                        <WorkspacePanel />
                        <ActivityPanel />
                        <ToolbarPanel />
                    </WorkspaceRenderer>

                    <TemplateSelectorModal
                        templates={templates}
                    />
                    
                </WorkspaceRoomProvider>
            )}
        </Box>
    );
};
