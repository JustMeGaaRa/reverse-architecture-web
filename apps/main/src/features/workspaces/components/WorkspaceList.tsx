import { Box, IconButton, Portal, ScaleFade, Text } from "@chakra-ui/react";
import { EmptyContent, Toolbar, ToolbarSection } from "@reversearchitecture/ui";
import { AppleShortcuts, BinMinus, Cancel, Copy, Folder } from "iconoir-react";
import { FC, useCallback, useState } from "react";
import {
    SelectionContainerProvider,
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
    groupped?: boolean,
    emptyTitle?: string;
    emptyDescription?: string;
    emptyAction?: React.ReactElement;
    onClick?: (workspace: WorkspaceInfo | WorkspaceGroupInfo) => void;
    onRemove?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> = ({
    workspaces,
    view,
    groupped,
    emptyTitle,
    emptyDescription,
    emptyAction,
    onClick,
    onRemove,
}) => {
    const [ selected, setSelected ] = useState<any[]>([]);

    const handleOnCancelSelection = useCallback(() => {
        // TODO: move handlers to child component and use hooks
        // TODO: turn off selection mode
        setSelected([]);
    }, [setSelected]);

    const handleOnStackWorkspaces = useCallback(() => {

    }, []);

    const handleOnWorkspaceRemove = useCallback(() => {
        onRemove?.(selected);
    }, [onRemove, selected]);
    
    return (
        <SelectionContainerProvider>
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
                    onClick={onClick}
                    onSelected={setSelected}
                    onRemove={onRemove}
                />
            )}
            {workspaces.length > 0 && view === "table" && (
                <WorkspaceTableView
                    workspaces={workspaces}
                    groupped={groupped}
                    onClick={onClick}
                    onSelected={setSelected}
                    onRemove={onRemove}
                />
            )}
            <Portal>
                <ScaleFade in={selected?.length > 0}>
                    <Box
                        position={"fixed"}
                        bottom={4}
                        left={"50%"}
                        transform={"translateX(-50%)"}
                    >
                        <Toolbar>
                            <ToolbarSection>
                                <IconButton
                                    aria-label={"close"}
                                    icon={<Cancel />}
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
                                    icon={<AppleShortcuts />}
                                    title={"stack workspaces together"}
                                    onClick={handleOnStackWorkspaces}
                                />
                                <IconButton
                                    aria-label={"clone workspace"}
                                    icon={<Copy />}
                                    title={"workspaces together"}
                                />
                                <IconButton
                                    aria-label={"remove workspaces"}
                                    icon={<BinMinus />}
                                    title={"remove workspaces"}
                                    onClick={handleOnWorkspaceRemove}
                                />
                            </ToolbarSection>
                        </Toolbar>
                    </Box>
                </ScaleFade>
            </Portal>
        </SelectionContainerProvider>
    )
}