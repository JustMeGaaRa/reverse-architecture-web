import { AspectRatio, Box, Flex, Icon, Image } from "@chakra-ui/react";
import { EyeEmpty, MediaImage } from "iconoir-react";
import { FC } from "react";
import { WorkspaceInfo } from "../types";

export const WorkspacePreview: FC<{
    workspace: WorkspaceInfo;
    onPreviewClick?: () => void;
}> = ({
    workspace,
    onPreviewClick
}) => {
    return (
        <AspectRatio ratio={2/1}>
            <Box
                backgroundColor={"whiteAlpha.100"}
                borderColor={"transparent"}
                borderRadius={16}
                height={"100%"}
                width={"100%"}
                _groupHover={{
                    borderColor: "yellow.900",
                    borderWidth: 2,
                    padding: 1,
                }}
                onClick={() => onPreviewClick?.()}
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
                        onClick={onPreviewClick}
                    >
                        {workspace.preview && (
                            <Image
                                alt={"workspace preview image"}
                                src={workspace.preview}
                                transitionProperty={"all"}
                                transitionDuration={"0.3s"}
                                transitionTimingFunction={"ease"}
                                _groupHover={{ opacity: .4, transform: "scale(2)" }}
                            />
                        )}

                        {!workspace.preview && (
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