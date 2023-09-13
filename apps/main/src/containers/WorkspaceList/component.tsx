import { Box, Flex } from "@chakra-ui/react";
import { EmptyContent } from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";
import { WorkspaceInfo } from "../../model";
import { WorkspaceCardView } from "..";

export const WorkspaceList: FC<{
    workspaces: WorkspaceInfo[];
    emptyTitle?: string;
    emptyDescription?: string;
    onClick?: (workspace: WorkspaceInfo) => void;
}> = ({
    workspaces,
    emptyTitle,
    emptyDescription,
    onClick
}) => {
    return (
        <Box height={"100%"}>
            {workspaces.length === 0 && (
                <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={"100%"}
                    width={"100%"}
                >
                    <EmptyContent
                        icon={Folder}
                        title={emptyTitle}
                        description={emptyDescription}
                    />
                </Flex>
            )}
            {workspaces.length > 0 && (
                <WorkspaceCardView
                    workspaces={workspaces}
                    onClick={onClick}
                />
            )}
        </Box>
    )
}