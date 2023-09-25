import { Box } from "@chakra-ui/react";
// TODO: consider making this component/feature less dependent on the workspace-viewer package
import { EmptyContent } from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";
import { CommunityCardView } from "../components";
import { WorkspaceInfo } from "../types";

export const CommunityTemplateList: FC<{
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
                <CommunityCardView
                    workspaces={workspaces}
                    onClick={onClick}
                />
            )}
        </Box>
    )
}