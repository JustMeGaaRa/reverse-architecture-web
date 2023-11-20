import { EmptyContent } from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";
import {
    WorkspaceCardView,
    WorkspaceTableView
} from "../components";
import {
    WorkspaceGroupInfo,
    WorkspaceInfo
} from "../types";

export const WorkspaceList: FC<{
    workspaces: WorkspaceInfo[];
    view: "card" | "table";
    emptyTitle?: string;
    emptyDescription?: string;
    emptyAction?: React.ReactElement;
    onClick?: (workspace: WorkspaceInfo | WorkspaceGroupInfo) => void;
    onSelected?: (workspaces: Array<number>) => void;
    onRemove?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> = ({
    workspaces,
    view,
    emptyTitle,
    emptyDescription,
    emptyAction,
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
                    action={emptyAction}
                />
            )}
            {workspaces.length > 0 && view === "card" && (
                <WorkspaceCardView
                    workspaces={workspaces}
                    onClick={onClick}
                    onSelected={onSelected}
                    onRemove={onRemove}
                />
            )}
            {workspaces.length > 0 && view === "table" && (
                <WorkspaceTableView
                    workspaces={workspaces}
                    onClick={onClick}
                    onSelected={onSelected}
                    onRemove={onRemove}
                />
            )}
        </>
    )
}