import {
    ErrorBoundary,
    ErrorMessage,
    NoContentBoundary,
    NoContentMessage,
} from "@reversearchitecture/ui";
import { FC } from "react";
import { WorkspaceInfo } from "../types";
import {
    WorkspaceCardView,
    WorkspaceOptionsToolbar,
    WorkspaceTableView,
    WorkspaceOptionsAutoHideWrapper
} from "./";

export const WorkspaceExplorer: FC<{
    workspaces: WorkspaceInfo[];
    options?: {
        view: "card" | "table";
        group?: boolean;
    },
    empty?: {
        title?: string;
        description?: string;
        action?: React.ReactElement;
    },
    error?: {
        title?: string;
        description?: string;
        action?: React.ReactElement;
    }
    onClick?: (selectedId: string) => void;
    onRename?: (selectedId: string, value: string) => void;
    onClone?: (selectedId: string) => void;
    onArchive?: (selectedId: string) => void;
    onRestore?: (selectedId: string) => void;
    onDelete?: (selectedId: string) => void;
}> = ({
    workspaces,
    options = {
        view: "card",
        group: false
    },
    empty,
    error,
    onClick,
    onRename,
    onClone,
    onArchive,
    onRestore,
    onDelete,
}) => {
    // TODO: use provider to manage state internally based on passed props
    return (
        <ErrorBoundary
            fallback={(
                <ErrorMessage
                    errorTitle={error?.title}
                    errorDescription={error?.description}
                    action={error?.action}
                />
            )}
        >
            <NoContentBoundary
                condition={workspaces.length === 0}
                fallback={(
                    <NoContentMessage
                        actionTitle={empty?.title}
                        actionDescription={empty?.description}
                        action={empty?.action}
                    />
                )}
            >
                {options?.view !== "table" && (
                    <WorkspaceCardView
                        workspaces={workspaces}
                        groupped={options?.group}
                        onOpen={onClick}
                        onRename={onRename}
                        onClone={onClone}
                        onArchive={onArchive}
                        onRestore={onRestore}
                        onDelete={onDelete}
                    />
                )}
                {options?.view === "table" && (
                    <WorkspaceTableView
                        workspaces={workspaces}
                        groupped={options.group}
                        onOpen={onClick}
                        onRename={onRename}
                        onClone={onClone}
                        onArchive={onArchive}
                        onRestore={onRestore}
                        onDelete={onDelete}
                    />
                )}
                <WorkspaceOptionsAutoHideWrapper>
                    <WorkspaceOptionsToolbar />
                </WorkspaceOptionsAutoHideWrapper>
            </NoContentBoundary>
        </ErrorBoundary>
    )
}