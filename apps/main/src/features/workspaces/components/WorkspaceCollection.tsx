import { EmptyContent } from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";
import {
    WorkspaceCollectionProvider,
    WorkspaceCardView,
    WorkspaceOptionsToolbar,
    WorkspaceTableView,
    WorkspaceOptionsAutoHideWrapper
} from "../components";
import {
    WorkspaceGroupInfo,
    WorkspaceInfo
} from "../types";

export const WorkspaceCollection: FC<{
    workspaces: WorkspaceInfo[];
    view: "card" | "table";
    groupped?: boolean,
    emptyTitle?: string;
    emptyDescription?: string;
    emptyAction?: React.ReactElement;
    onClick?: (workspace: WorkspaceInfo | WorkspaceGroupInfo) => void;
    onStack?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
    onDelete?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> = ({
    workspaces,
    view,
    groupped,
    emptyTitle,
    emptyDescription,
    emptyAction,
    onClick,
    onStack,
    onDelete,
}) => {
    // TODO: actions with workspace collection: add, remove, select, click, stack, unstack, clone, export, import
    // TODO: actions with single workspace: update (rename, thumbnail), click, clone, export
    return (
        <WorkspaceCollectionProvider>
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
                    groupped={groupped}
                    onOpen={onClick}
                    onDelete={onDelete}
                />
            )}
            {workspaces.length > 0 && view === "table" && (
                <WorkspaceTableView
                    workspaces={workspaces}
                    groupped={groupped}
                    onOpen={onClick}
                    onDelete={onDelete}
                />
            )}
            <WorkspaceOptionsAutoHideWrapper>
                <WorkspaceOptionsToolbar
                    onStack={onStack}
                    onRemove={onDelete}
                />
            </WorkspaceOptionsAutoHideWrapper>
        </WorkspaceCollectionProvider>
    )
}