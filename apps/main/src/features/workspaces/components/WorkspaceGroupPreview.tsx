import {
    AspectRatio,
    Box,
    Flex,
    Icon,
    Image,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import { MediaImage } from "iconoir-react";
import { FC, useCallback } from "react";
import {
    useSelectionItem,
    useSelectionContainer,
    useOnPressHold
} from "../hooks";
import { WorkspaceGroupInfo } from "../types";

export const WorkspaceGroupPreview: FC<{
    group: WorkspaceGroupInfo;
    onPreviewClick?: () => void;
}> = ({
    group,
    onPreviewClick
}) => {
    const [first, second, third, ...rest] = group.workspaces;
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
        <Box
            backgroundColor={"whiteAlpha.100"}
            borderColor={isSelected ? "yellow.900" : "transparent"}
            borderRadius={16}
            borderWidth={2}
            height={"100%"}
            width={"100%"}
            _groupHover={{ borderColor: "yellow.900" }}
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
            onClick={handleOnPreviewClick}
        >
            <SimpleGrid
                gap={1}
                padding={1}
                columns={2}
                opacity={isSelected ? 0.4 : 1}
                _groupHover={{ opacity: 0.4 }}
            >
                {[first, second, third].map(workspace => (
                    <AspectRatio key={workspace?.workspaceId} ratio={2/1}>
                        <Box>
                            {workspace && (
                                <Flex
                                    backgroundColor={"whiteAlpha.100"}
                                    borderRadius={10}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    overflow={"hidden"}
                                    height={"100%"}
                                    width={"100%"}
                                >
                                    {workspace.coverUrl && (
                                        <Image
                                            alt={"workspace preview image"}
                                            src={workspace.coverUrl}
                                            transitionProperty={"all"}
                                            transitionDuration={"0.3s"}
                                            transitionTimingFunction={"ease"}
                                            _groupHover={{ transform: "scale(2)" }}
                                        />
                                    )}
                                    
                                    {!workspace.coverUrl && (
                                        <Icon
                                            as={MediaImage}
                                            color={"whiteAlpha.700"}
                                            fontSize={24}
                                            strokeWidth={1}
                                        />
                                    )}
                                </Flex>
                            )}
                        </Box>
                    </AspectRatio>
                ))}
                <AspectRatio ratio={2/1}>
                    <Box>
                        {rest?.length > 0 && (
                            <Flex
                                backgroundColor={"whiteAlpha.100"}
                                borderRadius={10}
                                alignItems={"center"}
                                justifyContent={"center"}
                                overflow={"hidden"}
                                height={"100%"}
                                width={"100%"}
                            >
                                <Text color={"whiteAlpha.800"} fontSize={"12px"}>
                                    {`+${rest.length} more`}
                                </Text>
                            </Flex>
                        )}
                    </Box>
                </AspectRatio>
            </SimpleGrid>
        </Box>
    )
}