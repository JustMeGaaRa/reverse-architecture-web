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
        <Box>
            {workspaces.length === 0 && (
                <EmptyContent
                    icon={Folder}
                    title={emptyTitle}
                    description={emptyDescription}
                />
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