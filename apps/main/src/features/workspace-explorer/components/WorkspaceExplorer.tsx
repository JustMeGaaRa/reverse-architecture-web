import { useBreakpointValue } from "@chakra-ui/react";
import { useLocale } from "@restruct/ui";
import { WorkspaceInfo } from "@structurizr/y-workspace";
import { useYjsCollaborative } from "@yjs/react";
import { EmojiSad, Folder } from "iconoir-react";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoaderState } from "../../../features";
import { useAccount } from "../../authentication";
import { ErrorBoundary } from "../../error-boundary";
import { LocaleKeys } from "../../localization";
import { useSnackbar } from "../../snackbar";
import { useWorkspaceExplorer, useWorkspaceSelection } from "../hooks";
import { WorkspaceLoadFilters } from "../services";
import { TableColumnInfo, IWorkspaceGroupInfo } from "../types";
import {
    createExplorerDocument,
    createExplorerPersistance,
    getWorkspaces,
    groupWorkspaces,
    withTimeout
} from "../utils";
import {
    WorkspaceActionsAutoHideWrapper,
    WorkspaceGrid,
    WorkspaceStackCard,
    WorkspaceCard,
    WorkspaceTable,
    WorkspaceTableRow,
    StateMessage,
    LoadingMessage,
    WorkspaceExplorerActionsToolbar,
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
    const navigate = useNavigate();
    const [ queryParams, setQueryParam ] = useSearchParams();
    const { getLocalizedString } = useLocale();
    const { account } = useAccount();
    const { snackbar } = useSnackbar();
    
    const { clone, remove, removeMultiple, rename, stack, archive, restore } = useWorkspaceExplorer();
    const { selectedIds, toggleSelected } = useWorkspaceSelection();
    const [ error, setError ] = useState<{ title: string, description: string }>();
    
    const nameof = function<T>(name: keyof T) { return name; };
    const columns: TableColumnInfo[] = [
        { title: "Name", name: nameof<WorkspaceInfo>("name") },
        { title: "Status", name: nameof<WorkspaceInfo>("status") },
        { title: "Created By", name: nameof<WorkspaceInfo>("createdBy") },
        { title: "Last Modified Date", name: nameof<WorkspaceInfo>("lastModifiedDate") },
        { title: "Last Modified By", name: nameof<WorkspaceInfo>("lastModifiedBy") },
    ];
    
    const { workspaces, setWorkspaces } = useWorkspaceExplorer();
    const { document, setDocument, setPersistance } = useYjsCollaborative();
    const [ isLoading, onStartLoading, onStopLoading ] = useLoaderState({ isLoading: true });

    useEffect(() => {
        if (!isActive) return;

        onStartLoading();
        const [document] = createExplorerDocument();
        const [persitance] = createExplorerPersistance(document);

        withTimeout(persitance.whenSynced, 500).then(_ => {
            const workspaces = getWorkspaces(document)
                .map(x => x.toSnapshot())
                .filter(x =>{
                    const isGroupMatch = filters?.group === undefined || x.group === filters.group;
                    const isStatusMatch = filters?.status === undefined || x.status === filters.status;
                    return isGroupMatch && isStatusMatch;
                })
            setDocument(document);
            setPersistance(persitance);
            setWorkspaces(workspaces);
            onStopLoading();
        });

        return () => {
            persitance.destroy();
            setDocument(undefined);
            setPersistance(undefined);
        }
    }, [isActive, onStartLoading, onStopLoading, setDocument, setPersistance, setWorkspaces]);

    const groups = groupWorkspaces(workspaces);

    const handleOnSelectGroup = useCallback((group: IWorkspaceGroupInfo) => {
        toggleSelected(group.name);
    }, [toggleSelected]);

    const handleOnOpenGroup = useCallback((group: IWorkspaceGroupInfo) => {
        setQueryParam(params => {
            params.set("group", group.name);
            return new URLSearchParams(params);
        });
        onClick?.(group.name);
    }, [onClick, setQueryParam]);

    const handleOnRenameGroup = useCallback((group: IWorkspaceGroupInfo, value: string) => {
        stack(group.workspaces, value);
        onStack?.(group.workspaces.map(workspace => workspace.workspaceId));
    }, [onStack, stack]);

    const handleOnCloneGroup = useCallback((group: IWorkspaceGroupInfo) => {
        group.workspaces.forEach(workspace => {
            // TODO: clone both workspaces and group (with different ids)
            clone(account.username, workspace.workspaceId, {
                onSuccess: (workspaceId) => {
                    onClone?.(workspaceId);
                },
                onError: (error) => {
                    snackbar({
                        title: "An error occurred when deleting the workspace",
                        description: error.message,
                        status: "error",
                        duration: 9000
                    });
                }
            });
        });
    }, [account.username, clone, onClone, snackbar]);

    const handleOnArhiveGroup = useCallback((group: IWorkspaceGroupInfo) => {
        group.workspaces.forEach(workspace => {
            archive(workspace);
            onArchive?.(workspace.workspaceId);
        });
    }, [onArchive, archive]);

    const handleOnRestoreGroup = useCallback((group: IWorkspaceGroupInfo) => {
        group.workspaces.forEach(workspace => {
            restore(workspace);
            onRestore?.(workspace.workspaceId);
        });
    }, [onRestore, restore]);

    const handleOnDeleteGroup = useCallback((group: IWorkspaceGroupInfo) => {
        removeMultiple(group.workspaces, {
            onSuccess: (workspaceId) => {
                onDelete?.(workspaceId);
            },
            onError: (error) => {
                snackbar({
                    title: "An error occurred when deleting the workspace",
                    description: error.message,
                    status: "error",
                    duration: 9000
                });
            }
        })
    }, [onDelete, removeMultiple, snackbar]);

    const handleOnOpen = useCallback((workspace: WorkspaceInfo) => {
        navigate(`/workspaces/${workspace.workspaceId}`);
        onClick?.(workspace.workspaceId);
    }, [navigate, onClick]);

    const handleOnSelect = useCallback((workspace: WorkspaceInfo) => {
        toggleSelected(workspace.workspaceId);
    }, [toggleSelected]);

    const handleOnRename = useCallback((workspace: WorkspaceInfo, value: string) => {
        rename(workspace.workspaceId, value);
        onRename?.(workspace.workspaceId, value);
    }, [onRename, rename]);

    const handleOnClone = useCallback((workspace: WorkspaceInfo) => {
        clone(account.username, workspace.workspaceId, {
            onSuccess: (workspaceId) => {
                onClone?.(workspaceId);
            },
            onError: (error) => {
                snackbar({
                    title: "An error occurred when deleting the workspace",
                    description: error.message,
                    status: "error",
                    duration: 9000
                });
            }
        });
    }, [account.username, clone, onClone, snackbar]);

    const handleOnArhive = useCallback((workspace: WorkspaceInfo) => {
        archive(workspace);
        onArchive?.(workspace.workspaceId);
    }, [onArchive, archive]);

    const handleOnRestore = useCallback((workspace: WorkspaceInfo) => {
        restore(workspace);
        onRestore?.(workspace.workspaceId);
    }, [onRestore, restore]);

    const handleOnDelete = useCallback((workspace: WorkspaceInfo) => {
        remove(workspace, {
            onSuccess: (workspaceId) => {
                onDelete?.(workspaceId);
            },
            onError: (error) => {
                snackbar({
                    title: "An error occurred when deleting the workspace",
                    description: error.message,
                    status: "error",
                    duration: 9000
                });
            }
        })
    }, [onDelete, remove, snackbar]);

    return (
        <ErrorBoundary fallback={<StateMessage icon={EmojiSad} {...error} />}>
            {isLoading && (
                <LoadingMessage
                    title={getLocalizedString(LocaleKeys.LOADING_WORKSPCES_TITLE)}
                    description={getLocalizedString(LocaleKeys.LOADING_WORKSPACES_DESCRIPTION)}
                />
            )}
            {!isLoading && workspaces.length === 0 && (
                <StateMessage
                    icon={Folder}
                    title={getLocalizedString(LocaleKeys.WORKSPACE_EXPLORER__NO_WORKSPACES__TITLE)}
                    description={getLocalizedString(LocaleKeys.NO_WORKSPACES_SUGGESTION)}
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
            <WorkspaceActionsAutoHideWrapper>
                <WorkspaceExplorerActionsToolbar />
            </WorkspaceActionsAutoHideWrapper>
        </ErrorBoundary>
    )
}