import { useBreakpointValue } from "@chakra-ui/react";
import {
    ErrorBoundary,
    LoadingMessage,
    StateMessage,
    useLoaderState,
    useLocale,
} from "@reversearchitecture/ui";
import { EmojiSad, Folder } from "iconoir-react";
import { FC, useCallback, useEffect, useState } from "react";
import { LocaleKeys } from "../../localization";
import { useSnackbar } from "../../snackbar";
import { useWorkspaceExplorer, useWorkspaceSelection } from "../hooks";
import { WorkspaceApi, WorkspaceLoadFilters } from "../services";
import { TableColumnInfo, WorkspaceGroupInfo, WorkspaceInfo } from "../types";
import { groupWorkspaces } from "../utils";
import {
    WorkspaceActionsToolbar,
    WorkspaceActionsAutoHideWrapper,
    WorkspaceGrid,
    WorkspaceStackCard,
    WorkspaceCard,
    WorkspaceTable,
    WorkspaceTableRow,
} from "./";

export const WorkspaceExplorer: FC<{
    isActive?: boolean;
    filters?: WorkspaceLoadFilters,
    options?: {
        view: "card" | "table";
        group?: boolean;
    },
    onClick?: (selectedId: string) => void;
    onRename?: (selectedId: string, value: string) => void;
    onClone?: (selectedId: string) => void;
    onStack?: (selectedIds: string[]) => void;
    onUnstack?: (selectedIds: string[]) => void;
    onArchive?: (selectedId: string) => void;
    onRestore?: (selectedId: string) => void;
    onDelete?: (selectedId: string) => void;
}> = ({
    isActive,
    filters,
    options = {
        view: "card",
        group: false
    },
    onClick,
    onRename,
    onClone,
    onStack,
    onUnstack,
    onArchive,
    onRestore,
    onDelete,
}) => {
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });
    const { getLocalizedString } = useLocale();
    const { snackbar } = useSnackbar();
    
    const [ error, setError ] = useState<{ title: string, description: string } | undefined>();
    const { isLoading, onStartLoading, onStopLoading } = useLoaderState({ isLoading: true });
    const { workspaces, setWorkspaces } = useWorkspaceExplorer();
    const { clone, rename, stack, remove, archive, restore } = useWorkspaceExplorer();
    const { selectedIds, toggleSelected, clearSelected } = useWorkspaceSelection();
    
    const nameof = function<T>(name: keyof T) { return name; };
    const columns: TableColumnInfo[] = [
        { title: "Name", name: nameof<WorkspaceInfo>("name") },
        { title: "Created Date", name: nameof<WorkspaceInfo>("createdDate") },
        { title: "Created By", name: nameof<WorkspaceInfo>("createdBy") },
        { title: "Last Modified Date", name: nameof<WorkspaceInfo>("lastModifiedDate") },
        { title: "Last Modified By", name: nameof<WorkspaceInfo>("lastModifiedBy") },
    ];

    useEffect(() => {
        if (!isActive) return;

        const workspaceApi = new WorkspaceApi();
        const controller = new AbortController();

        clearSelected();
        onStartLoading();

        workspaceApi.getWorkspaces({ ...filters }, { controller })
            .then(workspaces => {
                onStopLoading();
                setWorkspaces(workspaces);
            })
            .catch(error => {
                onStopLoading();
                setError({
                    title: getLocalizedString(LocaleKeys.ERROR_LOADING_WORKSPACES_TITLE),
                    description: getLocalizedString(LocaleKeys.ERROR_LOADING_WORKSPACES_DESCRIPTION),
                })
                snackbar({
                    title: getLocalizedString(LocaleKeys.ERROR_LOADING_WORKSPACES_TITLE),
                    description: getLocalizedString(LocaleKeys.ERROR_LOADING_WORKSPACES_DESCRIPTION),
                    status: "error"
                })
            });
        
        return () => {
            controller.abort();
        }
    }, [filters, clearSelected, getLocalizedString, onStartLoading, onStopLoading, setWorkspaces, snackbar]);
    
    const groups = groupWorkspaces(workspaces);

    const handleOnSelectGroup = useCallback((group: WorkspaceGroupInfo) => {
        toggleSelected(group.name);
    }, [toggleSelected]);

    const handleOnOpenGroup = useCallback((group: WorkspaceGroupInfo) => {
        onClick?.(group.name);
    }, [onClick]);

    const handleOnRenameGroup = useCallback((group: WorkspaceGroupInfo, value: string) => {
        stack(group.workspaces, value);
        onStack?.(group.workspaces.map(workspace => workspace.workspaceId));
    }, [onStack, stack]);

    const handleOnCloneGroup = useCallback((group: WorkspaceGroupInfo) => {
        group.workspaces.forEach(workspace => {
            // TODO: clone both workspaces and group (with different ids)
            clone(workspace);
            onClone?.(workspace.workspaceId);
        });
    }, [onClone, clone]);

    const handleOnArhiveGroup = useCallback((group: WorkspaceGroupInfo) => {
        group.workspaces.forEach(workspace => {
            archive(workspace);
            onArchive?.(workspace.workspaceId);
        });
    }, [onArchive, archive]);

    const handleOnRestoreGroup = useCallback((group: WorkspaceGroupInfo) => {
        group.workspaces.forEach(workspace => {
            restore(workspace);
            onRestore?.(workspace.workspaceId);
        });
    }, [onRestore, restore]);

    const handleOnDeleteGroup = useCallback((group: WorkspaceGroupInfo) => {
        group.workspaces.forEach(workspace => {
            remove(workspace);
            onDelete?.(workspace.workspaceId);
        });
    }, [onDelete, remove]);

    const handleOnOpen = useCallback((workspace: WorkspaceInfo) => {
        onClick?.(workspace.workspaceId);
    }, [onClick]);

    const handleOnSelect = useCallback((workspace: WorkspaceInfo) => {
        toggleSelected(workspace.workspaceId);
    }, [toggleSelected]);

    const handleOnRename = useCallback((workspace: WorkspaceInfo, value: string) => {
        rename(workspace, value);
        onRename?.(workspace.workspaceId, value);
    }, [onRename, rename]);

    const handleOnClone = useCallback((workspace: WorkspaceInfo) => {
        clone(workspace);
        onClone?.(workspace.workspaceId);
    }, [onClone, clone]);

    const handleOnArhive = useCallback((workspace: WorkspaceInfo) => {
        archive(workspace);
        onArchive?.(workspace.workspaceId);
    }, [onArchive, archive]);

    const handleOnRestore = useCallback((workspace: WorkspaceInfo) => {
        restore(workspace);
        onRestore?.(workspace.workspaceId);
    }, [onRestore, restore]);

    const handleOnDelete = useCallback((workspace: WorkspaceInfo) => {
        remove(workspace);
        onDelete?.(workspace.workspaceId);
    }, [onDelete, remove]);

    return (
        <ErrorBoundary fallback={<StateMessage icon={EmojiSad} {...error} />}>
            {isLoading && (
                <LoadingMessage
                    title={getLocalizedString(LocaleKeys.LOADING_WORKSPCES_TITLE)}
                    description={getLocalizedString(LocaleKeys.LOADING_WORKSPACES_DESCRIPTION)}
                />
            )}
            {!isLoading && workspaces.length > 0 && options?.view !== "table" && (
                <WorkspaceGrid gridColumns={gridColumns}>
                    {options?.group && groups.map(group => (
                        <WorkspaceStackCard
                            key={group.name}
                            group={group}
                            isSelected={selectedIds.some(selectedId => selectedId === group.name)}
                            onOpen={handleOnOpenGroup}
                            onRename={handleOnRenameGroup}
                            onSelect={handleOnSelectGroup}
                            onClone={handleOnCloneGroup}
                            onArchive={handleOnArhiveGroup}
                            onRestore={handleOnRestoreGroup}
                            onDelete={handleOnDeleteGroup}
                        />
                    ))}
                    {options?.group && workspaces.filter(workspace => !workspace.group).map(workspace => (
                        <WorkspaceCard
                            key={workspace.workspaceId}
                            workspace={workspace}
                            isSelected={selectedIds.some(selectedId => selectedId === workspace.workspaceId)}
                            isArchived={workspace.status === "archived"}
                            onOpen={handleOnOpen}
                            onRename={handleOnRename}
                            onSelect={handleOnSelect}
                            onClone={handleOnClone}
                            onArchive={handleOnArhive}
                            onRestore={handleOnRestore}
                            onDelete={handleOnDelete}
                        />
                    ))}
                    {!options?.group && workspaces.map(workspace => (
                        <WorkspaceCard
                            key={workspace.workspaceId}
                            workspace={workspace}
                            isSelected={selectedIds.some(selectedId => selectedId === workspace.workspaceId)}
                            isArchived={workspace.status === "archived"}
                            onOpen={handleOnOpen}
                            onRename={handleOnRename}
                            onSelect={handleOnSelect}
                            onClone={handleOnClone}
                            onArchive={handleOnArhive}
                            onRestore={handleOnRestore}
                            onDelete={handleOnDelete}
                        />
                    ))}
                </WorkspaceGrid>
            )}
            {!isLoading && workspaces.length > 0 && options?.view === "table" && (
                <WorkspaceTable columns={columns}>
                    {options.group && groups.map(group => (
                        <WorkspaceTableRow
                            key={group.name}
                            columns={columns}
                            data={group}
                            isSelected={selectedIds.some(selectedId => selectedId === group.name)}
                            isGrouped={true}
                            onOpen={() => onClick?.(group.name)}
                            onSelect={() => toggleSelected?.(group.name)}
                            onClone={() => onClone?.(group.name)}
                            onArchive={() => onArchive?.(group.name)}
                            onRestore={() => onRestore?.(group.name)}
                            onDelete={() => onDelete?.(group.name)}
                        />
                    ))}
                    {options.group && workspaces.filter(workspace => !workspace.group).map(workspace => (
                        <WorkspaceTableRow
                            key={workspace.workspaceId}
                            columns={columns}
                            data={workspace}
                            isSelected={selectedIds.some(selectedId => selectedId === workspace.workspaceId)}
                            onOpen={() => onClick?.(workspace.workspaceId)}
                            onSelect={() => toggleSelected?.(workspace.workspaceId)}
                            onClone={() => onClone?.(workspace.workspaceId)}
                            onArchive={() => onArchive?.(workspace.workspaceId)}
                            onRestore={() => onRestore?.(workspace.workspaceId)}
                            onDelete={() => onDelete?.(workspace.workspaceId)}
                        />
                    ))}
                    {!options.group && workspaces.map(workspace => (
                        <WorkspaceTableRow
                            key={workspace.workspaceId}
                            columns={columns}
                            data={workspace}
                            isSelected={selectedIds.some(selectedId => selectedId === workspace.workspaceId)}
                            onOpen={() => onClick?.(workspace.workspaceId)}
                            onSelect={() => toggleSelected?.(workspace.workspaceId)}
                            onClone={() => onClone?.(workspace.workspaceId)}
                            onArchive={() => onArchive?.(workspace.workspaceId)}
                            onRestore={() => onRestore?.(workspace.workspaceId)}
                            onDelete={() => onDelete?.(workspace.workspaceId)}
                        />
                    ))}
                </WorkspaceTable>
            )}
            {!isLoading && workspaces.length === 0 && (
                <StateMessage
                    icon={Folder}
                    title={getLocalizedString(LocaleKeys.WORKSPACE_EXPLORER__NO_WORKSPACES__TITLE)}
                    description={getLocalizedString(LocaleKeys.NO_WORKSPACES_SUGGESTION)}
                />
            )}
            <WorkspaceActionsAutoHideWrapper>
                <WorkspaceActionsToolbar />
            </WorkspaceActionsAutoHideWrapper>
        </ErrorBoundary>
    )
}