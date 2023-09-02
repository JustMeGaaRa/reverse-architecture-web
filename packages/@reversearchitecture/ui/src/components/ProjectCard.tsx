import {
    AspectRatio,
    Box,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Icon,
    IconButton,
    Image,
    Text,
} from "@chakra-ui/react";
import{
    EyeEmpty,
    MediaImage,
    MoreHoriz
} from "iconoir-react";
import { FC, PropsWithChildren } from "react";

export const ProjectCard: FC<PropsWithChildren<{
    name: string;
    updated: string;
    preview?: string;
}>> = ({
    name,
    updated,
    preview
}) => {
    return (
        <Card
            data-group
            backgroundColor={"transparent"}
            borderRadius={24}
            boxShadow={"none"}
            padding={1}
            _hover={{
                backgroundColor: "gray.100",
                cursor: "pointer",
            }}
        >
            <CardBody px={0} py={1}>
                <AspectRatio ratio={4/3}>
                    <Flex
                        alignItems={"center"}
                        borderColor={"gray.200"}
                        borderRadius={16}
                        borderWidth={2}
                        height={"100%"}
                        justifyContent={"center"}
                        overflow={"hidden"}
                        _groupHover={{
                            borderColor: "yellow.900",
                        }}
                    >
                        {preview && (
                            <Image
                                alt={"Project Preview Image"}
                                height={"100%"}
                                width={"100%"}
                                src={preview}
                                transitionProperty={"all"}
                                transitionDuration={"0.3s"}
                                transitionTimingFunction={"ease"}
                                _groupHover={{ opacity: .4, transform: "scale(2)" }}
                            />
                        )}
                        {!preview && (
                            <Icon
                                as={MediaImage}
                                color={"gray.700"}
                                fontSize={32}
                                strokeWidth={1}
                                _groupHover={{ display: "none" }}
                            />
                        )}
                        
                        <Icon
                            as={EyeEmpty}
                            color={"gray.900"}
                            display={"none"}
                            fontSize={40}
                            position={"absolute"}
                            strokeWidth={1}
                            _groupHover={{ display: "block" }}
                        />
                    </Flex>
                </AspectRatio>
            </CardBody>
            <CardFooter
                pl={3}
                pr={2}
                py={1}
                justifyContent={"space-between"}
                width={"100%"}
            >
                <Flex
                    direction={"column"}
                >
                    <Text
                        color={"gray.700"}
                        fontSize={16}
                        lineHeight={"20px"}
                        noOfLines={1}
                        _groupHover={{ color: "basic.white" }}
                    >
                        {name}
                    </Text>
                    <Text
                        color={"gray.500"}
                        fontSize={14}
                        lineHeight={"18px"}
                        _groupHover={{ color: "gray.700" }}
                    >
                        {updated}
                    </Text>
                </Flex>
                <IconButton
                    aria-label={"more options"}
                    colorScheme={"gray"}
                    icon={<MoreHoriz />}
                    size={"md"}
                    variant={"ghost"}
                />
            </CardFooter>
        </Card>
    )
}