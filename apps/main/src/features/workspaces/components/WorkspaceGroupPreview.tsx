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
import { FC } from "react";
import { WorkspaceGroupInfo } from "../types";

export const WorkspaceGroupPreview: FC<{
    group: WorkspaceGroupInfo;
    onPreviewClick?: () => void;
}> = ({
    group,
    onPreviewClick
}) => {
    const [first, second, third, ...rest] = group.workspaces;

    return (
        <Box
            backgroundColor={"whiteAlpha.100"}
            borderColor={"transparent"}
            borderRadius={16}
            borderWidth={2}
            height={"100%"}
            width={"100%"}
            _groupHover={{
                borderColor: "yellow.900",
            }}
            onClick={() => onPreviewClick?.()}
        >
            <SimpleGrid
                gap={1}
                padding={1}
                columns={2}
                _groupHover={{ opacity: .4 }}
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
                                    {workspace.preview && (
                                        <Image
                                            alt={"Project Preview Image"}
                                            src={workspace.preview}
                                            transitionProperty={"all"}
                                            transitionDuration={"0.3s"}
                                            transitionTimingFunction={"ease"}
                                            _groupHover={{ transform: "scale(2)" }}
                                        />
                                    )}
                                    
                                    {!workspace.preview && (
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