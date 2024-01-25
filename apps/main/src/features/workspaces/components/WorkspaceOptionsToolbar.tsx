import { Box, Icon, IconButton, ScaleFade, Text } from "@chakra-ui/react";
import { Toolbar, ToolbarSection } from "workspace";
import { AppleShortcuts, BinMinusIn, Xmark, Copy } from "iconoir-react";
import { FC, PropsWithChildren, useCallback } from "react";
import { useWorkspaceSelection, useWorkspaceCollectionOptions } from "../hooks";

export const WorkspaceOptionsToolbar: FC<{
    onStack?: (selectedIds: string[]) => void;
    onUnstack?: (selectedIds: string[]) => void;
    onArchive?: (selectedIds: string[]) => void;
    onRestore?: (selectedIds: string[]) => void;
    onRemove?: (selectedIds: string[]) => void;
}> =({
    onStack,
    onUnstack,
    onArchive,
    onRestore,
    onRemove
}) => {
    const { selectedIds, clearSelected } = useWorkspaceSelection();
    const { stack, unstack, clone, remove, archive, unarchive } = useWorkspaceCollectionOptions();

    const handleOnCancelSelection = useCallback(() => {
        clearSelected();
    }, [clearSelected]);

    const handleOnWorkspacesStack = useCallback(() => {
        onStack?.(selectedIds);
    }, [onStack, selectedIds]);

    const handleOnWorkspacesUnstack = useCallback(() => {
        onUnstack?.(selectedIds);
    }, [onUnstack, selectedIds]);

    const handleOnWorkspaceArchive = useCallback(() => {
        onArchive?.(selectedIds);
    }, [onArchive, selectedIds]);

    const handleOnWorkspaceRestore = useCallback(() => {
        onRestore?.(selectedIds);
    }, [onRestore, selectedIds]);

    const handleOnWorkspaceRemove = useCallback(() => {
        onRemove?.(selectedIds);
    }, [onRemove, selectedIds]);

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
                {stack.isVisible && (
                    <IconButton
                        aria-label={"stack workspaces together"}
                        icon={<Icon as={AppleShortcuts} boxSize={5} />}
                        isDisabled={!stack.isEnabled}
                        title={"stack workspaces together"}
                        onClick={handleOnWorkspacesStack}
                    />
                )}
                {unstack.isVisible && (
                    <IconButton
                        aria-label={"unstack workspaces together"}
                        icon={<Icon as={AppleShortcuts} boxSize={5} />}
                        isDisabled={!unstack.isEnabled}
                        title={"unstack workspaces apart"}
                        onClick={handleOnWorkspacesUnstack}
                    />
                )}
                {clone.isVisible && (
                    <IconButton
                        aria-label={"clone workspace"}
                        icon={<Icon as={Copy} boxSize={5} />}
                        isDisabled={!clone.isEnabled}
                        title={"clone workspace"}
                    />
                )}
                {archive.isVisible && (
                    <IconButton
                        aria-label={"archive workspaces"}
                        icon={<Icon as={BinMinusIn} boxSize={5} />}
                        isDisabled={!archive.isEnabled}
                        title={"archive workspaces"}
                        onClick={handleOnWorkspaceArchive}
                    />
                )}
                {unarchive.isVisible && (
                    <IconButton
                        aria-label={"unarchive workspaces"}
                        icon={<Icon as={BinMinusIn} boxSize={5} />}
                        isDisabled={!unarchive.isEnabled}
                        title={"unarchive workspaces"}
                        onClick={handleOnWorkspaceRestore}
                    />
                )}
                {remove.isVisible && (
                    <IconButton
                        aria-label={"delete workspaces"}
                        icon={<Icon as={BinMinusIn} boxSize={5} />}
                        isDisabled={!remove.isEnabled}
                        title={"delete workspaces"}
                        onClick={handleOnWorkspaceRemove}
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