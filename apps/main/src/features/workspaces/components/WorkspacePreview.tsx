import { AspectRatio, Box, Flex, Icon, Image } from "@chakra-ui/react";
import { EyeEmpty, MediaImage } from "iconoir-react";
import { FC, useCallback } from "react";
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
        <AspectRatio ratio={2/1}>
            <Box
                backgroundColor={"whiteAlpha.100"}
                borderColor={isSelected ? "yellow.900" : "transparent"}
                borderRadius={16}
                borderWidth={2}
                padding={isSelected ? 1 : 0}
                height={"100%"}
                width={"100%"}
                _groupHover={{
                    borderColor: "yellow.900",
                    padding: 1,
                }}
                onMouseDown={handleOnMouseDown}
                onMouseUp={handleOnMouseUp}
                onClick={handleOnPreviewClick}
            >
                {workspace && (
                    <Flex
                        backgroundColor={"whiteAlpha.100"}
                        borderRadius={13}
                        height={"100%"}
                        width={"100%"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        overflow={"hidden"}
                    >
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
                                color={"whiteAlpha.700"}
                                fontSize={32}
                                strokeWidth={1}
                                _groupHover={{ display: "none" }}
                            />
                        )}
                        
                        <Icon
                            as={EyeEmpty}
                            color={"whiteAlpha.900"}
                            display={"none"}
                            fontSize={40}
                            position={"absolute"}
                            strokeWidth={1}
                            _groupHover={{ display: "block" }}
                        />
                    </Flex>
                )}
            </Box>
        </AspectRatio>
    )
}