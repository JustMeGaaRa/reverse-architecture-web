import {
    Box,
    Card,
    CardBody,
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
            height={"242px"}
            width={"345px"}
            padding={0}
            _hover={{
                backgroundColor: "gray.100",
                cursor: "pointer",
            }}
        >
            <CardBody padding={0}>
                <Flex
                    backgroundColor={"gray.100"}
                    borderColor={"gray.200"}
                    borderWidth={1}
                    borderRadius={16}
                    height={"182px"}
                    width={"345px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    overflow={"hidden"}
                    _groupHover={{
                        borderColor: "gray.900",
                    }}
                >
                    {preview && (
                        <Image alt={"Project Preview Image"} src={preview} />
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
                        strokeWidth={1}
                        _groupHover={{ display: "block" }}
                    />
                </Flex>
                <Box padding={2}>
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
                </Box>
            </CardBody>
        </Card>
    )
}