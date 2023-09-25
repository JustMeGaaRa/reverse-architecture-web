import { Box } from "@chakra-ui/react";
// TODO: consider making this component/feature less dependent on the workspace-viewer package
import { EmptyContent } from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";
import {
    WorkspaceCardView,
    WorkspaceProvider,
    WorkspaceTableView
} from ".";
import {
    WorkspaceGroupInfo,
    WorkspaceInfo
} from "../types";

export const WorkspaceList: FC<{
    groups: WorkspaceGroupInfo[];
    workspaces: WorkspaceInfo[];
    view: "card" | "table";
    emptyTitle?: string;
    emptyDescription?: string;
    onSelected?: (selected: WorkspaceGroupInfo[]) => void;
    onRemove?: (groups: WorkspaceGroupInfo[]) => void;
    onClick?: (workspace: WorkspaceInfo) => void;
    onGroupClick?: (group: WorkspaceGroupInfo) => void;
}> = ({
    groups,
    workspaces,
    view,
    emptyTitle,
    emptyDescription,
    onSelected,
    onRemove,
    onClick,
    onGroupClick
}) => {
    return (
        <Box>
            <WorkspaceProvider>
                {groups.length === 0 && workspaces.length === 0 && (
                    <EmptyContent
                        icon={Folder}
                        title={emptyTitle}
                        description={emptyDescription}
                    />
                )}
                {(groups.length > 0 || workspaces.length > 0) && view === "card" && (
                    <WorkspaceCardView
                        groups={groups}
                        workspaces={workspaces}
                        onClick={onClick}
                        onGroupClick={onGroupClick}
                        onGroupRemove={onRemove}
                    />
                )}
                {(groups.length > 0 || workspaces.length > 0) && view === "table" && (
                    <WorkspaceTableView
                        groups={groups}
                        onSelected={onSelected}
                        onRemove={onRemove}
                        onClick={onClick}
                    />
                )}
            </WorkspaceProvider>
        </Box>
    )
}