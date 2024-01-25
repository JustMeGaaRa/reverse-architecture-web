import {
    ErrorBoundary,
    ErrorMessage,
    NoContentBoundary,
    NoContentMessage,
    useLocale
} from "@reversearchitecture/ui";
import { FC, useCallback } from "react";
import { LocaleKeys } from "../../localization";
import {
    WorkspaceCardView,
    WorkspaceOptionsToolbar,
    WorkspaceTableView,
    WorkspaceOptionsAutoHideWrapper
} from "../components";
import { useWorkspaceCollection } from "../hooks";
import { WorkspaceInfo } from "../types";

function createResource<T>(promise: Promise<T>) {
    let status = "pending";
    let result: T;

    let suspender = promise.then(
        (result) => {
            status = "success";
            result = result;
        },
        (error) => {
            status = "error";
            result = error;
        }
    );

    const handler = {
        read() {
            switch (status) {
                case "pending":
                    throw suspender;
                case "error":
                    throw result;
                default:
                    return result;
            }
        }
    };
  
    return handler;
}

export const WorkspaceCollection: FC<{
    workspaces: WorkspaceInfo[];
    view: "card" | "table";
    groupped?: boolean,
    emptyTitle?: string;
    emptyDescription?: string;
    emptyAction?: React.ReactElement;
    onClick?: (selectedId: string) => void;
    onStack?: (selectedIds: string[]) => void;
    onDelete?: (selectedIds: string[]) => void;
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
    const { getLocalizedString } = useLocale();
    const { remove, stack, unstack, archive, restore } = useWorkspaceCollection();

    const handleOnDeleteSingle = useCallback((selectedId: string) => {
        const selected = workspaces.find(workspace => {
            return workspace.workspaceId === selectedId
                || workspace.group === selectedId;
        });
        remove(selected);
    }, [remove, workspaces]);

    const handleOnDeleteMultiple = useCallback((selectedIds: string[]) => {
        const selected = workspaces.filter(workspace => {
            return selectedIds.some(selectedId => {
                return workspace.workspaceId === selectedId
                    || workspace.group === selectedId;
            })
        });
        selected.forEach(workspace => remove(workspace));
    }, [remove, workspaces]);

    const handleOnStack = useCallback((selectedIds: string[]) => {
        const selected = workspaces.filter(workspace => {
            return selectedIds.some(selectedId => {
                return workspace.workspaceId === selectedId
                    || workspace.group === selectedId;
            })
        });
        const existingName = selected.find(element => element.group !== undefined)?.group ?? "New Stack";
        const groupName = `${existingName} (1)`;
        stack(selected, groupName);
    }, [stack, workspaces]);

    const handleOnUnstack = useCallback((selectedIds: string[]) => {
        const selected = workspaces.filter(workspace => {
            return selectedIds.some(selectedId => {
                return workspace.workspaceId === selectedId
                    || workspace.group === selectedId;
            })
        });
        unstack(selected);
    }, [unstack, workspaces]);

    const handleOnArhive = useCallback((selectedIds: string[]) => {
        const selected = workspaces.filter(workspace => {
            return selectedIds.some(selectedId => {
                return workspace.workspaceId === selectedId
                    || workspace.group === selectedId;
            })
        });
        selected.forEach(workspace => archive(workspace));
    }, [archive, workspaces]);

    const handleOnRestore = useCallback((selectedIds: string[]) => {
        const selected = workspaces.filter(workspace => {
            return selectedIds.some(selectedId => {
                return workspace.workspaceId === selectedId
                    || workspace.group === selectedId;
            })
        });
        selected.forEach(workspace => restore(workspace));
    }, [restore, workspaces]);

    return (
        <ErrorBoundary
            fallback={(
                <ErrorMessage
                    errorDescription={getLocalizedString(LocaleKeys.ERROR_LOADING_WORKSPACES)}
                />
            )}
        >
            <NoContentBoundary
                condition={workspaces.length === 0}
                fallback={(
                    <NoContentMessage
                        actionDescription={emptyDescription}
                        action={emptyAction}
                    />
                )}
            >
                {view === "card" && (
                    <WorkspaceCardView
                        workspaces={workspaces}
                        groupped={groupped}
                        onOpen={onClick}
                        onDelete={handleOnDeleteSingle}
                    />
                )}
                {view === "table" && (
                    <WorkspaceTableView
                        workspaces={workspaces}
                        groupped={groupped}
                        onOpen={onClick}
                        onDelete={handleOnDeleteSingle}
                    />
                )}
                <WorkspaceOptionsAutoHideWrapper>
                    <WorkspaceOptionsToolbar
                        onStack={handleOnStack}
                        onUnstack={handleOnUnstack}
                        onArchive={handleOnArhive}
                        onRestore={handleOnRestore}
                        onRemove={handleOnDeleteMultiple}
                    />
                </WorkspaceOptionsAutoHideWrapper>
            </NoContentBoundary>
        </ErrorBoundary>
    )
}