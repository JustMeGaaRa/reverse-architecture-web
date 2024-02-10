import { Box, Icon, IconButton, ScaleFade, Text } from "@chakra-ui/react";
import { Toolbar, ToolbarSection } from "workspace";
import { AppleShortcuts, BinMinusIn, Xmark, Copy } from "iconoir-react";
import { FC, PropsWithChildren, useCallback } from "react";
import { useWorkspaceSelection, useWorkspaceCollectionOptions, useWorkspaceCollection } from "../hooks";

export const WorkspaceOptionsToolbar: FC<{
    onClone?: (selectedIds: string[]) => void;
    onStack?: (selectedIds: string[]) => void;
    onUnstack?: (selectedIds: string[]) => void;
    onArchive?: (selectedIds: string[]) => void;
    onRestore?: (selectedIds: string[]) => void;
    onRemove?: (selectedIds: string[]) => void;
}> =({
    onClone,
    onStack,
    onUnstack,
    onArchive,
    onRestore,
    onRemove
}) => {
    const { workspaces, clone, remove, stack, unstack, archive, restore } = useWorkspaceCollection();
    const { selectedIds, clearSelected } = useWorkspaceSelection();
    const options = useWorkspaceCollectionOptions();

    const handleOnCancelSelection = useCallback(() => {
        clearSelected();
    }, [clearSelected]);

    const handleOnClone = useCallback(() => {
        const selected = workspaces.filter(workspace => {
            return selectedIds.some(selectedId => {
                return workspace.workspaceId === selectedId
                    || workspace.group === selectedId;
            })
        });
        selected.forEach(workspace => clone(workspace));
    }, [clone, selectedIds, workspaces]);

    const handleOnStack = useCallback(() => {
        const selected = workspaces.filter(workspace => {
            return selectedIds.some(selectedId => {
                return workspace.workspaceId === selectedId
                    || workspace.group === selectedId;
            })
        });
        const existingName = selected.find(element => element.group !== undefined)?.group ?? "New Stack";
        const groupName = `${existingName} (1)`;
        stack(selected, groupName);
    }, [selectedIds, stack, workspaces]);

    const handleOnUnstack = useCallback(() => {
        const selected = workspaces.filter(workspace => {
            return selectedIds.some(selectedId => {
                return workspace.workspaceId === selectedId
                    || workspace.group === selectedId;
            })
        });
        unstack(selected);
    }, [selectedIds, unstack, workspaces]);

    const handleOnArhive = useCallback(() => {
        const selected = workspaces.filter(workspace => {
            return selectedIds.some(selectedId => {
                return workspace.workspaceId === selectedId
                    || workspace.group === selectedId;
            })
        });
        selected.forEach(workspace => archive(workspace));
    }, [archive, selectedIds, workspaces]);

    const handleOnRestore = useCallback(() => {
        const selected = workspaces.filter(workspace => {
            return selectedIds.some(selectedId => {
                return workspace.workspaceId === selectedId
                    || workspace.group === selectedId;
            })
        });
        selected.forEach(workspace => restore(workspace));
    }, [restore, selectedIds, workspaces]);

    const handleOnDelete = useCallback(() => {
        const selected = workspaces.filter(workspace => {
            return selectedIds.some(selectedId => {
                return workspace.workspaceId === selectedId
                    || workspace.group === selectedId;
            })
        });
        selected.forEach(workspace => remove(workspace));
    }, [remove, selectedIds, workspaces]);

    return (
        <Toolbar>
            <ToolbarSection>
                <IconButton
                    aria-label={"close"}
                    icon={<Icon as={Xmark} boxSize={5} />}
                    title={"close"}
                    variant={"tonal"}
                    onClick={handleOnCancelSelection}
                />
                <Text paddingX={2} color={"gray.900"} textStyle={"b3"}>
                    {`${selectedIds.length} selected`}
                </Text>
            </ToolbarSection>
            <ToolbarSection>
                {options.stack.isVisible && (
                    <IconButton
                        aria-label={"stack workspaces together"}
                        icon={<Icon as={AppleShortcuts} boxSize={5} />}
                        isDisabled={!options.stack.isEnabled}
                        title={"stack workspaces together"}
                        onClick={handleOnStack}
                    />
                )}
                {options.unstack.isVisible && (
                    <IconButton
                        aria-label={"unstack workspaces together"}
                        icon={<Icon as={AppleShortcuts} boxSize={5} />}
                        isDisabled={!options.unstack.isEnabled}
                        title={"unstack workspaces apart"}
                        onClick={handleOnUnstack}
                    />
                )}
                {options.clone.isVisible && (
                    <IconButton
                        aria-label={"clone workspace"}
                        icon={<Icon as={Copy} boxSize={5} />}
                        isDisabled={!options.clone.isEnabled}
                        title={"clone workspace"}
                        onClick={handleOnClone}
                    />
                )}
                {options.archive.isVisible && (
                    <IconButton
                        aria-label={"archive workspaces"}
                        icon={<Icon as={BinMinusIn} boxSize={5} />}
                        isDisabled={!options.archive.isEnabled}
                        title={"archive workspaces"}
                        onClick={handleOnArhive}
                    />
                )}
                {options.unarchive.isVisible && (
                    <IconButton
                        aria-label={"unarchive workspaces"}
                        icon={<Icon as={BinMinusIn} boxSize={5} />}
                        isDisabled={!options.unarchive.isEnabled}
                        title={"unarchive workspaces"}
                        onClick={handleOnRestore}
                    />
                )}
                {options.remove.isVisible && (
                    <IconButton
                        aria-label={"delete workspaces"}
                        icon={<Icon as={BinMinusIn} boxSize={5} />}
                        isDisabled={!options.remove.isEnabled}
                        title={"delete workspaces"}
                        onClick={handleOnDelete}
                    />
                )}
            </ToolbarSection>
        </Toolbar>
    )
}

export const WorkspaceOptionsAutoHideWrapper: FC<PropsWithChildren> = ({ children }) => {
    const { selectedIds: selected } = useWorkspaceSelection();

    return (
        <Box
            position={"absolute"}
            bottom={4}
            left={"50%"}
            transform={"translateX(-50%)"}
            pointerEvents={selected?.length > 0 ? "auto" : "none"}
        >
            <ScaleFade in={selected?.length > 0}>
                {children}
            </ScaleFade>
        </Box>
    )
}