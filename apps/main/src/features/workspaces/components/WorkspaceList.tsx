// TODO: consider making this component/feature less dependent on the workspace-viewer package
import { EmptyContent } from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";
import {
    WorkspaceCardView,
    WorkspaceTableView
} from ".";
import {
    WorkspaceGroupInfo,
    WorkspaceInfo
} from "../types";

export const WorkspaceList: FC<{
    workspaces: WorkspaceInfo[];
    view: "card" | "table";
    isGrouped?: boolean;
    emptyTitle?: string;
    emptyDescription?: string;
    onClick?: (workspace: WorkspaceInfo | WorkspaceGroupInfo) => void;
    onSelected?: (workspaces: Array<number>) => void;
    onRemove?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> = ({
    workspaces,
    view,
    isGrouped,
    emptyTitle,
    emptyDescription,
    onClick,
    onSelected,
    onRemove,
}) => {
    return (
        <>
            {workspaces.length === 0 && (
                <EmptyContent
                    icon={Folder}
                    title={emptyTitle}
                    description={emptyDescription}
                />
            )}
            {workspaces.length > 0 && view === "card" && (
                <WorkspaceCardView
                    workspaces={workspaces}
                    isGrouped={isGrouped}
                    onClick={onClick}
                    onSelected={onSelected}
                    onRemove={onRemove}
                />
            )}
            {workspaces.length > 0 && view === "table" && (
                <WorkspaceTableView
                    workspaces={workspaces}
                    isGrouped={isGrouped}
                    onClick={onClick}
                    onSelected={onSelected}
                    onRemove={onRemove}
                />
            )}
        </>
    )
}