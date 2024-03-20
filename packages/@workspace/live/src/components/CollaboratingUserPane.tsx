import { Box } from "@chakra-ui/react";
import { WorkspaceElementPortal } from "@workspace/diagramming";
import { FC } from "react";
import { WorkspaceUser } from "../types";
import { CollaboratingUser } from "./CollaboratingUser";

export const CollaboratingUserPane: FC<{ users: Array<WorkspaceUser> }> = ({ users }) => {
    return (
        <WorkspaceElementPortal>
            <Box
                className={"workspace__collaborating-users-pane"}
                position={"absolute"}
                pointerEvents={"none"}
                top={0}
                left={0}
                height={"100%"}
                width={"100%"}
            >
                {users.filter(user => user?.mouse).map(user => (
                    <CollaboratingUser key={user.info.username} user={user} />
                ))}
            </Box>
        </WorkspaceElementPortal>
    )
}