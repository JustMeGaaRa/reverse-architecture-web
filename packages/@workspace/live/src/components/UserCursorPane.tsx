import { Box } from "@chakra-ui/react";
import { useReactFlow } from "@reactflow/core";
import {
    getAbsolutePoint,
    WorkspaceElementPortal,
    WorkspaceUser,
    WorkspaceViewportRelativerWrapper
} from "@workspace/core";
import { FC } from "react";
import { CollaboratingUser } from "../components";

export const UserCursorPane: FC<{ users: Array<WorkspaceUser> }> = ({ users }) => {
    const { getViewport } = useReactFlow();
    const viewport = getViewport();
    
    return (
        <WorkspaceElementPortal>
            <Box
                className={"workspace__user-group"}
                position={"absolute"}
                pointerEvents={"none"}
                top={0}
                left={0}
                height={"100%"}
                width={"100%"}
            >
                {users.filter(user => user?.location?.mouse).map(user => (
                    <WorkspaceViewportRelativerWrapper
                        key={user.info.username}
                        position={getAbsolutePoint(viewport, user.location.mouse)}
                    >
                        <CollaboratingUser
                            colorScheme={user.info.color}
                            name={user.info.fullname}
                        />
                    </WorkspaceViewportRelativerWrapper>
                ))}
            </Box>
        </WorkspaceElementPortal>
    )
}