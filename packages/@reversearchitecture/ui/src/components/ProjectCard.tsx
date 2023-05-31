import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Icon,
    Image,
    Text,
} from "@chakra-ui/react";
import{
    EyeEmpty,
    MediaImage
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
            borderRadius={16}
            boxShadow={"none"}
            padding={0}
            _hover={{
                backgroundColor: "gray.100",
                cursor: "pointer",
            }}
        >
            <CardBody px={0} py={1}>
                <Flex
                    alignItems={"center"}
                    borderColor={"gray.200"}
                    borderRadius={16}
                    borderWidth={1}
                    height={"100%"}
                    justifyContent={"center"}
                    overflow={"hidden"}
                    _groupHover={{
                        borderColor: "gray.700",
                    }}
                >
                    {preview && (
                        <Image
                            alt={"Project Preview Image"}
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
            </CardBody>
            <CardFooter padding={2}>
                <Flex
                    direction={"column"}
                >
                    <Text
                        color={"gray.700"}
                        fontSize={18}
                        noOfLines={1}
                        _groupHover={{ color: "basic.white" }}
                    >
                        {name}
                    </Text>
                    <Text
                        color={"gray.500"}
                        fontSize={14}
                        _groupHover={{ color: "gray.700" }}
                    >
                        {updated}
                    </Text>
                </Flex>
            </CardFooter>
        </Card>
    )
}