import { AspectRatio, Box, Flex, Icon, Image } from "@chakra-ui/react";
import { MediaImage } from "iconoir-react";
import { FC, useCallback } from "react";
import { WorkspaceCard } from "../components";
import { useSelectionItem, useOnPressHold, useSelectionContainer } from "../hooks";
import { WorkspaceInfo } from "../types";

export const WorkspacePreview: FC<{
    workspace: WorkspaceInfo;
    onPreviewClick?: () => void;
}> = ({
    workspace,
    onPreviewClick
}) => {
    const {
        isSelectionModeOn,
        turnOnSelectionMode,
        turnOffSelectionMode,
        toggleSelected
    } = useSelectionContainer();
    const { index, isSelected } = useSelectionItem();

    const { onStartHold, onCancelHold } = useOnPressHold(() => {
        turnOnSelectionMode();
        toggleSelected(index);
    });

    const handleOnMouseDown = useCallback(() => {
        onStartHold();
    }, [onStartHold]);

    const handleOnMouseUp = useCallback(() => {
        onCancelHold();
    }, [onCancelHold]);

    const handleOnPreviewClick = useCallback(() => {
        if (isSelectionModeOn) {
            toggleSelected(index);
        }
        else {
            onPreviewClick?.();
        }
    }, [index, isSelectionModeOn, onPreviewClick, toggleSelected]);

    return (
        <WorkspaceCard
            key={workspace.workspaceId}
            name={workspace.name}
            lastModifiedDate={workspace.lastModifiedDate}
        >
            <AspectRatio ratio={2/1}>
                <Box
                    position={"relative"}
                    backgroundColor={"whiteAlpha.100"}
                    borderRadius={16}
                    height={"100%"}
                    width={"100%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    overflow={"hidden"}
                    onMouseDown={handleOnMouseDown}
                    onMouseUp={handleOnMouseUp}
                    onClick={handleOnPreviewClick}
                >
                    {workspace && (
                        <>
                            {workspace.coverUrl && (
                                <Image
                                    alt={"workspace preview image"}
                                    src={workspace.coverUrl}
                                    transitionProperty={"all"}
                                    transitionDuration={"0.3s"}
                                    transitionTimingFunction={"ease"}
                                    _groupHover={{ opacity: 0.4, transform: "scale(2)" }}
                                />
                            )}

                            {!workspace.coverUrl && (
                                <Icon
                                    as={MediaImage}
                                    color={"gray.900"}
                                    fontSize={32}
                                    strokeWidth={1}
                                />
                            )}
                        </>
                    )}
                </Box>
            </AspectRatio>
        </WorkspaceCard>
    )
}