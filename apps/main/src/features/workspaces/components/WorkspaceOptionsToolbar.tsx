import { Box, Icon, IconButton, ScaleFade, Text } from "@chakra-ui/react";
import { Toolbar, ToolbarSection } from "workspace";
import { AppleShortcuts, BinMinusIn, Xmark, Copy } from "iconoir-react";
import { FC, PropsWithChildren, useCallback } from "react";
import { useWorkspaceCollection, useWorkspaceCollectionOptions } from "../hooks";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";

export const WorkspaceOptionsToolbar: FC<{
    onStack?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
    onRemove?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> =({
    onStack,
    onRemove
}) => {
    const { selected, clearSelected, setSelectionModeOn } = useWorkspaceCollection();
    const { stack, unstack, clone } = useWorkspaceCollectionOptions();

    const handleOnCancelSelection = useCallback(() => {
        clearSelected();
        setSelectionModeOn(false);
    }, [clearSelected, setSelectionModeOn]);

    const handleOnWorkspacesStack = useCallback(() => {
        onStack?.(selected);
    }, [onStack, selected]);

    const handleOnWorkspaceRemove = useCallback(() => {
        onRemove?.(selected);
    }, [onRemove, selected]);

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
                    {`${selected.length} selected`}
                </Text>
            </ToolbarSection>
            <ToolbarSection>
                <IconButton
                    aria-label={"stack workspaces together"}
                    isDisabled={!stack.isAllowed}
                    icon={<Icon as={AppleShortcuts} boxSize={5} />}
                    title={"stack workspaces together"}
                    onClick={handleOnWorkspacesStack}
                />
                <IconButton
                    aria-label={"clone workspace"}
                    icon={<Icon as={Copy} boxSize={5} />}
                    isDisabled={!clone.isAllowed}
                    title={"clone workspace"}
                />
                <IconButton
                    aria-label={"delete workspaces"}
                    icon={<Icon as={BinMinusIn} boxSize={5} />}
                    title={"delete workspaces"}
                    onClick={handleOnWorkspaceRemove}
                />
            </ToolbarSection>
        </Toolbar>
    )
}

export const WorkspaceOptionsAutoHideWrapper: FC<PropsWithChildren> = ({ children }) => {
    const { selected } = useWorkspaceCollection();

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